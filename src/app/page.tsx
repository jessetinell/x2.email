"use client"
import { useContext, useEffect } from 'react';
import { Box, Button, Container, Heading, Text, Image, HStack, VStack } from '@chakra-ui/react'
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';

export default function Page() {

  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/app";
    }
  }, [isAuthenticated])

  return (
    <main>

      <Container maxW={900}>
        <VStack spacing={35} textAlign={'center'} py={100}>
          <Heading as="h1" fontSize={['3xl', '5xl', '7xl']} fontWeight={'900'}>
            <Text whiteSpace={'nowrap'}>Protect your inbox</Text>
            using Cloudflare<Text as="span" fontSize={['sm§', 'lg']} fontWeight={'400'} verticalAlign={'super'}>®</Text>.
          </Heading>

          <div>
            <Text fontSize={['md', 'xl']}>
              Generate unlimited, free disposable emails, directly delivered to your Gmail, Outlook, Apple Mail, etc. All through your own domain and Cloudflare's Email Routing.

              {/* Create infinite free, privacy friendly, disposable emails that are routed straight to your Gmail/iCloud/etc.
              <br />
              Simply by using your own domain and Cloudflare's Email Routing. */}

              {/* With Cloudflare Alias, you can create unique email addresses for every service you use, then forward them to your real email address (Gmail, for example). If you start getting spam, you can disable or delete the alias. */}

              {/* https://chat.openai.com/c/7a14a594-aca7-41df-bcfd-a38df910830d */}
            </Text>
            <HStack spacing={2} justifyContent={'center'}>
              <Link href={"/login"}>
                <Button
                  mt={8}
                  colorScheme="blue"
                  size="lg"
                >
                  Protect my inbox
                </Button>
              </Link>
              <Link href={"/about"}>
                <Button
                  mt={8}
                  colorScheme="gray"
                  variant={'ghost'}
                  size="lg"
                >
                  See how it works
                </Button>
              </Link>
            </HStack>
          </div>

        </VStack>
      </Container>

      <Container maxW={820}>

        <Text fontSize={['lg']}>
          Email, your universal key for a myriad of online services like shopping, banking, social media, streaming, and you name it.
          <br />
          <br />
          But it also doubles as the hottest club in town for pesky spam mails and an avalanche of promotional emails you never asked for.
          <br />
          <br />
          Imagine an alternate reality. One where your inbox isn't a jumbled mess but an oasis of organization. No more spam, no more unsolicited promotions. Just the content you want, waiting neatly for your attention.
          <br />
          <br />
          The thing is. It's
          This is inbox we want.
          <br />
          <br />
          This tool is your magic wand to create as many email addresses as you need, all redirected to your existing mailbox (Gmail/Outlook/Apple Mail).
          <br />

          Hopefully our tool will make the digital world a tad bit simpler for you.
        </Text>
        <br />
        <br />
        <br />
        <br />
        <br />

        USP: Disable certain addresses in case they get spammed

        <HStack spacing={15}>
          <Image src="https://via.placeholder.com/150" borderRadius={'50%'} />
          <HStack spacing={2} align={'top'}>
            <Text as="span" lineHeight={1} fontSize={'5xl'} fontWeight={'bold'}>"</Text>
            <Text>
              The "Unsubscribe" button feels like a joke, <u>and I'm done</u>. It's time to take back control and <Text as="span" fontWeight={'bold'} color='red' >stop</Text> to every unwanted, intrusive, promotional email disrespecting my inbox.
            </Text>
          </HStack>

        </HStack>

        - No account needed. No registration. No email. No password. Only your Cloudflare credentials.
        - Privacy first. No data goes through our servers. We don't store anything about you or your emails.

        <Text fontSize={'xl'} mt={5} textAlign={'center'}>
          Self-hosting
        </Text>
        <Text>
          Deploy on Vercel.
          Clone the repo.
          Use Cloudflare dashboard.
        </Text>


        <Button>
          Login
        </Button>
        <br />
        <br />
        <br />
        <p>
          Open source.
          <br />
          Privacy friendly.
          <br />

        </p>
        <p>
          Coming soon: Chrome extension.

        </p>
      </Container>

    </main>
  )
}
