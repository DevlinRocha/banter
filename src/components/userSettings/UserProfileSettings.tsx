import tw from "tailwind-styled-components/dist/tailwind";

export default function UserProfileSettings() {
  return (
    <Container>
      <Heading>User Profile</Heading>
    </Container>
  );
}

const Container = tw.main`
  pt-15 px-10 pb-20
`;

const Heading = tw.h2`
`;
