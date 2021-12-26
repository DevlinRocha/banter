import tw from "tailwind-styled-components/dist/tailwind";
import UserProfileCard from "./UserProfileCard";

export default function MyAccountSettings() {
  return (
    <Container>
      <Heading>My Account</Heading>

      <UserProfileCard />

      <Divider />

      <PasswordSettings>
        <Heading>Password</Heading>

        <SubHeading>ACCOUNT REMOVAL</SubHeading>
      </PasswordSettings>

      <Divider />
    </Container>
  );
}

const Container = tw.main`
  pt-15 px-10 pb-20
`;

const Heading = tw.h2`
  mb-5
`;

const SubHeading = tw(Heading)`
`;

const Divider = tw.div`
  max-w-165 h-px border-t mt-10 border-gray-900/[0.08]
`;

const PasswordSettings = tw.section`
  mt-10
`;
