import { Heading as ChakraHeading } from "@chakra-ui/react";

const H1 = ({ children, as, ...props }: any) => (
  <ChakraHeading as={'h1'} fontSize={["3xl", "6xl"]} fontWeight={'900'} {...props}>
    {children}
  </ChakraHeading>
);


const H2 = ({ children, as, ...props }: any) => (
  <ChakraHeading as={'h2'} fontSize={["3xl", "5xl"]} fontWeight={'900'} {...props}>
    {children}
  </ChakraHeading>
);

const H3 = ({ children, as, ...props }: any) => (
  <ChakraHeading as={'h3'} fontSize={["2xl", "3xl"]} fontWeight={'900'} {...props}>
    {children}
  </ChakraHeading>
);

export {
  H1,
  H2,
  H3,
}