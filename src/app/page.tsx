"use client"
import { useContext, useEffect } from 'react';
import { Button, Container } from '@chakra-ui/react'
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
      <Container maxW={1080}>
        <Link href={"/login"}>
          <Button>
            Login
          </Button>
        </Link>
        <br />
        <br />
        <br />
        <p>
          Open source.
          <br />
          Privacy friendly.
          <br />
          99 cent domains:
          https://www.namecheap.com/promos/99-cent-domain-names/
        </p>
      </Container>

    </main>
  )
}
