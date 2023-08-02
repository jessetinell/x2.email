"use client"
import { Button, Container, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link';
import React from "react";

export default function Footer() {

    return (
        <Container borderTop={'1px solid #e2e2e2'} height={400} marginTop={130} paddingTop={20} maxW={900} boxShadow='sm' centerContent>
            <VStack>
                <Text fontSize={['6xl']} mb={10} textAlign={'center'} fontWeight={'bold'}>
                    Protect your inbox today.
                </Text >
                <Link href="/login">
                    <Button
                        size={'lg'}
                    >
                        Get started
                    </Button>
                </Link>
            </VStack>
        </Container>
    );
}
