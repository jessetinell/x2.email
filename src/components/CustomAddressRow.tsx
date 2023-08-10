import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    Input,
    Switch,
    Select,
    InputGroup,
    InputRightAddon,
    useToast,
    Flex,
    VStack,
    Box,
    Text,
    FormLabel,
    FormControl
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { UserContext } from '@/context/UserContext';
import { CloudflareContext } from "@/context/CloudflareContext";
import { CloudflareEmailRule } from "@/services/cloudflare/cloudflare.types";
import { CloudflareUtils } from "@/utils";
import { CustomAddress } from "@/types";

interface Props {
    isCreateComponent?: boolean;
    customAddress?: CustomAddress;
    onChange: (updatedCustomAddress: CustomAddress, action: "insert" | "update" | "delete") => void;
}

const CustomAddressRow: React.FC<Props> = (props) => {

    const toast = useToast()

    const { cloudflareApi } = useContext(CloudflareContext);

    const [isEditing, setIsEditing] = useState<boolean>(false);
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

    const onSubmit = async () => {
        try {

            const form = getValues();

            if (!form.from) {
                toast({
                    title: "Please enter an alias",
                    status: "error"
                })
                return;
            }

            setIsSaving(true);

            const isInsert = !customAddress?.tag;

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
                        value: `${form.from}@${domain}`
                    }
                ]
            }

            if (isInsert) {
                const response = await cloudflareApi?.createEmailRule(zoneId, rule);

                const updatedCustomAddress = CloudflareUtils.mapCreateEmailRuleResponseToCustomAddress(response);

                if (updatedCustomAddress) {
                    props.onChange(updatedCustomAddress, "insert");
                }

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

            setIsEditing(false);

        }
        catch (e: any) {
            alert(e.message)
        }
        finally {
            setIsSaving(false)
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




    if (isEditing) {
        return <Box border={'1px solid'} borderColor={'gray.200'} rounded={10} p={6}>
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
                            return <option selected={selected} value={address}>{address}</option>
                        })}
                    </Select>
                </FormControl>


                {!props.isCreateComponent &&
                    <Flex justifyContent={'space-between'} w={'100%'}>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='enabled' mb='0'>
                                Enabled
                            </FormLabel>
                            <Switch {...register("enabled")} defaultChecked={customAddress.enabled} />
                        </FormControl>
                        <Button onClick={() => handleDelete()} colorScheme="red" variant={'ghost'} isLoading={isDeleting}>
                            <DeleteIcon />
                        </Button>
                    </Flex>
                }

                <Flex justifyContent={'space-between'} width={'100%'} mt={4}>

                    <Button onClick={() => setIsEditing(false)} variant={'ghost'} p={0}>
                        Close <CloseIcon ml={2} />
                    </Button>

                    <Button
                        onClick={() => onSubmit()} colorScheme="green"
                        isLoading={isSaving}
                        loadingText='Saving'
                    >
                        {customAddress.tag ? "Save" : "Create alias"}
                    </Button>
                </Flex>
                <input type="hidden" defaultValue={customAddress.tag || ""} {...register("tag")} />
            </VStack>
        </Box>
    }

    if (props.isCreateComponent) {
        return <Button onClick={() => setIsEditing(!isEditing)} mr={2} colorScheme="teal" size={'lg'}>
            Create alias
        </Button>
    }

    return (
        <>
            <Flex width="100%" py={2} alignItems="center" justifyContent="space-between" color={customAddress.enabled ? 'black' : 'gray.400'}>
                <Text color={customAddress.enabled ? "green.300" : "red.300"} fontSize={'3xl'} mr={2}>•</Text>
                <Flex lineHeight={1}>
                    <Flex flex={2} alignItems="center">
                        {customAddress.from && <><b>{customAddress.from.split("@")[0]}</b>@{customAddress.from.split("@")[1]}</>}
                    </Flex>
                    <ArrowForwardIcon mx={2} />
                    <Flex flex={2} alignItems="center">
                        <Text as={customAddress.enabled ? 'p' : 's'}>{customAddress.to}</Text>
                    </Flex>

                </Flex>
                <Flex flex={2} alignItems="center" justifyContent="flex-end">
                    <Button onClick={() => setIsEditing(true)} mr={2}>
                        Edit <EditIcon ml={2} />
                    </Button>

                </Flex>
            </Flex>
        </>
    )
}

export default CustomAddressRow;
