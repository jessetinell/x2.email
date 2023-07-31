"use client"
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertDialogBody, AlertDialogHeader, Button, Code, Img, Input, InputGroup, InputRightElement, ListItem, OrderedList, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ChevronRightIcon, ExternalLinkIcon, LockIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { UserContext } from '@/context/UserContext';
import InputHelpButton from './InputHelpButton';

interface IAuthenticationForm {
    zoneId: string;
    accountId: string;
    accessToken: string;
}

export default function Authentication() {

    const router = useRouter();
    const { authorize, isAuthenticated, isLoading } = useContext(UserContext);

    const { register, handleSubmit } = useForm<IAuthenticationForm>();

    const onSubmit = async (data: IAuthenticationForm) => {
        let a = await authorize(data.accountId, data.zoneId, data.accessToken);
    }

    useEffect(() => {
        console.log("isAuthenticated", isAuthenticated)
        console.log("isLoading", isLoading)

        if (!isLoading && isAuthenticated) {
            router.push("/app");
        }

    }, [isAuthenticated, isLoading])

    const HelpButton = () => {
        return <InputHelpButton content={<>
            <AlertDialogHeader fontSize='2xl' fontWeight='bold'>
                Account ID and Zone ID
            </AlertDialogHeader>
            <AlertDialogBody>

                <OrderedList spacing={2}>
                    <ListItem>
                        Log in to your Cloudflare dashboard and copy <Code>Account ID</Code> and <Code>Zone ID</Code> from your domain's overview page.
                    </ListItem>
                </OrderedList>
                <br />
                <NextLink href="https://dash.cloudflare.com" target='_blank'>
                    <Button colorScheme='orange' rightIcon={<ExternalLinkIcon />} size={'lg'}>
                        Open Cloudflare dashboard
                    </Button>
                </NextLink>
            </AlertDialogBody>
            <Img src="/img/cloudflare-zone-account-ids.png" maxW={'97%'} boxShadow='xs' rounded='md' mt='10' mx='auto' />
        </>} />
    }

    return (
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <Text fontSize={'xl'} fontWeight={'bold'}>Cloudflare info</Text>
            <InputGroup>
                <Input placeholder="Account ID" tabIndex={1} defaultValue={process.env.NEXT_PUBLIC_ACCOUNT_ID}  {...register("accountId", { required: true })} />
                <InputRightElement>
                    <HelpButton />
                </InputRightElement>
            </InputGroup>
            <InputGroup>
                <Input placeholder="Zone ID" tabIndex={2} defaultValue={process.env.NEXT_PUBLIC_ZONE_ID} {...register("zoneId", { required: true })} />
                <InputRightElement>
                    <HelpButton />
                </InputRightElement>
            </InputGroup>

            <InputGroup>
                <Input placeholder="Access token" type="password" tabIndex={3} defaultValue={process.env.NEXT_PUBLIC_ACCESS_TOKEN} {...register("accessToken", { required: true })} />
                <InputRightElement>
                    <InputHelpButton content={<>
                        <AlertDialogHeader fontSize='2xl' fontWeight='bold'>
                            Access token
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <OrderedList spacing={2}>
                                <ListItem>
                                    Log in to your Cloudflare dashboard
                                </ListItem>
                                <ListItem>Create new token (then choose Custom token)</ListItem>
                                <ListItem>
                                    <Text mb={2} fontWeight={'bold'}>
                                        Permissions:
                                    </Text>
                                    <OrderedList spacing={3}>
                                        <ListItem>
                                            <Code>Account</Code><ChevronRightIcon /><Code>Email Routing Addresses</Code><ChevronRightIcon /><Code>Read</Code>
                                        </ListItem>
                                        <ListItem>
                                            <Code>Zone</Code><ChevronRightIcon /><Code>Email Routing Rules</Code><ChevronRightIcon /><Code>Edit</Code>
                                        </ListItem>
                                        <ListItem>
                                            <Code>Zone</Code><ChevronRightIcon /><Code>Zone Settings</Code><ChevronRightIcon /><Code>Read</Code>
                                        </ListItem>
                                    </OrderedList>
                                </ListItem>
                            </OrderedList>
                            <br />
                            <NextLink href="https://dash.cloudflare.com/profile/api-tokens" target='_blank'>
                                <Button colorScheme='orange' rightIcon={<ExternalLinkIcon />} size={'lg'}>
                                    Open token manager
                                </Button>
                            </NextLink>
                            <Text mt='10' mb='2'>📸 Screenshot</Text>
                            <Img src="/img/cloudflare-custom-token.png" boxShadow='xs' rounded='md' mx='auto' />
                        </AlertDialogBody>
                    </>} />
                </InputRightElement>
            </InputGroup>

            <Button type="submit"
                iconSpacing="5"
                isLoading={isLoading}
                tabIndex={4}
                rightIcon={<LockIcon />}
                colorScheme="blue" size={"lg"}>
                Store Securely in Browser
            </Button>
            <Text fontSize={'xs'} textAlign={'center'}>Encrypted and stored locally on your browser</Text>
        </Stack>
    )
}
