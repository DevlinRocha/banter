import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { uploadServerImagePreview } from "../../../../firebase";
import {
  setServerImage,
  setServerName,
  useServersState,
} from "../../../features/servers";
import {
  setServerChangesMade,
  setServerIconPreview,
  useServerSettingsState,
} from "../../../features/serverSettings";
import { useUserState } from "../../../features/user";
import { useAppDispatch } from "../../../redux/hooks";
import DefaultServerIcon from "../../servers/DefaultServerIcon";

export default function ServerOverview() {
  const inputRef = useRef<HTMLInputElement>();
  const fileRef = useRef<HTMLInputElement>();
  const { user } = useUserState();
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

  function handleClick() {
    if (!fileRef.current) return;

    fileRef.current.click();
  }

  async function changeIcon(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const iconImage = e.target.files[0];

    const iconURL = await uploadServerImagePreview(iconImage, user.userID);

    dispatch(setServerImage(iconURL));
    dispatch(setServerIconPreview(iconImage));
  }

  function removeIcon() {
    dispatch(setServerImage(""));
    dispatch(setServerIconPreview(null));
  }

  return (
    <Container>
      <Heading>Server Overview</Heading>

      <ServerSettings>
        <UploadIconContainer>
          <ServerIconDisplay>
            <ServerIconContainer onClick={handleClick}>
              <HoverTextBackdrop>
                <HoverText>CHANGE</HoverText>
                <HoverText>ICON</HoverText>
              </HoverTextBackdrop>

              {server.img ? (
                <StyledImage
                  loader={() => server.img}
                  src={server.img}
                  width={100}
                  height={100}
                  unoptimized
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

            {server.img ? (
              <SubText onClick={removeIcon}>Remove</SubText>
            ) : (
              <SmallText>
                Minimum Size: <Bold>128x128</Bold>
              </SmallText>
            )}
          </ServerIconDisplay>

          <UploadImageContainer>
            <UploadImageText>
              We recommend an image of at least 512x512 for the server.
            </UploadImageText>

            <UploadImageButton>
              Upload Image
              <FileInput
                onChange={changeIcon}
                type="file"
                accept=".svg, .png, .jpg, .jpeg"
                ref={fileRef}
              />
            </UploadImageButton>
          </UploadImageContainer>
        </UploadIconContainer>

        <ServerNameInputContainer>
          <ServerNameInputLabel>SERVER NAME</ServerNameInputLabel>

          <ServerNameInput
            type="text"
            value={server.name}
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
  min-w-[542px] max-w-[740px] pt-15 px-10 pb-20
`;

const Heading = tw.h2`
  mb-5 text-xl font-semibold
`;

const ServerSettings = tw.section`
  flex
`;

const UploadIconContainer = tw.div`
  flex mr-2.5
`;

const SubText = tw.a`
  mt-2.5 text-sm text-gray-600 font-semibold leading-[14px] cursor-pointer
`;

const Divider = tw.div`
  max-w-165 h-px border-t mt-10 border-gray-900/[0.08]
`;

const ServerIconDisplay = tw.div`
  flex flex-col items-center text-center mr-2.5
`;

const ServerIconContainer = tw.div`
  relative w-[100px] h-[100px] drop-shadow-xl group cursor-pointer
`;

const HoverTextBackdrop = tw.div`
  absolute hidden w-full h-full bg-black/50 rounded-full z-10 group pointer-events-none leading-3
  group-hover:flex group-hover:flex-col group-hover:justify-center
`;

const HoverText = tw.span`
  text-[10px] text-white font-bold
`;

const SmallText = tw.small`
  mt-2.5 text-gray-500 text-[10px] leading-[10px]
`;

const Bold = tw(SmallText)`
  font-bold
`;

const UploadImageContainer = tw.div`
  flex flex-col ml-2.5 min-w-[128px] max-w-[180px]
`;

const UploadImageText = tw.span`
  mb-2 text-sm text-gray-600 font-medium
`;

const UploadImageButton = tw.button`
  relative mt-2 px-4 py-0.5 w-fit h-[38px] text-sm text-gray-500 border border-gray-500 rounded-[3px]
`;

const FileInput = tw.input`
  absolute top-0 left-0 w-full h-full text-[0] cursor-pointer
  file:border-0 file:bg-transparent
`;

const ServerIcon = tw(DefaultServerIcon)`
  fill-primary rounded-full text-black text-[40px] group
  group-hover:text-[0]
`;

const StyledImage = tw(Image)`
  rounded-full object-cover
`;

const ServerNameInputContainer = tw.div`
  flex flex-col mb-5 ml-2.5 min-w-[206px] w-[320px] max-w-[320px]
`;

const ServerNameInputLabel = tw.label`
  mb-2 text-xs text-gray-800 font-semibold
`;

const ServerNameInput = tw.input`
  w-full h-10 p-2.5 border border-gray-300 rounded-middle text-gray-800 font-medium bg-gray-50
`;
