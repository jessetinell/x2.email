"use client"
import { Container } from '@chakra-ui/react'
import CloudflareEmailRouterSettings from '@/components/CloudflareEmailRouterSettings'

export default function Page() {
  return (
    <main>
      <Container maxW={700} pt={8}>
        <CloudflareEmailRouterSettings />
      </Container>
    </main>
  )
}
