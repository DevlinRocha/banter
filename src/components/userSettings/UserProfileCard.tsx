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
          <Username>{user.username}</Username>

          <Tag>#{user.tag}</Tag>
        </DisplayName>

        <UserProfileButton
          onClick={() => dispatch(setSettings("User Profile"))}
        >
          Edit User Profile
        </UserProfileButton>
      </ProfileContainer>

      <SettingsContainer>
        <UsernameEdit>
          <UsernameDisplay>
            <UsernameLabel>USERNAME</UsernameLabel>

            <DisplayName>
              <Username>{user.username}</Username>

              <Tag>#{user.tag}</Tag>
            </DisplayName>
          </UsernameDisplay>

          <EditButton>Edit</EditButton>
        </UsernameEdit>

        <EmailEdit>
          <EmailDisplay>
            <EmailLabel>EMAIL</EmailLabel>

            <Email>{user.email}</Email>
          </EmailDisplay>

          <EditButton>Edit</EditButton>
        </EmailEdit>
      </SettingsContainer>
    </Container>
  );
}

const Container = tw.section`
  flex flex-col
`;

const ProfileContainer = tw.section`
  flex items-center rounded-md
`;

const SettingsContainer = tw.section`
  flex flex-col
`;

const Banner = tw.span`
  w-165 h-25 rounded-t-md
`;

const ProfilePicture = tw.div`
  flex t-19 l-4 border-[7px] rounded-full
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const DisplayName = tw.span`
`;

const UserProfileButton = tw.button`
  h-8 ml-auto px-4 py-0.5 bg-blue-500 rounded text-white
`;

const Username = tw(DisplayName)`
`;

const Tag = tw(Username)`
`;

const UsernameEdit = tw.div`
  flex justify-between
`;

const EmailEdit = tw(UsernameEdit)`
`;

const UsernameDisplay = tw.div`
`;

const EmailDisplay = tw(UsernameDisplay)`
`;

const UsernameLabel = tw.div`
`;

const EmailLabel = tw(UsernameLabel)`
`;

const EditButton = tw.button`
  my-0.5 py-0.5 px-4 bg-gray-500 rounded text-white
`;

const Email = tw.span`
`;
