import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { setAddServerOpen, setAddServerWindow } from "../../features/addServer";
import { useAppDispatch } from "../../redux/hooks";
import closeIcon from "../../../assets/closeIcon.svg";
import { useRef } from "react";
import { joinServer } from "../../../firebase";

export default function JoinServer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setAddServerOpen(false));
    dispatch(setAddServerWindow("Create Server"));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function goBack() {
    dispatch(setAddServerWindow("Create Server"));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current || !inputRef.current.value) return;

    try {
      await joinServer(inputRef.current.value);

      closeWindow();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>Join a Server</Heading>

          <Body>Enter an invite to join an existing server</Body>

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
          <FormContainer onSubmit={handleSubmit}>
            <JoinServerLabel htmlFor="joinServerInput">
              INVITE LINK<Required>*</Required>
            </JoinServerLabel>

            <JoinServerInput
              type="text"
              placeholder="wo3H0AwdC68b5gvuJtKA"
              ref={inputRef}
              maxLength={999}
              required
              id="joinServerInput"
            />
          </FormContainer>

          <ExamplesContainer>
            <ExamplesHeading>INVITES SHOULD LOOK LIKE</ExamplesHeading>

            <Example>ke6NqegIvJEOa9cLzUEp</Example>
            <Example>wo3H0AwdC68b5gvuJtKA</Example>
            <Example>zJzL3eQ77S1nJ8YxCNvB</Example>
          </ExamplesContainer>
        </ContentContainer>
        <FooterContainer>
          <BackButton onClick={goBack}>Back</BackButton>

          <JoinButton onClick={handleSubmit} type="submit">
            Join Server
          </JoinButton>
        </FooterContainer>
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

const ContentContainer = tw.div`
  my-4 pr-2 pl-4
`;

const ExamplesHeading = tw.h5`
  mb-2 text-xs text-gray-800 font-semibold
`;

const FormContainer = tw.form`
  mb-4
`;

const JoinServerLabel = tw.label`
  mb-4 text-xs text-gray-800 font-semibold
`;

const Required = tw.span`
  pl-1 text-red-500
`;

const JoinServerInput = tw.input`
  w-full h-10 p-2.5 bg-gray-200 text-gray-800 font-medium border rounded-middle
  placeholder:text-gray-500
`;

const ExamplesContainer = tw.div`
  mb-4
`;

const Example = tw.p`
  text-sm text-gray-500
`;

const FooterContainer = tw.div`
  flex justify-between items-center p-4 bg-gray-50
`;

const BackButton = tw.button`
  px-1 py-0.5 text-sm font-medium
`;

const JoinButton = tw.button`
  w-24 h-9.5 bg-blue-500 text-white rounded-middle
`;
