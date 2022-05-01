import { useUserState } from "../../../../features/user";
import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setChangeEmailOpen,
  setChangeUsernameOpen,
  setUserSettingsScreen,
} from "../../../../features/userSettings";

export default function MyAccountCard() {
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  const bannerStyle = {
    backgroundColor: user.banner,
  };

  return (
    <Container>
      <Banner style={bannerStyle} />

      <ProfileContainer>
        <ProfilePicture>
          <StyledImage
            loader={() => user.avatar}
            src={user.avatar}
            width={80}
            height={80}
            unoptimized
            alt="Profile picture"
          />
        </ProfilePicture>

        <DisplayName>
          <UsernameDisplay>{user.username}</UsernameDisplay>

          <Tag>#{user.tag}</Tag>
        </DisplayName>

        <UserProfileButton
          onClick={() => dispatch(setUserSettingsScreen("User Profile"))}
        >
          Edit User Profile
        </UserProfileButton>
      </ProfileContainer>

      <SettingContainer>
        <UsernameSettingContainer>
          <SettingDisplay>
            <SettingsLabel>USERNAME</SettingsLabel>

            <UsernameContainer>
              <Username>{user.username}</Username>

              <Tag>#{user.tag}</Tag>
            </UsernameContainer>
          </SettingDisplay>

          <EditButton onClick={() => dispatch(setChangeUsernameOpen(true))}>
            <EditButtonContent>Edit</EditButtonContent>
          </EditButton>
        </UsernameSettingContainer>

        <EmailSettingContainer>
          <SettingDisplay>
            <SettingsLabel>EMAIL</SettingsLabel>

            <Email>{user.email || "This is a guest account :)"}</Email>
          </SettingDisplay>

          <EditButton onClick={() => dispatch(setChangeEmailOpen(true))}>
            <EditButtonContent>Edit</EditButtonContent>
          </EditButton>
        </EmailSettingContainer>
      </SettingContainer>
    </Container>
  );
}

const Container = tw.section`
  relative flex flex-col min-w-[655px] max-w-[660px] bg-gray-200 rounded
`;

const ProfileContainer = tw.section`
  flex h-18 pt-4 pr-4 pl-30 rounded-md overflow-clip
`;

const SettingContainer = tw.section`
  flex flex-col m-4 mt-2 p-4 bg-gray-100 rounded
`;

const Banner = tw.span`
  w-full h-25 rounded-t-md
`;

const ProfilePicture = tw.div`
  absolute top-19 left-4 flex border-[7px] rounded-full
`;

const StyledImage = tw(Image)`
  object-cover rounded-full
`;

const DisplayName = tw.div`
  text-xl font-semibold
`;

const UsernameDisplay = tw.span`
`;

const UserProfileButton = tw.button`
  min-w-[60px] h-8 ml-auto px-4 py-0.5 bg-indigo-500 rounded text-white truncate
`;

const Username = tw.span`
`;

const Tag = tw(Username)`
  text-gray-600
`;

const UsernameSettingContainer = tw.div`
  flex justify-between
`;

const EmailSettingContainer = tw(UsernameSettingContainer)`
  mt-6
`;

const SettingDisplay = tw.div`
  mr-4
`;

const SettingsLabel = tw.div`
  mb-1 text-xs
`;

const UsernameContainer = tw.div`
`;

const EditButton = tw.button`
  my-0.5 py-0.5 px-4 bg-gray-500 rounded text-sm text-white font-medium
`;

const EditButtonContent = tw.span`
`;

const Email = tw.span`
`;
