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
  pt-15 px-10 pb-20
`;

const Heading = tw.h2`
  mb-5
`;

const SubHeading = tw(Heading)`
`;
