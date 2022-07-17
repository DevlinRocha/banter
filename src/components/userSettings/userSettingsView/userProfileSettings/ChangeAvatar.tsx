import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../../../../redux/hooks";
import closeIcon from "../../../../../assets/closeIcon.svg";
import { setChangeAvatarOpen } from "../../../../features/userSettings";
import { uploadAvatarPreview } from "../../../../../firebase";
import {
  setUserAvatar,
  setUserAvatarPreview,
  useUserState,
} from "../../../../features/user";

export default function ChangeAvatar() {
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setChangeAvatarOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  async function changeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const avatarImage = e.target.files[0];

    const avatarURL = await uploadAvatarPreview(avatarImage, user.userID);

    closeWindow();

    dispatch(setUserAvatar(avatarURL));
    dispatch(setUserAvatarPreview(avatarImage));
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>Select Image</Heading>

          <CloseIcon onClick={closeWindow}>
            <StyledImage
              src={closeIcon}
              width={24}
              height={24}
              alt="Close button"
            />
          </CloseIcon>
        </HeadingContainer>

        <ContentContainer>
          <FileInputContainer>
            <UploadIconContainer />

            <UploadIconLabel htmlFor="fileInput">Upload File</UploadIconLabel>

            <FileInput
              onChange={changeAvatar}
              type="file"
              accept=".svg, .png, .jpg, .jpeg"
              id="fileInput"
            />
          </FileInputContainer>
        </ContentContainer>
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black/[0.85] z-20
`;

const Container = tw.div`
  fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-110 bg-white rounded-md
`;

const HeadingContainer = tw.div`
  p-4 pl-5
`;

const Heading = tw.h2`
  w-full text-2xl font-bold
`;

const CloseIcon = tw.button`
  absolute top-4 right-4 p-1
`;

const StyledImage = tw(Image)`
`;

const ContentContainer = tw.div`
  flex justify-center pr-2 pb-4 pl-4
`;

const FileInputContainer = tw.div`
  relative flex flex-col items-center w-[192px] h-[196px] p-4 bg-gray-200 rounded pointer-events-none
`;

const UploadIconContainer = tw.div`
  w-32 h-32 bg-indigo-500 rounded-full z-20
`;

const UploadIconLabel = tw.label`
  mt-4 text-sm text-gray-600 font-semibold z-20
`;

const FileInput = tw.input`
  absolute top-0 left-0 w-full h-full text-[0px] cursor-pointer pointer-events-auto rounded
  file:w-full file:h-full file:border-0
`;
