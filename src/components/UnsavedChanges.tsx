import tw from "tailwind-styled-components/dist/tailwind";
import { saveUserProfileChanges, uploadAvatar } from "../../firebase";
import { setUser, useUserState } from "../features/user";
import { setUserCopy, useUserSettingsState } from "../features/userSettings";
import { useAppDispatch } from "../redux/hooks";

export default function UnsavedChanges() {
  const { user, avatarPreview } = useUserState();
  const { userCopy, unsavedChangesError } = useUserSettingsState();
  const dispatch = useAppDispatch();

  function resetChanges() {
    if (!userCopy) return;
    dispatch(setUser(userCopy));
  }

  async function saveChanges() {
    dispatch(setUserCopy(user));

    if (user.avatar !== userCopy?.avatar) return await saveAvatar();
    await saveUserProfileChanges(user);
  }

  async function saveAvatar() {
    if (!avatarPreview) return;

    const avatarURL = await uploadAvatar(avatarPreview, user.userID);

    const newUser = { ...user };
    newUser.avatar = avatarURL;

    dispatch(setUser(newUser));
    dispatch(setUserCopy(newUser));
    await saveUserProfileChanges(newUser);
  }

  return (
    <Container>
      <ContentContainer unsavedChangesError={unsavedChangesError}>
        <Text unsavedChangesError={unsavedChangesError}>
          Careful - you have unsaved changes!
        </Text>

        <ButtonsContainer>
          <ResetChangesButton
            unsavedChangesError={unsavedChangesError}
            onClick={resetChanges}
          >
            Reset
          </ResetChangesButton>
          <SaveChangesButton onClick={saveChanges}>
            Save Changes
          </SaveChangesButton>
        </ButtonsContainer>
      </ContentContainer>
    </Container>
  );
}

type UnsavedChangesError = {
  unsavedChangesError: boolean;
};

const Container = tw.div`
  absolute bottom-0 left-0 w-[740px] h-18 p-5 pt-0
`;

const ContentContainer = tw.div<UnsavedChangesError>`
  flex justify-between items-center p-2.5 pl-4 rounded-[5px] drop-shadow-xl
  ${(props) => (props.unsavedChangesError ? "bg-red-500" : "bg-gray-50")}

`;

const Text = tw.span<UnsavedChangesError>`
  mr-2.5 font-medium
  ${(props) => (props.unsavedChangesError ? "text-white" : "text-gray-600")}

`;

const ButtonsContainer = tw.div`
  ml-2.5
`;

const SaveChangesButton = tw.button`
  h-8 ml-2.5 px-4 py-0.5 bg-active text-sm text-white font-medium rounded-middle
`;

const ResetChangesButton = tw.button<UnsavedChangesError>`
  w-15 h-8 ml-2.5 py-0.5 text-sm font-medium
  ${(props) => (props.unsavedChangesError ? "text-white" : "text-gray-600")}

`;
