"use client"
import { useContext, useEffect } from 'react';
import { Box, Button, Container, Heading, Text, Image, HStack, VStack, SimpleGrid, UnorderedList, ListItem, Flex } from '@chakra-ui/react'
import { UserContext } from '@/context/UserContext';
import Link from 'next/link';
import { AppleMailIcon, GmailIcon, OutlookIcon, ProtonMailIcon } from '@/icons';
import { H2, H3 } from '@/components/Headings';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function Page() {

  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/app";
    }
  }, [isAuthenticated])

  const ListItemWithIcon = ({ children, icon, ...props }: any) => (
    <HStack spacing={2} mb={5} alignItems={'top'} {...props}>
      {icon}
      <Text>{children}</Text>
    </HStack>
  );

  return (
    <main>


      <Container maxW={870}>
        <Flex minHeight={'81vh'} alignItems={'center'} justifyContent={'center'} mb={10}>
          <VStack spacing={35} textAlign={'center'} py={70}>

            <Box bg="green.100" rounded={7} padding={[2, 3]} fontSize={['x-small', 'lg']}>
              <b>Privacy lifehack</b>
            </Box>

            <Heading as="h1" fontSize={['3xl', '5xl', '7xl']} fontWeight={900} m={0}>
              Protect your inbox from unwanted junk
            </Heading>

            <div>
              <Box maxW={660}>
                <Text fontSize={['md', 'xl']} lineHeight={2}>

                  Create <Text as="span" borderBottom={'2px solid'} borderColor={'orange.300'}>disposable email addresses</Text> linked to your private email address.
                  {" "}
                  No more spam. 100% inbox control.
                </Text>

              </Box>

              <HStack spacing={2} justifyContent={'center'} mt={['2']}>
                <Link href={"#get-started"}>
                  <Button
                    mt={8}
                    colorScheme="orange"
                    size={['md', 'lg']}
                  >
                    Protect my inbox
                  </Button>
                </Link>
              </HStack>

              <HStack spacing={4} justifyContent={'center'} mt={'60px'} mb={2}>
                <GmailIcon boxSize={[6, 8]} />
                <OutlookIcon boxSize={[6, 8]} />
                <AppleMailIcon boxSize={[6, 8]} />
                <ProtonMailIcon boxSize={[6, 8]} />
              </HStack>
              <Text fontSize={['xs', 'sm']} mb={3} color="gray.500">Works with every email provider</Text>
            </div>

          </VStack>
        </Flex>
      </Container>


      <Container maxW={820}>
        <Box textAlign={'center'}>
          <H2 mt={0} mb={2}>
            Your email inbox...
          </H2>
        </Box>
        <SimpleGrid spacing={10} columns={{ sm: 1, md: 2 }} justifyContent={'center'} alignContent={'center'}>
          <Box maxW="md">
            <Heading as={'h3'} fontSize={'2xl'} mb={2}>
              ❌ Before
            </Heading>
            <Box px={5} py={6} rounded={10} backgroundColor={'red.100'}>
              <UnorderedList spacing={4} fontSize={'lg'}>
                <ListItem>
                  Promotional emails you never signed up for
                </ListItem>
                <ListItem>
                  Spam emails from bots and scammers
                </ListItem>
                <ListItem>
                  Unsubscribe buttons that doesn't work
                </ListItem>
                {/* <ListItem>
                  Use the same email for every online service
                </ListItem> */}
                <ListItem>
                  {/* Struggle to keep inbox at zero */}
                  Inbox Zero = Impossible
                </ListItem>
                <ListItem>
                  Email address being sold on the darknet due to data leaks
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
          <Box maxW="md">
            <Heading as={'h3'} fontSize={'2xl'} mb={2}>
              ✅ After
            </Heading>
            <Box px={5} py={6} rounded={10} backgroundColor={'green.100'}>
              <UnorderedList spacing={4} fontSize={'lg'}>
                <ListItem>
                  No promotional junk
                </ListItem>
                <ListItem>
                  No spam
                </ListItem>
                <ListItem>
                  More secure online identity
                </ListItem>
                {/* <ListItem>
                  New unique email for every online service
                </ListItem> */}
                <ListItem>
                  Inbox zero = Easy peasy
                  {/* Full control over your inbox */}
                </ListItem>
                <ListItem>
                  Hide your private email from darknet data breaches
                </ListItem>
              </UnorderedList>
            </Box>

          </Box>

        </SimpleGrid>
        <Box mt={20}>
          <H3>The problem with email addresses</H3>
          <Text fontSize={['md', 'lg']}>
            Your email address is a universal key for a ton of online services like shopping, coupon hunting, newsletter subscriptions, hotel bookings, social media, gaming, etc.
            <br />
            <br />
            Each time you sign up for a new service, you're also welcoming a new flood of promotional junk.
            <br />
            <br />
            Not to forget the possibility of each service you've ever signed up for being hacked and your email address then being sold on the darknet.
            <br />
            <br />
            So, it's not suprising your inbox also doubles as the hottest club in town for pesky spam emails and an endless flow of promotional junk.
          </Text>

          <H3>Rule #1 = Never share your <u>real</u> email address</H3>
          <Text fontSize={['md', 'lg']}>
            The best way to keep your inbox clean is to not share your private email with any website/app.
            <br />
            <br />
            When you sign up for a new service, it's better to use <b>disposable emails</b> instead of your real email.
          </Text>
          <H3>A unique email for each service</H3>
          <Text fontSize={['md', 'lg']}>
            With the help of <b>x2.email</b> and Cloudflare® you can create free disposable emails that forward emails to your private main inbox. Like demonstrated below.
          </Text>
          <Image src="/img/how-it-works-illustration.svg" py={3} />
          <br />
          <br />
          <Text fontSize={['md', 'lg']}>
            If you start receiving junk to any of your disposable emails, you can simply disable it.
          </Text>
          <Image src="/img/how-it-works-illustration-disabled.svg" py={3} />
        </Box>
      </Container>


      <Box>

        <Container maxW={820} mt={140}>
          <H2 fontSize={['4xl', '5xl', '7xl']} id="get-started">
            Get started
          </H2>
          <H3 mb={3}>
            You will need
          </H3>
          <UnorderedList spacing={3} mt={'2'} fontSize={'lg'}>
            <ListItem>
              A <Link href={'https://cloudflare.com'} target='_blank'><u>Cloudflare</u>®</Link> account
            </ListItem>
            <ListItem>
              A domain connected to Cloudflare®
            </ListItem>
          </UnorderedList>
          <br />
          <Text>
            💙
            <i> I apologize to the non-technical people who doesn't know how to get started.. <a href="mailto:contact@x2.email"><u>Send us an email</u></a> if you want to use this service without the hassle ($99/year)</i>
          </Text>

          <H3 mb={3}>
            About the solution
          </H3>
          <Text>
            <b>x2.email</b> is a minimalistic user interface built on top of Cloudflare's Email Routing service.
            <br />
            <br />
            x2.email communicates directly with the Cloudflare API through a secure proxy (due to CORS).
            You will authenticate using your own Cloudflare Account ID, Zone ID and Access token.
            <br />
            <br />
            You don't need to create an account or share any personal information with us.
          </Text>

          <H3 mb={4}>
            The benefits of using x2.email
          </H3>
          <Text fontSize={'lg'} color={'gray.500'} mb={5}>You <i>can</i> use Cloudflare's dashboard to manage your email aliases. But I mean...</Text>
          <Box fontSize={['lg']} p={2}>
            <ListItemWithIcon icon={<span>⚡️</span>}>
              <b>13x</b> faster email alias management compared to using Cloudflare's dashboard
            </ListItemWithIcon>
            <ListItemWithIcon icon={<span>💰</span>}>
              100% free
            </ListItemWithIcon>
            <ListItemWithIcon icon={<span>🚀</span>}>
              No registration or account is needed
            </ListItemWithIcon>
            <ListItemWithIcon icon={<span>🔒</span>}>
              Privacy-first: We don't store any user data
            </ListItemWithIcon>
            <ListItemWithIcon icon={<span>🧁</span>}>
              Open source. You can view the source code and host this application yourself for free on Vercel (please consider giving the repo a star though: <Link href="https://github.com/jessetinell/x2.email"><u>Github</u> <ExternalLinkIcon />)</Link>
            </ListItemWithIcon>
          </Box>

          <H3 mb={4}>
            Demo
          </H3>
          <Text>In this demo, I crafted a unique email address exclusively for my Netflix account.</Text>
          <video controls style={{ border: '3px solid #f8d53c', borderTop: 'none', borderRadius: '10px' }}>
            <source src="https://res.cloudinary.com/jesset/video/upload/v1696073209/x2.email/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <Box mt={100} textAlign={'center'} p={10} backgroundColor={'orange.100'} rounded={10}>
            <H2 mt={0} color={'orange.900'} >Coming soon</H2>
            <Text fontSize={'2xl'} color={'orange.900'} mb={5}>
              Chrome extension
              <br />
              Android app
              <br />
              iOS app
            </Text>
          </Box> */}
        </Container>
      </Box >

    </main >
  )
}
