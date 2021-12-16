import tw from "tailwind-styled-components/dist/tailwind";
import UserProfileCard from "./UserProfileCard";

export default function MyAccountSettings() {
  return (
    <Container>
      <Heading>My Account</Heading>

      <UserProfileCard />

      <Heading>Password</Heading>

      <SubHeading>ACCOUNT REMOVAL</SubHeading>
    </Container>
  );
}

const Container = tw.main`
`;

const Heading = tw.h2`
`;

const SubHeading = tw(Heading)`
`;
