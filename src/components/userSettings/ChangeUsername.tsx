import { useRef } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { changeUsername } from "../../../firebase";
import { setChangeUsernameOpen } from "../../features/settings";
import { useUserState } from "../../features/user";
import { useAppDispatch } from "../../redux/hooks";

export default function ChangeUsername() {
  const { user } = useUserState();
  const usernameRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setChangeUsernameOpen(false));
  }

  function handleChangeUsername() {
    if (usernameRef.current) {
      const newUsername = usernameRef.current.value;
      changeUsername(newUsername);
    }
    dispatch(setChangeUsernameOpen(false));
  }

  return (
    <Container>
      <Heading>Change your username</Heading>

      <Body>Enter a new username and your existing password.</Body>

      <FormContainer>
        <ChangeUsernameForm>
          <FieldContainer>
            <FieldHeading>USERNAME</FieldHeading>

            <UsernameContainer>
              <UsernameInput
                ref={usernameRef}
                type="text"
                placeholder={user.username}
                maxLength={32}
              />

              <Separator />

              <TagInput type="text" value={`#${user.tag}`} disabled />
            </UsernameContainer>
          </FieldContainer>
        </ChangeUsernameForm>

        <Buttons>
          <CancelButton onClick={closeWindow}>Cancel</CancelButton>

          <DoneButton onClick={handleChangeUsername}>Done</DoneButton>
        </Buttons>
      </FormContainer>
    </Container>
  );
}

const Container = tw.div`
  fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-110 h-50 bg-white rounded-md
`;

const Heading = tw.h2`
  w-full p-4
`;

const Body = tw.p`
  w-full h-18.5 pr-2 pb-5 pl-4
`;

const FormContainer = tw.form`
`;

const ChangeUsernameForm = tw.div`
  pr-2 pb-2 pl-4
`;

const FieldContainer = tw.fieldset`
  flex flex-col
`;

const FieldHeading = tw.h5`
  mb-2
`;

const UsernameContainer = tw.div`
  flex border
`;

const UsernameInput = tw.input`
  w-full p-2.5 outline-0
`;

const Separator = tw.div`
  w-px h-7.5 mt-1.25 bg-gray-300
`;

const TagInput = tw(UsernameInput)`
  w-25 pl-5
`;

const Buttons = tw.div`
  flex justify-end w-full h-17.5 p-4 bg-gray-100
`;

const CancelButton = tw.button`
  py-0.5 px-4 h-full
`;

const DoneButton = tw(CancelButton)`
  bg-blue-500 text-white rounded-md
`;
