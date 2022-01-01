import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { setaddServerOpen } from "../features/addServer";
import { useAppDispatch } from "../redux/hooks";
import closeIcon from "../../assets/closeIcon.svg";

export default function AddServer() {
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setaddServerOpen(false));
  }

  return (
    <Backdrop>
      <Container>
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
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black bg-opacity-[0.85] z-20
`;

const Container = tw.div`
  fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-110 h-50 bg-white rounded-md
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
