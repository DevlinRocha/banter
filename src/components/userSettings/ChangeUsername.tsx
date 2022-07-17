import { useRef } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { changeUsername } from "../../../firebase";
import {
  setChangeUsernameOpen,
  setUserCopy,
} from "../../features/userSettings";
import { setUser, useUserState } from "../../features/user";
import { useAppDispatch } from "../../redux/hooks";
import Image from "next/image";
import closeIcon from "../../../assets/closeIcon.svg";

export default function ChangeUsername() {
  const { user } = useUserState();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setChangeUsernameOpen(false));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!usernameRef.current || !passwordRef.current) return;

    const newUsername = usernameRef.current.value;
    const password = passwordRef.current.value;

    changeUsername(newUsername, password);

    const newUser = { ...user };
    newUser.username = newUsername;

    dispatch(setUser(newUser));
    dispatch(setUserCopy(newUser));

    closeWindow();
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <HeadingContainer>
          <Heading>Change your username</Heading>

          <Body>Enter a new username and your existing password.</Body>

          <CloseIcon onClick={closeWindow}>
            <StyledImage
              src={closeIcon}
              width={24}
              height={24}
              alt="Close button"
            />
          </CloseIcon>
        </HeadingContainer>

        <FormContainer onSubmit={handleSubmit}>
          <ChangeUsernameForm>
            <FieldContainer>
              <FieldHeading>USERNAME</FieldHeading>

              <UsernameContainer>
                <FieldInput
                  ref={usernameRef}
                  type="text"
                  defaultValue={user.username}
                  minLength={2}
                  maxLength={32}
                  required
                />

                <Separator />

                <TagInput type="text" value={`#${user.tag}`} disabled />
              </UsernameContainer>
            </FieldContainer>

            <PasswordContainer>
              <FieldHeading>CURRENT PASSWORD</FieldHeading>

              <PasswordInput ref={passwordRef} type="password" required />
            </PasswordContainer>
          </ChangeUsernameForm>

          <ButtonContainer>
            <CancelButton type="button" onClick={closeWindow}>
              Cancel
            </CancelButton>

            <DoneButton type="submit">Done</DoneButton>
          </ButtonContainer>
        </FormContainer>
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black/[0.85] z-10
`;

const Container = tw.div`
  fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-110 bg-white rounded-md
`;

const HeadingContainer = tw.div`
  px-4 py-6 text-center
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

const FormContainer = tw.form`
`;

const ChangeUsernameForm = tw.div`
  pr-2 pb-2 pl-4
`;

const FieldContainer = tw.fieldset`
  flex flex-col
`;

const PasswordContainer = tw(FieldContainer)`
  mt-4
`;

const FieldHeading = tw.h5`
  mb-2 text-xs text-gray-800 font-semibold
`;

const UsernameContainer = tw.div`
  flex border border-gray-300 rounded-middle
`;

const FieldInput = tw.input`
  w-full h-10 p-2.5 text-gray-800 font-medium outline-0
`;

const TagInput = tw(FieldInput)`
  w-25 pl-5 cursor-not-allowed
`;

const PasswordInput = tw(FieldInput)`
  border border-gray-300 rounded-middle
`;

const Separator = tw.div`
  w-px h-7.5 mt-1.25 bg-gray-300
`;

const ButtonContainer = tw.div`
  flex justify-end w-full h-17.5 p-4 bg-gray-100 rounded-b-md
`;

const CancelButton = tw.button`
  py-0.5 px-4 h-full
`;

const DoneButton = tw(CancelButton)`
  bg-blue-500 text-white rounded-md
`;
