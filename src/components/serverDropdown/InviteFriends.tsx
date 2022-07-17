import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../../redux/hooks";
import closeIcon from "../../../assets/closeIcon.svg";
import { useServersState } from "../../features/servers";
import { setInviteFriendsOpen } from "../../features/serverSettings";
import { useRef, useState } from "react";

export default function InviteFriends() {
  const { server } = useServersState();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [copySuccess, setCopySuccess] = useState(false);

  function closeWindow() {
    dispatch(setInviteFriendsOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function copyInput() {
    if (!inputRef.current) return;

    navigator.clipboard.writeText(inputRef.current.value);

    setCopySuccess(true);

    setTimeout(() => {
      setCopySuccess(false);
    }, 1500);
  }

  function highlightInput() {
    if (!inputRef.current) return;

    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 100); // For mobile devices
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>INVITE FRIENDS TO {server.name.toUpperCase()}</Heading>

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
          <InviteCodeLabel>
            Share this link with others to grant access to your server!
          </InviteCodeLabel>

          <InviteCodeContainer copySuccess={copySuccess}>
            <InviteCodeInput
              type="text"
              value={server.serverID}
              maxLength={999}
              ref={inputRef}
              onClick={highlightInput}
              id="inviteCode"
            />

            <CopyButton onClick={copyInput} copySuccess={copySuccess}>
              {copySuccess ? "Copied" : "Copy"}
            </CopyButton>
          </InviteCodeContainer>

          <SubText>Your invite link will never expire.</SubText>
        </ContentContainer>

        <FooterContainer>
          <LinkExpiryInput
            type="checkbox"
            defaultChecked
            disabled
            id="linkExpiry"
          />

          <LinkExpiryLabel htmlFor="linkExpiry">
            Set this link to never expire
          </LinkExpiryLabel>
        </FooterContainer>
      </Container>
    </Backdrop>
  );
}

interface CopySuccess {
  copySuccess: boolean;
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black/[0.85] z-20
`;

const Container = tw.div`
  fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-110 bg-white rounded-md select-none
`;

const HeadingContainer = tw.div`
  p-4
`;

const Heading = tw.h2`
  w-full font-semibold
`;

const CloseIcon = tw.button`
  absolute top-4 right-4 p-1
`;

const StyledImage = tw(Image)`
`;

const ContentContainer = tw.div`
  flex flex-col mb-5 pr-2 pl-4
`;

const InviteCodeContainer = tw.div`
  flex justify-between items-center bg-gray-100 border rounded-middle
  ${(props: CopySuccess) =>
    props.copySuccess ? "border-green-600" : "border-gray-400"}
`;

const InviteCodeInput = tw.input`
  w-full p-2.5 bg-gray-100 font-medium outline-none leading-[.5rem]
`;

const InviteCodeLabel = tw.h5`
  mb-4 text-sm text-gray-600 font-semibold
`;

const CopyButton = tw.button`
  flex-none w-[75px] h-8 mr-1 px-4 py-0.5  text-white font-medium rounded-middle
  ${(props: CopySuccess) =>
    props.copySuccess
      ? "bg-green-600 hover:bg-green-700"
      : "bg-indigo-500 hover:bg-indigo-600"}
`;

const LinkExpiryInput = tw.input`
  cursor-not-allowed
`;

const LinkExpiryLabel = tw.label`
  ml-2 cursor-not-allowed text-gray-600 text-sm
`;

const SubText = tw.span`
  mt-2 text-xs text-gray-800
`;

const FooterContainer = tw.div`
  items-center p-4 bg-gray-50
`;
