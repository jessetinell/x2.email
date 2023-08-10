'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from './UserContext';
import CloudflareProvider from './CloudflareContext';

export function Providers({ children }: any) {
    return (
        <CacheProvider>
            <ChakraProvider>
                <UserProvider>
                    <CloudflareProvider>
                        {children}
                    </CloudflareProvider>
                </UserProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}