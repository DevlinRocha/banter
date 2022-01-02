import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { setaddServerOpen } from "../features/addServer";
import { useAppDispatch } from "../redux/hooks";
import closeIcon from "../../assets/closeIcon.svg";
import AddServerIcon from "./Servers/AddServerIcon";

export default function AddServer() {
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setaddServerOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
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
          <Button>
            <AddServerIconContainer width={48} height={48} />

            <Span>Create My Own</Span>
          </Button>
        </ButtonContainer>
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black bg-opacity-[0.85] z-20
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

const Button = tw.button`
  w-full flex items-center border rounded-lg group
  hover:bg-gray-500/[0.08]
`;

const AddServerIconContainer = tw(AddServerIcon)`
  m-2 ml-4 rounded-3xl border border-active fill-white
  group-hover:fill-gray-500/[0.08]
`;

const Span = tw.span`
  font-bold
`;
