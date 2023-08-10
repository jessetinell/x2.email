"use client"
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialogBody, AlertDialogHeader, Button, Code, Flex, FormControl, FormLabel, HStack, Img, Input, InputGroup, InputRightElement, ListItem, OrderedList, Stack, Switch, Text, UnorderedList, useToast } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ArrowForwardIcon, ChevronRightIcon, ExternalLinkIcon, LockIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { UserContext } from '@/context/UserContext';
import InputHelpButton from './InputHelpButton';
import { H3 } from "./Headings";

interface IAuthenticationForm {
    accountId?: string;
    zoneId?: string;
    accessToken?: string;
    quickAuth?: string;
}

export default function Authentication() {

    const router = useRouter();
    const { authorize, isAuthenticated, isLoading } = useContext(UserContext);
    const [isQuickAuth, setIsQuickAuth] = useState(false);
    const toast = useToast()

    const { register, handleSubmit } = useForm<IAuthenticationForm>();

    const onSubmit = async (data: IAuthenticationForm) => {
        let { accountId, zoneId, accessToken, quickAuth } = data;

        if (isQuickAuth && quickAuth) {
            [accountId, zoneId, accessToken] = quickAuth.split(",");
        }

        if (!accountId || !zoneId || !accessToken) {
            toast({
                title: "Please fill in all fields",
                status: "error"
            })
            return;
        }

        await authorize(accountId, zoneId, accessToken);
    }

    useEffect(() => {

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
                        Log in to your Cloudflare dashboard, choose a zone/domain, and copy <Code>Account ID</Code> and <Code>Zone ID</Code> from your domain's overview page.
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

    const QuickAuth = () => (
        <>
            <InputGroup>
                <Input placeholder="Quick Auth" type="password" tabIndex={3} defaultValue={process.env.NEXT_PUBLIC_QUICK_AUTH} {...register("quickAuth", { required: true })} />
                <InputRightElement>
                    <InputHelpButton content={<>
                        <AlertDialogHeader fontSize='2xl' fontWeight='bold'>
                            Quick Auth
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text>
                                "Quick Auth" is useful if you use a password manager and want to log in to x2.email faster.
                                <br />
                                <br />
                                It's a comma-separated string containing Account ID, Zone ID and Access token.
                                <br />
                                <br />
                                <b>Format: </b>
                                <br /><Code>Account ID, Zone ID, Access token</Code>
                                <br />
                                <br />
                                <b>Example:</b><br /> <Code>123,456,abc</Code>
                            </Text>
                        </AlertDialogBody>
                    </>} />
                </InputRightElement>
            </InputGroup>
        </>
    )

    const RegularAuth = () => (
        <>
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
                                <Button colorScheme='orange' rightIcon={<ExternalLinkIcon />} size={'md'}>
                                    Open token manager
                                </Button>
                            </NextLink>
                            <h3>Permissions explained</h3>
                            <OrderedList spacing={3}>
                                <ListItem>
                                    <Code>Email Routing Addresses | Read</Code><br />Needed to list destination email addresses
                                </ListItem>
                                <ListItem>
                                    <Code>Email Routing Rules | Edit</Code>
                                    <br />
                                    Listing, creating, editing and deleting of email rules (aliases)
                                </ListItem>
                                <ListItem>
                                    <Code>Zone Settings | Read</Code>
                                    <br />Listing of all the zones in your Cloudflare account (or the zone you select in the "Zone Resources" section)
                                </ListItem>
                            </OrderedList>
                        </AlertDialogBody>
                    </>} />
                </InputRightElement>
            </InputGroup>
        </>
    )

    return (
        <>
            <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} mt={20}>

                <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <H3 m={0}>Cloudflare info</H3>
                    <div>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='email-alerts' mb='0'>
                                Quick auth
                            </FormLabel>
                            <Switch id='email-alerts'
                                onChange={(e) => setIsQuickAuth(e.target.checked)}
                            />
                        </FormControl>
                    </div>
                </Flex>

                {isQuickAuth ? <QuickAuth /> : <RegularAuth />}

                <Button type="submit"
                    iconSpacing="2"
                    isLoading={isLoading}
                    tabIndex={4}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="orange" size={"lg"}>
                    Connect to Cloudflare
                </Button>
                <HStack justifyContent={'center'}>
                    <LockIcon />
                    <Text fontSize={'xs'} textAlign={'center'}>The information will be encrypted and stored locally on your browser</Text>
                </HStack>
            </Stack>
        </>
    )
}
