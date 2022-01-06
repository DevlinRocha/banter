import tw from "tailwind-styled-components/dist/tailwind";

export default function UserProfileSettings() {
  return (
    <Container>
      <Heading>User Profile</Heading>

      <Separator />
    </Container>
  );
}

const Container = tw.main`
  pt-15 px-10 pb-20
`;

const Heading = tw.h1`
  mb-5 text-xl font-semibold w-165
`;

const Separator = tw.div`
  w-full mb-6 pb-1 border-b border-gray-200
`;
