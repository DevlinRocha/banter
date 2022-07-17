import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { setAddServerOpen, setAddServerWindow } from "../../features/addServer";
import { useAppDispatch } from "../../redux/hooks";
import closeIcon from "../../../assets/closeIcon.svg";
import AddServerIcon from "../servers/AddServerIcon";

export default function CreateServer() {
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setAddServerOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function openAboutWindow() {
    dispatch(setAddServerWindow("About Server"));
  }

  function openJoinWindow() {
    dispatch(setAddServerWindow("Join Server"));
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>Create a server</Heading>

          <Body>
            Your server is where you and your friends hang out. Make yours and
            start talking.
          </Body>

          <CloseIcon onClick={closeWindow}>
            <StyledImage
              src={closeIcon}
              width={24}
              height={24}
              alt="Close button"
            />
          </CloseIcon>
        </HeadingContainer>

        <ButtonContainer>
          <CreateServerButton onClick={openAboutWindow}>
            <CreateServerIcon width={48} height={48} />

            <ButtonText>Create My Own</ButtonText>
          </CreateServerButton>
        </ButtonContainer>

        <JoinServerContainer>
          <JoinServerHeading>Have an invite already?</JoinServerHeading>

          <JoinServerButton onClick={openJoinWindow}>
            Join a Server
          </JoinServerButton>
        </JoinServerContainer>
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
  pt-6 px-4 text-center
`;

const Heading = tw.h2`
  w-full text-2xl font-bold
`;

const Body = tw.p`
  w-full mt-2 text-gray-500
`;

const CloseIcon = tw.button`
  absolute top-4 right-4 p-1
`;

const StyledImage = tw(Image)`
`;

const ButtonContainer = tw.div`
  mt-6 p-2 pl-4
`;

const CreateServerButton = tw.button`
  flex w-full items-center border rounded-lg group
  hover:bg-gray-500/[0.08]
`;

const CreateServerIcon = tw(AddServerIcon)`
  m-2 ml-4 rounded-3xl border border-active fill-white
  group-hover:fill-gray-500/[0.08]
`;

const ButtonText = tw.span`
  font-bold
`;

const JoinServerContainer = tw.div`
  flex flex-col items-center p-4 bg-gray-50
`;

const JoinServerHeading = tw.h3`
  mb-2 text-xl font-semibold leading-6
`;

const JoinServerButton = tw.button`
  w-full h-9.5 px-4 py-0.5 bg-gray-500 text-sm text-white font-medium rounded-middle
`;
