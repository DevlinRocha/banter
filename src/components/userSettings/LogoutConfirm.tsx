import tw from "tailwind-styled-components/dist/tailwind";

export default function LogoutConfirm() {
  return (
    <Container>
      <Heading>Log Out</Heading>

      <Body>Are you sure you want to log out?</Body>
    </Container>
  );
}

const Container = tw.div`
  fixed top-1/2 left-1/2 z-10
`;

const Heading = tw.h2`
`;

const Body = tw.p`
`;
