import { useRef } from "react";
import { createMessage } from "../../../../firebase";
import tw from "tailwind-styled-components";
import { useServersState } from "../../../features/servers";
import { useUserState } from "../../../features/user";
import uploadImageIcon from "../../../../assets/uploadImageIcon.svg";
import Image from "next/image";

export default function TextArea() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { server, channel } = useServersState();
  const { user } = useUserState();

  function getText() {
    if (!inputRef.current || inputRef.current.value.trim() === "") return;

    let messageContent;

    messageContent = inputRef.current.value;

    inputRef.current.value = "";

    return messageContent;
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    const content = getText();

    if (!content) return;

    createMessage(server.serverID, channel.channelID, user.userID, content);
  }

  function uploadImage() {}

  return (
    <Container>
      <FormContainer onSubmit={sendMessage}>
        <AttachButtonContainer>
          <StyledImage src={uploadImageIcon} width={24} height={24} />
          <FileInput type="file" onChange={uploadImage} />
        </AttachButtonContainer>
        <TextInput
          ref={inputRef}
          type="text"
          placeholder={`Message #${channel.name}`}
        />
      </FormContainer>
    </Container>
  );
}

const Container = tw.div`
  flex-none w-full h-11 mt-2 mb-6 px-4 z-10
`;

const FormContainer = tw.form`
  flex items-center pl-4 bg-gray-200/50 rounded-md
`;

const AttachButtonContainer = tw.div`
  relative flex items-center w-10
`;

const StyledImage = tw(Image)`
  transition-all ease-linear flex-none rounded-full fill-white cursor-pointer
  group-hover:rounded-full group-hover:fill-active
`;

const FileInput = tw.input`
  absolute top-0 left-0 w-full h-full text-[0px] cursor-pointer
  file:w-full file:h-full file:bg-transparent file:border-0
`;

const TextInput = tw.input`
  py-2.5 w-full h-full bg-transparent font-medium placeholder-gray-500 text-gray-800 outline-0 outline-hidden
  focus:outline-0 focus:outline-hidden
`;
