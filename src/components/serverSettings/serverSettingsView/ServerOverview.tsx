import Image from "next/image";
import { useRouter } from "next/router";
import tw from "tailwind-styled-components/dist/tailwind";
import { useServersState } from "../../../features/servers";
import DefaultServerIcon from "../../servers/DefaultServerIcon";

export default function ServerOverview() {
  const { server } = useServersState();
  const router = useRouter();

  return (
    <Container>
      <Heading>Server Overview</Heading>

      <ServerSettings>
        <ServerIconDisplay>
          <ServerIconContainer>
            <HoverTextBackdrop>
              <HoverText>CHANGE ICON</HoverText>
            </HoverTextBackdrop>
            {server.img ? (
              <StyledImage
                loader={() => server.img}
                src={server.img}
                width={100}
                height={100}
              />
            ) : (
              <ServerIcon
                server={server}
                width={100}
                height={100}
                path={router.asPath}
              />
            )}
          </ServerIconContainer>
          <SmallText>
            Minimum Size: <Bold>128x128</Bold>
          </SmallText>
        </ServerIconDisplay>

        <ServerNameInputContainer>
          <ServerNameInputLabel>SERVER NAME</ServerNameInputLabel>

          <ServerNameInput type="text" value={server.name} />
        </ServerNameInputContainer>
      </ServerSettings>
      <Divider />
    </Container>
  );
}

const Container = tw.main`
  min-w-[462px] max-w-[660px] pt-15 px-10 pb-20
`;

const Heading = tw.h2`
  mb-5 text-xl font-semibold
`;

const ServerSettings = tw.section`
  flex
`;

const SubHeading = tw.h5`
  mt-10 text-xs font-semibold
`;

const Divider = tw.div`
  max-w-165 h-px border-t mt-10 border-gray-900/[0.08]
`;

const ServerIconContainer = tw.div`
  relative flex justify-center items-center text-center w-[100px] h-[100px] drop-shadow-xl group cursor-pointer
`;

const HoverTextBackdrop = tw.div`
  absolute hidden w-full h-full bg-black bg-opacity-50 rounded-full z-10 group pointer-events-none
  group-hover:block
`;

const HoverText = tw.span`
  absolute flex w-full h-full justify-center items-center text-[10px] text-white font-bold
`;

const SmallText = tw.small`
  mt-2.5 text-gray-500 text-[10px] leading-[10px]
`;

const Bold = tw.small`
  font-bold
`;

const ServerIconDisplay = tw.div`
`;

const ServerIcon = tw(DefaultServerIcon)`
  fill-primary rounded-full text-black
`;

const StyledImage = tw(Image)`
  rounded-full object-cover
`;

const ServerNameInputContainer = tw.div`
  flex flex-col
`;

const ServerNameInputLabel = tw.label`
`;

const ServerNameInput = tw.input`
`;
