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
  const [isInputEmpty, setIsInputEmpty] = useState(false);
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

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>Create {capitalize(channelType)} Channel</Heading>

          <Body>Post images, GIFS, stickers, opinions, and puns</Body>

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

const ContentLabel = tw.label`
  mb-4 text-xs text-gray-800 font-semibold
`;

const ContentInput = tw.input`
  w-full h-10 p-2.5 border rounded-middle text-gray-800 font-medium
`;

const FooterContainer = tw.div`
  flex justify-end items-center p-4 bg-gray-50 text-sm font-medium
`;

const CancelButton = tw.button`
  w-24 h-9.5 px-1 py-0.5 text-sm font-medium text-gray-500
  hover:underline
`;

const CreateButton = tw.button`
  w-fit h-9.5 px-4 py-0.5 bg-indigo-500 text-white rounded-middle
  ${(props: CreateButtonProps) =>
    props.isInputEmpty ? "opacity-50 cursor-not-allowed" : null}
`;
