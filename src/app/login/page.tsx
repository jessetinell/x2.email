"use client"
import { Box, Container } from '@chakra-ui/react'
import Authentication from '@/components/Authentication';
import { H3 } from '@/components/Headings';
import Link from 'next/link';
import { ChevronRightIcon } from '@chakra-ui/icons';

export default function Page() {
  return (
    <main>
      <Container maxW={500}>
        <Authentication />
      </Container>
      <Container>

        <Box mt={20} textAlign={'center'}>
          <H3>New to Cloudflare?</H3>
          <Link href={"/login/cloudflare"}><u><b>Read this</b></u> <ChevronRightIcon /></Link>
        </Box>
      </Container>
    </main>
  )
}
