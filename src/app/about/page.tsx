"use client"
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Heading, Text, Image, HStack, VStack, OrderedList, ListItem, UnorderedList } from '@chakra-ui/react'
import Link from 'next/link';

export default function Page() {

  return (
    <main>

      <Container maxW={800} mt={10}>
        <Text as="h1">
          Protect your inbox with Cloudflare Email Routing
        </Text>

        <Text as="h3">Summary</Text>
        <UnorderedList spacing={2}>
          <ListItem>
            With Cloudflare Email Routing you can create unlimited email aliases for your domain and point it to any email address you want (Gmail, Outlook, Apple Mail, etc.)

            <UnorderedList mt={2}>
              <ListItem>
                ✅<b> The benefit</b>: You have full control of your inbox. Say goodbye to the flood of spam and unsolicited promotional emails.
              </ListItem>
            </UnorderedList>

          </ListItem>
          <ListItem>
            This app, x2.email, is a sleek and straightforward interface to seamlessly manage your Cloudflare Email Routing aliases
          </ListItem>
        </UnorderedList>
        <br />
        <Box bg='blue.100' w='100%' p={4} rounded={3}>
          <Text>
            <Text as="span" mr="1">For more details, check out Cloudflare's blog post:</Text>
            <Link href={"https://blog.cloudflare.com/introducing-email-routing/"} target='_blank'>
              <Text as="u" mr="1">Introducing Email Routing</Text>
              <ExternalLinkIcon fontSize={'sm'} />
            </Link>
          </Text>
        </Box>
        <br />
        <br />



        <Text as="h3">Prerequisites</Text>
        <UnorderedList>
          <ListItem>
            A domain in Cloudflare
            <UnorderedList mt={2}>
              <ListItem>
                Tip: Get a 99 cent domain and point it to Cloudflare:{" "}
                <Link href={"https://www.namecheap.com/promos/99-cent-domain-names/"} target='_blank'>
                  <Text as="u" mx="1">99 cent domains</Text>
                  <ExternalLinkIcon fontSize={'sm'} />
                </Link>
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>

        <br />
        <Text as="h3">What's an email alias?</Text>
        <Text>
          An email alias is like a nickname for your primary email address.
          It enables you to receive messages directed to alternate email addresses
          all while neatly funneling them into your main inbox for convenient management.
        </Text>

        <br />
        <Image src="/img/how-it-works-illustration.svg" />

        <br />
        <br />
        <br />
        <Text>If you start getting spam or unwanted promotional emails you can just <u>disable</u> the alias</Text>
        <Image src="/img/how-it-works-illustration-disabled.svg" />
        <br />
        <Text as="h3">Why should I use email aliases?</Text>
        <Text>
          Wham, bam, thank you, Spam! Email aliases are like your personal email bodyguards - they shield your main inbox from the relentless flood of junk and those over-eager promotional emails. It's like having a secret identity; you can freely distribute your alias for all those sign-ups, downloads, and online purchases without ever exposing your primary email.
          <br />
          <br />
          Plus, they are the organizational superheroes you never knew you needed. By channeling messages from different sources into specific paths, they help you keep your email landscape neat and tidy.
          <br />
          <br />
          So why should you use email aliases? Because they are the protectors of your privacy, the champions of your organization, and the guardians of your sanity in the swirling vortex that is your inbox!
        </Text>

        <Text as="h3">
          When should I use email aliases?
        </Text>
        <Text>
          You can use email aliases when you're shopping online, signing up for that super juicy newsletter, or even when you're creating accounts on social media platforms.
          <br />
          <br />
          Got a new project at work? Whip out an alias to keep all those project-specific emails in check! It's like having separate compartments in your digital handbag – so you can easily fish out what you need, when you need it.
          <br />
          <br />
          In short, an email alias is your anytime, anywhere secret weapon in the digital world. Keep it close and unleash it when you need a dash of privacy, a dollop of organization, or simply to add a sprinkle of order to your online escapades!
        </Text>

      </Container>

    </main>
  )
}
