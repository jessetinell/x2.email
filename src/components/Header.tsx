"use client"
import { Box, Button, Container, Flex, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';

export default function Header() {

    const { accountId, zoneId, accessToken, isAuthenticated, clearAllValues } = useContext(UserContext);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    useEffect(() => {
        if (isLoggingOut && !accountId && !zoneId && !accessToken) {
            window.location.href = "/";
        }
    }, [isLoggingOut, accountId, zoneId, accessToken])

    return (
        <Box py={5} mb={10} boxShadow='sm'>
            <Container maxW={'100%'}>
                <Flex justifyContent="space-between">
                    <Link href={isAuthenticated ? "/app" : "/"}>
                        <Text fontSize='2xl' fontWeight={'black'}>xmin.email</Text>
                    </Link>

                    {/* Check all these fields instead if isAuthenticated. If one is set due to some error, user can clear it. */}
                    {(accountId || zoneId || accessToken || isLoggingOut) &&
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
                    }
                </Flex>
            </Container >
        </Box>
    );
}
