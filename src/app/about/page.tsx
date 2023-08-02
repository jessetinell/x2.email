"use client"
import { Box, Button, Container, Heading, Text, Image, HStack, VStack } from '@chakra-ui/react'
import Link from 'next/link';

export default function Page() {

  return (
    <main>

      <Container maxW={800} mt={10}>
        <Text as="h1" fontSize={['lg', '4xl']} fontWeight={700}>
          Protect your inbox with aliases
        </Text>

        Prerequisites:
        - A domain in Cloudflare
        <br />
        - Pro tip: Get a 99 cent domain and point it to Cloudflare: https://www.namecheap.com/promos/99-cent-domain-names/
        <br />


        {/* But, here's the rub:
        ultimate honeypot for those spammy invaders */}


        Read more about Cloudflare Email Routing: https://blog.cloudflare.com/introducing-email-routing/

        <h3>Your aliases</h3>
        <Image src="/img/how-it-works-illustration.svg" />

        <br />
        <h3>If you start getting spam, just <u>disable</u> the alias</h3>
        <Image src="/img/how-it-works-illustration-disabled.svg" />

      </Container>

    </main>
  )
}
