import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { setAddServerOpen, setAddServerWindow } from "../../features/addServer";
import { useAppDispatch } from "../../redux/hooks";
import closeIcon from "../../../assets/closeIcon.svg";
import AddServerIcon from "../servers/AddServerIcon";

export default function AboutServer() {
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setAddServerOpen(false));
    dispatch(setAddServerWindow("Create Server"));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function openCustomizeWindow() {
    dispatch(setAddServerWindow("Customize Server"));
  }

  function goBack() {
    dispatch(setAddServerWindow("Create Server"));
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>Tell us more about your server</Heading>

          <Body>
            In order to help you with your setup, is your new server for just a
            few friends or a larger community?
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

        <ButtonsContainer>
          <CreateServerButton onClick={openCustomizeWindow}>
            <CreateServerIcon width={48} height={48} />

            <ButtonText>For me and my friends</ButtonText>
          </CreateServerButton>

          <CreateServerButton onClick={openCustomizeWindow}>
            <CreateServerIcon width={48} height={48} />

            <ButtonText>For a club or community</ButtonText>
          </CreateServerButton>

          <SubText>
            Not sure? You can{" "}
            <LinkText onClick={openCustomizeWindow}>
              skip this question
            </LinkText>{" "}
            for now
          </SubText>
        </ButtonsContainer>

        <BackButtonContainer>
          <BackButton onClick={goBack}>Back</BackButton>
        </BackButtonContainer>
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

const ButtonsContainer = tw.div`
  mt-6 p-2 pl-4 text-center
`;

const CreateServerButton = tw.button`
  w-full flex mb-2 items-center border rounded-lg group
  hover:bg-gray-500/[0.08]
`;

const CreateServerIcon = tw(AddServerIcon)`
  m-2 ml-4 rounded-3xl border border-active fill-white
  group-hover:fill-gray-500/[0.08]
`;

const ButtonText = tw.span`
  font-bold
`;

const SubText = tw.span`
`;

const LinkText = tw.span`
  text-sm text-blue-600 cursor-pointer
  hover:underline hover:decoration-blue-600
`;

const BackButtonContainer = tw.div`
  flex items-center p-4 bg-gray-50
`;

const BackButton = tw.button`
  px-1 py-0.5 text-sm font-medium
`;
