"use client"
import { useContext, useEffect } from 'react';
import { Box, Button, Container, Heading, Text, Image, HStack, VStack } from '@chakra-ui/react'
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';
import { AppleMailIcon, GmailIcon, OutlookIcon, ProtonMailIcon } from '@/icons';

export default function Page() {

  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/app";
    }
  }, [isAuthenticated])

  return (
    <main>

      <Container maxW={870}>
        <VStack spacing={35} textAlign={'center'} py={70}>

          <Box bg="green.100" rounded={10} padding={3}>
            <b>The #1 privacy lifehack</b>
          </Box>

          <Heading as="h1" fontSize={['3xl', '5xl', '7xl']} fontWeight={900} m={0} >
            Protect your inbox from unwanted emails
            {/* using Cloudflare<Text as="span" fontSize={['sm§', 'lg']} fontWeight={'400'} verticalAlign={'super'}>®</Text> */}
          </Heading>

          <div>
            <Text fontSize={['md', 'xl']}>
              Free unlimited disposable emails with uncompromised privacy.
            </Text>
            <br />
            <br />

            <Text fontSize={'sm'} mb={3}>Works with any email provider</Text>

            <HStack spacing={4} justifyContent={'center'}>
              <GmailIcon boxSize={10} />
              <OutlookIcon boxSize={10} />
              <AppleMailIcon boxSize={10} />
              <ProtonMailIcon boxSize={10} />
            </HStack>


            <br />
            {/* <b>Free</b>* (you need a domain)
              <br /> */}

            {/* All you need is a domain in Cloudflare. */}
            {/* All through your own domain and Cloudflare Email Routing. */}

            {/* No registreation. No accounts. You only need your Cloudflare account and a domain connected to it. */}
            <HStack spacing={2} justifyContent={'center'}>
              <Link href={"/start"}>
                <Button
                  mt={8}
                  colorScheme="blue"
                  size="lg"
                >
                  Get started
                </Button>
              </Link>
            </HStack>
          </div>

        </VStack>
      </Container>

      <Container maxW={820}>

        <Text fontSize={['lg']}>
          Your email address is a universal key for a myriad of online services like shopping, streaming, banking, hotel booking, gaming, social media, etc.
          <br />
          <br />
          But it also doubles as the hottest club in town for pesky spam mails and an uncontrollable amount of promotional emails that you never asked for.
          <br />
          <br />
          Imagine an alternate reality. One where your inbox isn't a jumbled mess but an oasis of organization. No more spam, no more unsolicited promotions. Just the emails you want, waiting neatly for your attention.
          <br />
          <br />

          A clean inbox it what you can get by using Cloudflare Email Routing.
          Create as many email addresses as you need, all redirected to your existing mailbox (Gmail/Outlook/Apple Mail).
          <br />
          <br />
          Hopefully our tool can make the digital world a tad bit simpler for you.
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
              The "Unsubscribe" button feels like a joke, <u>and I'm done</u>. It's time to take back control and <Text as="span" fontWeight={'bold'} color='red' >stop</Text> to every unwanted, intrusive, promotional email from disrespecting my inbox.
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

    </main >
  )
}
