import tw from "tailwind-styled-components";
import { useServersState } from "../../features/servers";

export default function Title() {
  const { channel } = useServersState();

  return (
    <Section>
      <Hamburger />

      <Heading># {channel.name}</Heading>

      <Divider>|</Divider>

      <Topic>{channel.topic}</Topic>
    </Section>
  );
}

const Section = tw.section`
  flex sticky top-0 w-full h-10 bg-white z-10
`;

const Hamburger = tw.div`
  lg:hidden
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
