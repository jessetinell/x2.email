"use client"
import { Container, Heading, Text, OrderedList, ListItem, Code } from '@chakra-ui/react'

export default function Page() {

  return (
    <main>

      <Container maxW={800} mt={10}>
        <Text as="h1" fontSize={['lg', '4xl']} fontWeight={700}>
          FAQ
        </Text>

        <Heading size="md">
          Will I be able to respond from the alias email?
        </Heading>
        <Text>
          No. This is a one-way email forwarder. You can only receive emails.
        </Text>
        <br />

        <Heading size="md" mb={3}>
          What are the limitations of Cloudflare Email Routing?
        </Heading>
        <OrderedList spacing={6} pl={5}>
          <ListItem>
            <b>Size</b>
            <br />
            Email Routing does not support messages bigger than 25 MiB
          </ListItem>
          <ListItem>
            <Text>
              <strong>Email Address Internationalization (EAI):</strong>
            </Text>
            <OrderedList spacing={3} mt={2}>
              <ListItem>
                Supported: Domains with internationalized Characters
                <br />
                <b>Example</b>: ✅ <Code>info@piñata.es</Code>
              </ListItem>
              <ListItem>
                Not Supported: Local-parts of email addresses with internationalized characters.
                <br />
                <b>Example</b>: ❌  <Code>piñata@piñata.es</Code>
              </ListItem>
            </OrderedList>
          </ListItem>

          <ListItem>
            <b>Non-delivery Reports (NDRs)</b>
            <br /> Email Routing won't forward NDRs. This implies the original sender won't get a notification if the email fails to deliver.
          </ListItem>

          <ListItem>
            <b>DMARC Policies & Email Forwarding</b>
            <br />
            Restrictive DMARC policies may lead to delivery issues for forwarded emails. For a deeper understanding, it's recommended to consult dmarc.org.
          </ListItem>

          <ListItem>
            <b>Replying using Cloudflare Domain</b>
            <br />
            If you receive a forwarded email and reply to it, the recipient will see it coming from your actual email address (e.g., <Code>my-name@gmail.com</Code>), not your custom Cloudflare domain address (e.g., <Code>info@my-company.com</Code>).
          </ListItem>

          <ListItem>
            <b>Special Characters in Custom Addresses</b>
            <br />
            In Email Routing, certain special characters like "+" and "." are seen as standard characters. So, any unique functionality tied to these characters in providers like Gmail won't apply here.
          </ListItem>

          <ListItem>
            <b>Subdomain Email Routing</b>
            <br />
            This feature is exclusive to Enterprise customers. If you're not on an Enterprise plan, you can't use Email Routing to forward emails from subdomains.
          </ListItem>
        </OrderedList>

        <br />
        <Heading size="md">
          Where are the emails stored?
        </Heading>
        <Text>
          Neither Cloudflare or x2.email store your emails anywhere. Cloudflare Email Routing simply directs your emails from your alias to your preferred email inbox.
          You will be able to read your emails in your email client (Gmail, Outlook, Apple Mail, etc.) as you usually do.
        </Text>
      </Container>
    </main>
  )
}
