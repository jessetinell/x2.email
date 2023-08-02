"use client"
import { Box, Button, Container, Heading, Text, Image, HStack, VStack } from '@chakra-ui/react'
import Link from 'next/link';

export default function Page() {

  return (
    <main>

      <Container maxW={800} mt={10}>
        <Text as="h1" fontSize={['lg', '4xl']} fontWeight={700}>
          TODO: Common questions
        </Text>

        - I am not familiar with the technical details of email. Where is the email stored?
        {/* Does this service provide IMAP access for the messages? Or does this service require a separate email host? */}
        -Will I be able to respond from the alias email?
        A: No. This is a one-way email forwarder. You can only receive emails.



      </Container>

    </main>
  )
}
