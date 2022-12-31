import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../../redux/hooks";
import closeIcon from "../../../assets/closeIcon.svg";
import { useRef, useState } from "react";
import { createChannel } from "../../../firebase";
import { setCreateChannelOpen } from "../../features/serverSettings";
import { useServersState } from "../../features/servers";

export default function CreateChannel() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const { server } = useServersState();
  const [channelType, setChannelType] = useState("text");
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setCreateChannelOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current || isInputEmpty) return;

    let channelName = inputRef.current.value;

    if (channelName[channelName.length - 1] === "-")
      channelName = channelName.slice(0, -1);

    createChannel(server.serverID, channelName, channelType);

    closeWindow();
  }

  function handleChange() {
    if (!inputRef.current) return;

    switch (inputRef.current.value) {
      case " ":
      case "-":
        return (inputRef.current.value = "");
    }

    if (!inputRef.current.value) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
      const newValue = correctInput(inputRef.current.value);
      inputRef.current.value = newValue;
    }
  }

  function correctInput(input: string) {
    switch (input.slice(-2)) {
      case "--":
      case "- ":
      case " ":
      case "-":
        return input.slice(0, -1);
    }

    return input.replace(/\s+/g, "-").toLowerCase();
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>Create Channel</Heading>

          <Body>Send messages, images, GIFs, opinions, and puns</Body>

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
            <ContentLabel htmlFor="createChannelInput">
              CHANNEL NAME
            </ContentLabel>

            <ContentInput
              type="text"
              placeholder="new-channel"
              ref={inputRef}
              onChange={handleChange}
              minLength={2}
              maxLength={100}
              required
              id="createChannelInput"
            />
          </FormContainer>
        </ContentContainer>

        <FooterContainer>
          <CancelButton onClick={closeWindow}>Cancel</CancelButton>

          <CreateButton
            isInputEmpty={isInputEmpty}
            onClick={handleSubmit}
            type="submit"
          >
            Create Channel
          </CreateButton>
        </FooterContainer>
      </Container>
    </Backdrop>
  );
}

interface CreateButtonProps {
  isInputEmpty: boolean;
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black/[0.85] z-20
`;

const Container = tw.div`
  fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-115 bg-white rounded-xl
  dark:bg-dark-100
`;

const HeadingContainer = tw.div`
  p-4
`;

const Heading = tw.h2`
  w-full my-1 text-xl font-medium leading-6
  dark:text-white
`;

const Body = tw.p`
  w-full text-gray-500
  dark:text-text-primary
`;

const CloseIcon = tw.button`
  absolute top-4 right-4 p-1
`;

const StyledImage = tw(Image)`
`;

const ContentContainer = tw.div`
  mb-4 px-4
`;

const FormContainer = tw.form`
`;

const ContentLabel = tw.label`
  text-xs text-gray-800 font-semibold
  dark:text-text-tertiary
`;

const ContentInput = tw.input`
  w-full h-10 p-2.5 mt-1 rounded-middle text-gray-800 font-medium outline-none
  dark:bg-dark-400 dark:text-white
  dark:placeholder:text-text-secondary
`;

const FooterContainer = tw.div`
  flex justify-end items-center p-4 bg-gray-50 text-sm font-medium rounded-b-xl
  dark:bg-dark-200
`;

const CancelButton = tw.button`
  w-24 h-9.5 px-1 py-0.5 text-sm font-medium text-gray-500
  hover:underline
  dark:text-white
`;

const CreateButton = tw.button`
  w-fit h-9.5 px-4 py-0.5 bg-indigo-500 text-white rounded-middle
  ${(props: CreateButtonProps) =>
    props.isInputEmpty && "opacity-50 cursor-not-allowed"}
`;
