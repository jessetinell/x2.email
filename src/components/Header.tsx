"use client"
import { Link, Box, Button, Container, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '@/context/UserContext';
import NextLink from 'next/link'
import { ArrowForwardIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { GithubIcon } from '@/icons';

export default function Header() {

    const { accountId, zoneId, accessToken, isAuthenticated, clearAllValues } = useContext(UserContext);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    useEffect(() => {
        if (isLoggingOut && !accountId && !zoneId && !accessToken) {
            window.location.href = "/";
        }
    }, [isLoggingOut, accountId, zoneId, accessToken])

    return (
        <Box py={5} boxShadow='sm'>
            <Container maxW={'100%'}>
                <Flex justifyContent="space-between" alignItems={'center'}>
                    <Link as={NextLink} href={isAuthenticated ? "/app" : "/"}>
                        <Text fontSize='2xl' fontWeight={'black'}>x2.email</Text>
                    </Link>

                    <div>
                        <HStack spacing={7}>
                            <Link as={NextLink} href={"https://github.com/jessetinell/x2.email"} isExternal={true}>
                                <HStack spacing={1} >
                                    <GithubIcon />
                                    <Text fontWeight={'700'}>Star on Github</Text>
                                </HStack>
                            </Link>
                            <Link as={NextLink} href={"/about"}>
                                <Text fontWeight={'700'}>How it works</Text>
                            </Link>
                            {/* Check all these fields instead if isAuthenticated. If one is set due to some error, user can clear it. */}
                            {(accountId || zoneId || accessToken || isLoggingOut) ?
                                <Button onClick={() => {
                                    setIsLoggingOut(true);
                                    clearAllValues()
                                    localStorage.clear();
                                }}
                                    variant='outline'
                                    isLoading={isLoggingOut}
                                >
                                    Log out
                                </Button>
                                :
                                <Link as={NextLink} href="/login">
                                    <Button
                                        variant='outline'
                                        size={'lg'}
                                        iconSpacing={5}
                                        rightIcon={<ArrowForwardIcon />}
                                    >
                                        Launch
                                    </Button>
                                </Link>
                            }
                        </HStack>
                    </div>
                </Flex>
            </Container >
        </Box>
    );
}
