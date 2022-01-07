import tw from "tailwind-styled-components/dist/tailwind";
import {
  setUserAbout,
  setUserBanner,
  useUserState,
} from "../../../../features/user";
import { useAppDispatch } from "../../../../redux/hooks";
import UserProfileCard from "./UserProfileCard";

export default function UserProfileSettings() {
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setUserBanner("#7CC6FE"));
  }

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setUserBanner(e.target.value));
  }

  function handleAboutChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch(setUserAbout(e.target.value));
  }

  return (
    <Container>
      <Heading>User Profile</Heading>

      <Separator />

      <ContentContainer>
        <CustomizationContainer>
          <SettingsContainer>
            <SettingsHeading>AVATAR</SettingsHeading>

            <AvatarButtonsContainer>
              <ChangeAvatarButton>Change Avatar</ChangeAvatarButton>

              <RemoveAvatarButton>Remove Avatar</RemoveAvatarButton>
            </AvatarButtonsContainer>
          </SettingsContainer>

          <SettingsContainer>
            <SettingsHeading>PROFILE COLOR</SettingsHeading>

            <ColorInputsContainer>
              <ColorInputContainer>
                <ColorButton onClick={handleClick} type="button" />

                <ColorInputLabel>Default</ColorInputLabel>
              </ColorInputContainer>

              <ColorInputContainer>
                <ColorInput
                  onChange={handleColorChange}
                  type="color"
                  defaultValue={user.banner}
                />

                <ColorInputLabel>Custom</ColorInputLabel>
              </ColorInputContainer>
            </ColorInputsContainer>
          </SettingsContainer>

          <AboutContainer>
            <SettingsHeading>ABOUT ME</SettingsHeading>

            <AboutMe
              onChange={handleAboutChange}
              defaultValue={user.about}
              placeholder="Tell this server a bit about yourself"
              maxLength={190}
              rows={6}
            />
          </AboutContainer>
        </CustomizationContainer>

        <UserProfileCardContainer>
          <SettingsHeading>PREVIEW</SettingsHeading>

          <UserProfileCard />
        </UserProfileCardContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = tw.main`
  pt-15 px-10 pb-20
`;

const Heading = tw.h1`
  mb-5 text-xl font-semibold w-165
`;

const Separator = tw.div`
  w-full mb-6 pb-1 border-b border-gray-200
`;

const ContentContainer = tw.div`
  flex
`;

const CustomizationContainer = tw.div`
  flex-1 min-w-[270px] max-w-[340px]
`;

const SettingsContainer = tw.div`
  mb-6 pb-6 border-b
`;
const SettingsHeading = tw.h5`
  mb-2 text-xs text-gray-600 font-semibold
`;

const AvatarButtonsContainer = tw.div`
`;

const ChangeAvatarButton = tw.button`
  w-fit h-8 px-4 py-0.5 bg-indigo-500 text-white text-sm font-medium rounded-middle
`;

const RemoveAvatarButton = tw(ChangeAvatarButton)`
  bg-white text-sm text-gray-500
`;

const ColorInputsContainer = tw.div`
  flex
`;

const ColorInputContainer = tw.div`
  flex flex-col mr-4 text-center
`;

const ColorInput = tw.input`
  w-[69px] h-[50px] rounded border-none
`;

const ColorButton = tw(ColorInput)`
  bg-primary
`;

const ColorInputLabel = tw.label`
  mt-1 text-xs text-gray-600
`;

const AboutContainer = tw(SettingsContainer)`
  border-none
`;

const AboutMe = tw.textarea`
  w-full p-2.5 pr-8 bg-gray-50 border border-gray-300 rounded-middle resize-none
`;

const UserProfileCardContainer = tw.div`
  mb-6 ml-5 pb-6
`;
