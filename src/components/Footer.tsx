'use client'

import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Link,
    useColorModeValue,
    Center,
    HStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import NextLink from 'next/link'
import { GithubIcon } from '@/icons'

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'900'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    )
}

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')} mt={'28'}>
            <Container as={Stack} maxW={'6xl'} pt={'16'} pb={'32'}>
                <SimpleGrid
                    templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr' }}
                    spacing={8}>
                    <Stack spacing={2}>
                        <Box>
                            <Link as={NextLink} href={"/"}>
                                <img src="/img/logo.svg" alt="x2.email" width={'130px'} />
                            </Link>
                        </Box>
                        <Text fontSize={'sm'}>
                            Minimalistic disposable email management
                        </Text>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>About</ListHeader>
                        <Link href="/faq" as={NextLink}>
                            FAQ
                        </Link>
                        <Link as={NextLink} href={"https://github.com/jessetinell/x2.email"} isExternal={true}>
                            <HStack spacing={1} >
                                <GithubIcon />
                                <Text>Github</Text>
                            </HStack>
                        </Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Contact</ListHeader>
                        <Link as={NextLink} href="mailto:feedback@x2.email">
                            <span><b>feedback</b>@x2.email</span>
                        </Link>
                        <Link as={NextLink} href="mailto:contact@x2.email">
                            <span><b>contact</b>@x2.email</span>
                        </Link>
                    </Stack>
                </SimpleGrid>
            </Container>
            <Center py={10} color={'gray.600'}>
                x2.email is not affiliated with Cloudflare
            </Center>
        </Box >
    )
}