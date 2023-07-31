'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from './UserContext';

export function Providers({ children }: any) {
    return (
        <CacheProvider>
            <ChakraProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}