import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Input,
    Select,
    InputGroup,
    InputRightAddon,
    useToast,
    Flex,
    VStack,
    Text,
    FormLabel,
    FormControl,
    HStack,
    Tooltip,
    AlertDialog,
    AlertDialogFooter,
    AlertDialogOverlay,
    AlertDialogContent,
    useDisclosure,
    AlertDialogBody,
    Checkbox,
    Spinner
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { generate } from "random-words";
import { UserContext } from '@/context/UserContext';
import { CloudflareContext } from "@/context/CloudflareContext";
import { CloudflareEmailRule } from "@/services/cloudflare/cloudflare.types";
import { CloudflareUtils } from "@/utils";
import { CustomAddress } from "@/types";
import { DiceIcon } from "@/icons";

interface Props {
    isCreateComponent?: boolean;
    customAddress?: CustomAddress;
    onChange: (updatedCustomAddress: CustomAddress, action: "insert" | "update" | "delete") => void;
}

const CustomAddressRow: React.FC<Props> = (props) => {

    const toast = useToast()

    const { cloudflareApi } = useContext(CloudflareContext);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef(null)

    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const { register, reset, getValues } = useForm<CustomAddress>();

    const { domain, zoneId, destinationAddresses } = useContext(UserContext)

    const [customAddress, setCustomAddress] = useState<CustomAddress | null>(null);

    useEffect(() => {
        setCustomAddress(props.customAddress || { tag: null, from: "", to: destinationAddresses[0], enabled: true });
    }, [props.customAddress]);

    if (!customAddress) {
        return <></>
    }

    const onSubmit = async (form?: CustomAddress) => {
        try {

            if (isSaving) return;

            form = form || getValues();

            if (!form.from) {
                toast({
                    title: "Please enter an alias",
                    status: "error"
                })
                return;
            }

            setIsSaving(true);

            const isInsert = !customAddress?.tag;

            const alias = `${form.from}@${domain}`;
            const rule: CloudflareEmailRule = {
                tag: form.tag || null,
                actions: [
                    {
                        type: "forward",
                        value: [
                            form.to
                        ]
                    }
                ],
                enabled: form.enabled,
                matchers: [
                    {
                        field: "to",
                        type: "literal",
                        value: alias
                    }
                ]
            }

            if (isInsert) {
                const response = await cloudflareApi?.createEmailRule(zoneId, rule);

                const updatedCustomAddress = CloudflareUtils.mapCreateEmailRuleResponseToCustomAddress(response);

                if (updatedCustomAddress) {
                    props.onChange(updatedCustomAddress, "insert");
                }

                navigator.clipboard.writeText(customAddress.from)
                toast({
                    title: `${alias} copied to clipboard`
                })

                // Reset the form used for creating this new alias
                reset()
            }
            else {
                const response = await cloudflareApi?.updateEmailRule(zoneId, rule);

                const updatedCustomAddress = CloudflareUtils.mapCreateEmailRuleResponseToCustomAddress(response);

                if (updatedCustomAddress) {
                    props.onChange(updatedCustomAddress, "update");
                }
            }

        }
        catch (e: any) {
            alert(e.message)
        }
        finally {
            onClose();
            setIsSaving(false);
        }
    }

    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this alias?")
        if (confirmed) {
            setIsDeleting(true)
            await cloudflareApi?.deleteEmailRule(zoneId, customAddress.tag)
            props.onChange(customAddress, "delete");
        }
        setIsDeleting(false)

        toast({
            title: `Deleted ${customAddress.from}`,
            status: "success"
        })
    }



    return (
        <>


            <AlertDialog
                isOpen={isOpen}
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent w={800} m={2} p={[2, 6]}>

                        <AlertDialogBody p={0}>
                            <VStack spacing={6}>

                                <InputGroup bg={'white'}>
                                    <Input
                                        defaultValue={customAddress.from ? customAddress.from.split("@")[0] : ""}
                                        placeholder="Alias"
                                        autoFocus
                                        fontSize={'lg'}
                                        {...register("from")}
                                    />
                                    <InputRightAddon children={`@${domain}`} fontSize={'lg'} />
                                </InputGroup>


                                <FormControl>
                                    <FormLabel htmlFor='to' mb='0'>
                                        Destination
                                    </FormLabel>
                                    <Select placeholder='Select destination address' {...register("to")} fontSize={'lg'}>
                                        {destinationAddresses.map((address: string, i: number) => {
                                            const selected = (customAddress?.to && customAddress?.to === address) || (i == 0);
                                            return <option key={i} selected={selected} value={address}>{address}</option>
                                        })}
                                    </Select>
                                </FormControl>


                                {!props.isCreateComponent &&
                                    <Flex justifyContent={'space-between'} w={'100%'}>
                                        <FormControl display='flex' alignItems='center'>
                                            <Checkbox {...register("enabled")} defaultChecked={customAddress.enabled}>
                                                Enabled
                                            </Checkbox>
                                        </FormControl>
                                        <Button onClick={() => handleDelete()} colorScheme="red" variant={'ghost'} isLoading={isDeleting}>
                                            <DeleteIcon />
                                        </Button>
                                    </Flex>
                                }

                                <input type="hidden" defaultValue={customAddress.tag || ""} {...register("tag")} />
                            </VStack>
                        </AlertDialogBody>

                        <AlertDialogFooter justifyContent={'space-between'} p={0} mt={6}>

                            <Button onClick={() => onClose()} variant={'ghost'} p={0} ref={cancelRef} >
                                <CloseIcon mr={2} /> Cancel
                            </Button>

                            <HStack alignItems={'center'} spacing={4}>
                                {isSaving ? <HStack><Spinner
                                    thickness='3px'
                                    speed='0.65s'
                                    emptyColor='gray.100'
                                    color='teal.500'
                                />
                                    <Text>Saving...</Text></HStack> :
                                    <>
                                        <Tooltip label='Generate random alias' placement="top" >
                                            <Button
                                                onClick={() => {
                                                    const randomAlias = generate({ exactly: 2, join: "." })
                                                    onSubmit({ from: randomAlias, to: destinationAddresses[0], enabled: true, tag: null })
                                                }}
                                                colorScheme="gray"
                                            >
                                                <DiceIcon />
                                            </Button>
                                        </Tooltip>
                                        <Button
                                            onClick={() => onSubmit()}
                                            colorScheme="green"
                                        >
                                            {customAddress.tag ? "Save" : "Create alias"}
                                        </Button>
                                    </>}
                            </HStack>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {props.isCreateComponent ?
                <Button onClick={onOpen} mr={2} colorScheme="teal" size={'lg'}>
                    Create alias
                </Button>
                :

                <Flex width="100%" py={2} alignItems="center" color={customAddress.enabled ? 'black' : 'gray.400'}>
                    <HStack spacing={2}>
                        <Button onClick={() => onOpen()} size={'sm'} variant={'ghost'}>
                            <EditIcon />
                        </Button>
                        <Text color={customAddress.enabled ? "green.300" : "red.300"} fontSize={'3xl'} mr={1}>•</Text>
                    </HStack>
                    <Flex lineHeight={1}>
                        <Flex flex={2} alignItems="center">
                            <Tooltip label='Copy' placement="top" >
                                <a onClick={() => {
                                    navigator.clipboard.writeText(customAddress.from)
                                    toast({
                                        title: "Copied to clipboard"
                                    })
                                }}>
                                    <Text as={customAddress.enabled ? 'p' : 's'}>
                                        {customAddress.from && <><b>{customAddress.from.split("@")[0]}</b>@{customAddress.from.split("@")[1]}</>}
                                    </Text>
                                </a>
                            </Tooltip>
                        </Flex>
                        <ArrowForwardIcon mx={2} color={'gray.400'} />
                        <Flex flex={2} alignItems="center">
                            {customAddress.to}
                        </Flex>

                    </Flex>
                </Flex>
            }
        </>
    )
}

export default CustomAddressRow;
