"use client"
import { Container } from '@chakra-ui/react'
import CloudflareEmailRouterSettings from '@/components/CloudflareEmailRouterSettings'

export default function Page() {
  return (
    <main>
      <Container maxW={1080}>
        <CloudflareEmailRouterSettings />
      </Container>
    </main>
  )
}
