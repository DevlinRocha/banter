import tw from "tailwind-styled-components/dist/tailwind";
import MyAccountCard from "./MyAccountCard";

export default function MyAccountSettings() {
  return (
    <Container>
      <Heading>My Account</Heading>

      <MyAccountCard />

      <Divider />

      <AccountSettings>
        <Heading>Password</Heading>

        <Divider />

        <SubHeading>ACCOUNT REMOVAL</SubHeading>
      </AccountSettings>
    </Container>
  );
}

const Container = tw.main`
  pt-15 px-10 pb-20
`;

const Heading = tw.h2`
  mb-5 text-xl font-semibold
`;

const SubHeading = tw.h5`
  mt-10 text-xs font-semibold
`;

const Divider = tw.div`
  max-w-165 h-px border-t mt-10 border-gray-900/[0.08]
`;

const AccountSettings = tw.section`
  mt-10
`;
