"use client"
import { Container } from '@chakra-ui/react'
import Authentication from '@/components/Authentication';

export default function Page() {
  return (
    <main>
      <Container maxW={500}>
        <Authentication />
      </Container>
    </main>
  )
}
