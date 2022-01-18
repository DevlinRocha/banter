import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { setServerName, useServersState } from "../../../features/servers";
import {
  setServerChangesMade,
  useServerSettingsState,
} from "../../../features/serverSettings";
import { useAppDispatch } from "../../../redux/hooks";
import DefaultServerIcon from "../../servers/DefaultServerIcon";

export default function ServerOverview() {
  const inputRef = useRef<HTMLInputElement>();
  const { server } = useServersState();
  const { serverCopy } = useServerSettingsState();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!serverCopy) return;

    if (server !== serverCopy) {
      dispatch(setServerChangesMade(true));
    } else {
      dispatch(setServerChangesMade(false));
    }
  }, [server, serverCopy]);

  function handleChange() {
    if (!inputRef.current) return;

    dispatch(setServerName(inputRef.current.value));
  }

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

          <ServerNameInput
            type="text"
            defaultValue={server.name}
            onChange={handleChange}
            ref={inputRef}
          />
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
  relative flex justify-center items-center text-center w-[100px] h-[100px] mr-[10px] drop-shadow-xl group cursor-pointer
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
  fill-primary rounded-full text-black text-[40px]
`;

const StyledImage = tw(Image)`
  rounded-full object-cover
`;

const ServerNameInputContainer = tw.div`
  flex flex-col
`;

const ServerNameInputLabel = tw.label`
  mb-4 text-xs text-gray-800 font-semibold
`;

const ServerNameInput = tw.input`
  w-full h-10 p-2.5 border border-gray-300 rounded-middle text-gray-800 font-medium bg-gray-50
`;
