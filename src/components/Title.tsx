import tw from "tailwind-styled-components";
import { useServersState } from "../features/servers";

export default function Title() {
  const { channel } = useServersState();

  return (
    <Container>
      <Hamburger />

      <Heading># {channel.name}</Heading>

      {channel.topic ? (
        <>
          <Divider />

          <Topic>{channel.topic}</Topic>
        </>
      ) : null}
    </Container>
  );
}

const Container = tw.section`
  flex flex-none h-12 px-2 items-center bg-white z-10 border-b border-gray-300
`;

const Hamburger = tw.div`
  lg:hidden
`;

const Heading = tw.h3`
  p-2
`;

const Divider = tw.div`
  w-px h-6 mx-2 bg-gray-300
`;

const Topic = tw.span`
  p-2 text-xs
`;
