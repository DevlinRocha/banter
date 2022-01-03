import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { setAddServerOpen, setAddServerWindow } from "../../features/addServer";
import { useAppDispatch } from "../../redux/hooks";
import closeIcon from "../../../assets/closeIcon.svg";
import { useUserState } from "../../features/user";
import { useRef, useState } from "react";
import { createServer } from "../../../firebase";

export default function CustomizeServer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setAddServerOpen(false));
    dispatch(setAddServerWindow("Create Server"));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function goBack() {
    dispatch(setAddServerWindow("About Server"));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current || isInputEmpty) return;

    createServer(inputRef.current.value);

    closeWindow();
  }

  function handleChange(e: React.ChangeEvent) {
    if (!inputRef.current) return;

    if (!inputRef.current.value) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>Tell us more about your server</Heading>

          <Body>
            Give your new server a personality with a name and an icon. You can
            always change it later.
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

        <ContentContainer>
          <FormContainer onSubmit={handleSubmit}>
            <CreateServerLabel htmlFor="createServerInput">
              SERVER NAME
            </CreateServerLabel>

            <CreateServerInput
              type="text"
              defaultValue={`${user.username}'s server`}
              ref={inputRef}
              onChange={handleChange}
              minLength={2}
              maxLength={100}
              required
              id="createServerInput"
            />

            <SubText>
              {"By creating a server, you agree to Banter's"}{" "}
              <LinkText>Community Guidelines</LinkText>.
            </SubText>
          </FormContainer>
        </ContentContainer>

        <FooterContainer>
          <BackButton onClick={goBack}>Back</BackButton>

          <CreateButton
            isInputEmpty={isInputEmpty}
            onClick={handleSubmit}
            type="submit"
          >
            Create
          </CreateButton>
        </FooterContainer>
      </Container>
    </Backdrop>
  );
}

type CreateButtonProps = {
  isInputEmpty: boolean;
};

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

const ContentContainer = tw.div`
  my-4 pr-2 pl-4
`;

const FormContainer = tw.form`
  mt-6
`;

const CreateServerLabel = tw.label`
  mb-4 text-xs text-gray-600 font-semibold
`;

const CreateServerInput = tw.input`
  w-full h-10 p-2.5 border rounded-middle
`;

const SubText = tw.span`
  text-xs text-gray-500
`;

const LinkText = tw.span`
  text-blue-600 font-semibold cursor-pointer
  hover:underline hover:decoration-blue-600
`;

const FooterContainer = tw.div`
  flex justify-between items-center p-4 bg-gray-50
`;

const BackButton = tw.button`
  px-1 py-0.5 text-sm font-medium
`;

const CreateButton = tw.button<CreateButtonProps>`
  w-24 h-9.5 px-4 py-0.5 bg-blue-500 text-white rounded-middle
  ${(props) => (props.isInputEmpty ? "opacity-50 cursor-not-allowed" : null)}
`;
