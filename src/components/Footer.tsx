"use client"
import { Box, Button, Container, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from "react";

export default function Footer() {

    return (
        <Flex py={5} alignItems={'center'} justifyContent={'center'} boxShadow='sm' height={400} backgroundColor={'black'} marginTop={150}>
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
        </Flex>
    );
}
