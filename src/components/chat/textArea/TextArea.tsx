import { useRef, useState } from "react";
import { createMessage, uploadMessageImagePreview } from "../../../../firebase";
import tw from "tailwind-styled-components";
import { useServersState } from "../../../features/servers";
import { useUserState } from "../../../features/user";
import uploadImageIcon from "../../../../assets/uploadImageIcon.svg";
import Image from "next/image";
import gifButton from "../../../../assets/gifButton.svg";
import { useAppDispatch } from "../../../redux/hooks";
import { setSendGifOpen, useSendGifState } from "../../../features/sendGif";

export default function TextArea() {
  const inputRef = useRef<HTMLDivElement>(null);
  const { server, channel } = useServersState();
  const { user } = useUserState();
  const { sendGifOpen } = useSendGifState();
  const [messageImageURL, setMessageImageURL] = useState<string>("");
  const [messageImage, setMessageImage] = useState<File>();
  const dispatch = useAppDispatch();

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
      return;
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    if (!e.clipboardData) return;

    const target = e.target as HTMLElement;
    target.textContent = e.clipboardData.getData("text/plain");
  }

  function getText() {
    if (
      !inputRef.current?.textContent ||
      inputRef.current.textContent.trim() === ""
    )
      return "";

    const messageContent = inputRef.current.textContent.trim();

    inputRef.current.textContent = "";

    return messageContent;
  }

  async function sendMessage() {
    const content = getText();

    if (!content && !messageImageURL) return;

    createMessage(
      server.serverID,
      channel.channelID,
      user.userID,
      content,
      messageImage
    );

    setMessageImageURL("");
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const messageImage = e.target.files[0];

    const messageImageURL = await uploadMessageImagePreview(
      messageImage,
      user.userID
    );

    setMessageImageURL(messageImageURL);
    setMessageImage(messageImage);
  }

  function openGif() {
    dispatch(setSendGifOpen(!sendGifOpen));
  }

  return (
    <Container>
      <MessageContainer>
        {messageImageURL && (
          <>
            <MessageImagePreviewContainer>
              <MessageImagePreviewList>
                <MessageImagePreview>
                  <UploadedImageContainer>
                    <UploadedImage
                      loader={() => messageImageURL}
                      src={messageImageURL}
                      layout="fill"
                      unoptimized
                    />
                  </UploadedImageContainer>
                </MessageImagePreview>
              </MessageImagePreviewList>
            </MessageImagePreviewContainer>
            <Divider />
          </>
        )}

        <FormContainer>
          <AttachButtonContainer>
            <AttachButton src={uploadImageIcon} width={24} height={24} />
            <FileInput type="file" onChange={uploadImage} />
          </AttachButtonContainer>

          <TextInput
            ref={inputRef}
            contentEditable
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channel.name}`}
            onPaste={handlePaste}
          />

          <GifButtonContainer onClick={openGif}>
            <GifButton src={gifButton} width={24} height={24} />
          </GifButtonContainer>
        </FormContainer>
      </MessageContainer>
    </Container>
  );
}

const Container = tw.div`
  flex-none w-full mt-2 mb-6 px-4 z-10
`;

const MessageContainer = tw.div`
  flex flex-col w-full bg-gray-200/50 rounded-lg
`;

const MessageImagePreviewContainer = tw.div`
  flex-1
`;

const MessageImagePreviewList = tw.ul`
  ml-1.5 pt-5 pr-7.5 pb-2.5 pl-2.5
`;

const MessageImagePreview = tw.li`
  w-[216px] h-[216px] p-2 bg-gray-50
`;

const UploadedImageContainer = tw.div`
 relative w-[200px] h-[200px] object-contain
`;

const UploadedImage = tw(Image)`
  mt-auto object-contain
`;

const Divider = tw.div`
  w-full h-px border-t border-gray-300
`;

const FormContainer = tw.form`
  flex items-center px-4
`;

const AttachButtonContainer = tw.div`
  relative flex items-center w-10
`;

const AttachButton = tw(Image)`
  transition-all ease-linear flex-none rounded-full fill-white cursor-pointer
  group-hover:rounded-full group-hover:fill-active
`;

const FileInput = tw.input`
  absolute top-0 left-0 w-full h-full text-[0px] invisible
  file:w-full file:h-full file:bg-transparent file:border-0
`;

const TextInput = tw.div`
  py-2.5 w-full h-full bg-transparent font-medium text-gray-800 outline-0 outline-hidden break-all whitespace-pre-wrap
  focus:outline-0 focus:outline-hidden
  empty:before:content-[attr(placeholder)] empty:before:text-[#5E6772]
`;

const GifButtonContainer = tw.div`
  flex flex-none items-center w-max h-max cursor-pointer
`;

const GifButton = tw(Image)`
  w-full h-full
`;
