import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Tr, Td, Switch, Select, HStack, InputGroup, InputRightAddon, useToast } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { ICustomAddress } from "@/types";
import CloudflareService from "@/services/cloudflare";
import { UserContext } from '@/context/UserContext';
import { useForm } from "react-hook-form";

interface Props {
    customAddress?: ICustomAddress;
    onChange: (updatedCustomAddress: ICustomAddress, action: "insert" | "update" | "delete") => void;
}

const Route: React.FC<Props> = (props) => {

    const toast = useToast()

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const { register, reset, getValues } = useForm<ICustomAddress>();

    const { domain, zoneId, accessToken, destinationAddresses } = useContext(UserContext)

    const [customAddress, setCustomAddress] = useState<ICustomAddress | null>(null);

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
            const method = isInsert ? "post" : "put";

            const postData = {
                "actions": [
                    {
                        "type": "forward",
                        "value": [
                            form.to
                        ]
                    }
                ],
                "enabled": form.enabled,
                "matchers": [
                    {
                        "field": "to",
                        "type": "literal",
                        "value": `${form.from}@${domain}`
                    }
                ]
            }
            const { status, data } = await CloudflareService[method](`/zones/${zoneId}/email/routing/rules/${form.tag || ""}`, accessToken, postData)

            if (status === 200) {

                setIsEditing(false);

                const updatedCustomAddress = CloudflareService.utils.mapResultToCustomAddress(data.result);

                if (updatedCustomAddress) {
                    props.onChange(updatedCustomAddress, isInsert ? "insert" : "update");

                    if (isInsert) {
                        // Reset the form used for creating this new alias
                        reset()
                    }
                }
            }
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
            const { status } = await CloudflareService.delete(`/zones/${zoneId}/email/routing/rules/${customAddress.tag}`, accessToken)
            if (status === 200) {
                props.onChange(customAddress, "delete");
            }
        }
        setIsDeleting(false)
    }



    return (
        <>
            <Tr>
                <Td>
                    {isEditing ?
                        <HStack spacing={1}>
                            <InputGroup>
                                <Input
                                    defaultValue={customAddress.from ? customAddress.from.split("@")[0] : ""}
                                    width={120}
                                    placeholder="Alias"
                                    autoFocus
                                    {...register("from")}
                                />
                                <InputRightAddon children={`@${domain}`} />
                            </InputGroup>
                        </HStack>
                        : customAddress.from
                    }
                </Td>
                <Td>
                    {isEditing ?
                        <Select placeholder='Select destination address' {...register("to")}>
                            {destinationAddresses.map((address: string, i: number) => {
                                const selected = (customAddress?.to && customAddress?.to === address) || (i == 0);
                                return <option selected={selected} value={address}>{address}</option>
                            })}
                        </Select>
                        : (customAddress?.tag && customAddress.to)
                    }
                </Td>
                <Td textAlign={'center'}>
                    {customAddress.tag && <>
                        {isEditing && customAddress?.tag ? <Switch {...register("enabled")} defaultChecked={customAddress.enabled} /> : <>
                            {customAddress.enabled && customAddress?.tag ? <CheckIcon color={"green.300"} /> : <CloseIcon color={"red.300"} w={3} />}
                        </>}
                    </>}
                </Td>
                <Td textAlign={'right'}>
                    {(customAddress?.tag || isEditing) ? <>
                        {isEditing && <>
                            {customAddress?.tag &&
                                <Button onClick={() => handleDelete()} mr={4} colorScheme="red" isLoading={isDeleting}>
                                    <DeleteIcon />
                                </Button>
                            }
                            <Button
                                onClick={() => onSubmit()} mr={2} colorScheme="green"
                                isLoading={isSaving}
                                loadingText='Saving'
                            >
                                {customAddress.tag ? "Save" : "Create alias"}
                            </Button>
                        </>}
                        <Button onClick={() => setIsEditing(!isEditing)} mr={2}>
                            {isEditing ? <CloseIcon /> : <EditIcon />}
                        </Button>
                    </>
                        :
                        <Button onClick={() => setIsEditing(!isEditing)} mr={2} colorScheme="teal">
                            Create alias
                        </Button>
                    }

                    <input type="hidden" defaultValue={customAddress.tag || ""} {...register("tag")} />

                </Td>
            </Tr>
        </>
    )
}

export default Route;
