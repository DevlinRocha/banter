import { useRef } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { changeEmail } from "../../../firebase";
import { setChangeEmailOpen, setUserCopy } from "../../features/userSettings";
import { useAppDispatch } from "../../redux/hooks";
import Image from "next/image";
import closeIcon from "../../../assets/closeIcon.svg";
import { setUser, useUserState } from "../../features/user";

export default function ChangeUsername() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setChangeEmailOpen(false));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const newEmail = emailRef.current.value;
    const password = passwordRef.current.value;

    await changeEmail(newEmail, password);

    const newUser = { ...user };
    newUser.email = newEmail;

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
          <Heading>Enter an email address</Heading>

          <Body>Enter a new email address and your existing password.</Body>

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
          <ChangeEmailForm>
            <FieldContainer>
              <FieldHeading>EMAIL</FieldHeading>

              <FieldInput ref={emailRef} type="email" required />
            </FieldContainer>

            <PasswordContainer>
              <FieldHeading>CURRENT PASSWORD</FieldHeading>

              <FieldInput ref={passwordRef} type="password" required />
            </PasswordContainer>
          </ChangeEmailForm>

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

const ChangeEmailForm = tw.div`
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

const FieldInput = tw.input`
  flex w-full h-10 p-2.5 text-gray-800 font-medium border border-gray-300 outline-0 rounded-middle
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
