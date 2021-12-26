import { useUserState } from "../../features/user";
import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";
import { useAppDispatch } from "../../redux/hooks";
import { setSettings } from "../../features/settings";

export default function UserProfileCard() {
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Banner className={`bg-[${user.banner}]`} />

      <ProfileContainer>
        <ProfilePicture>
          <StyledImage
            loader={() => user.avatar}
            src={user.avatar}
            width={80}
            height={80}
            alt="Profile picture"
          />
        </ProfilePicture>

        <DisplayName>
          <UsernameDisplay>{user.username}</UsernameDisplay>

          <Tag>#{user.tag}</Tag>
        </DisplayName>

        <UserProfileButton
          onClick={() => dispatch(setSettings("User Profile"))}
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

          <EditButton>
            <EditButtonContent>Edit</EditButtonContent>
          </EditButton>
        </UsernameSettingContainer>

        <EmailSettingContainer>
          <SettingDisplay>
            <SettingsLabel>EMAIL</SettingsLabel>

            <Email>{user.email}</Email>
          </SettingDisplay>

          <EditButton>
            <EditButtonContent>Edit</EditButtonContent>
          </EditButton>
        </EmailSettingContainer>
      </SettingContainer>
    </Container>
  );
}

const Container = tw.section`
  relative flex flex-col bg-gray-200 rounded
`;

const ProfileContainer = tw.section`
  flex h-18 pt-4 pr-4 pl-30 rounded-md
`;

const SettingContainer = tw.section`
  flex flex-col m-4 mt-2 p-4 bg-gray-100 rounded
`;

const Banner = tw.span`
  w-165 h-25 rounded-t-md
`;

const ProfilePicture = tw.div`
  absolute top-19 left-4 flex t-19 l-4 border-[7px] rounded-full
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const DisplayName = tw.div`
  text-xl font-semibold
`;

const UsernameDisplay = tw.span`
`;

const UserProfileButton = tw.button`
  h-8 ml-auto px-4 py-0.5 bg-blue-500 rounded text-white
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
