import tw from "tailwind-styled-components";

export default function Title() {
  return (
    <Section>
      <Heading>Global Chat</Heading>
      <Divider>|</Divider>
      <Topic>Welcome to Banter</Topic>
    </Section>
  );
}

const Section = tw.section`
  flex sticky top-0 h-10 bg-white z-10
`;

const Heading = tw.h3`
  p-2
`;

const Divider = tw.div`
  p-1.5
`;

const Topic = tw.span`
  p-2
`;
