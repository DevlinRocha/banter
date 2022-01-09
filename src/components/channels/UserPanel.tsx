import { useAppDispatch } from "../../redux/hooks";
import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { useUserState } from "../../features/user";
import muteIcon from "../../../assets/muteIcon.png";
import deafenIcon from "../../../assets/deafenIcon.png";
import settingsIcon from "../../../assets/settingsIcon.svg";
import {
  setUserSettingsOpen,
  useUserSettingsState,
} from "../../features/userSettings";

export default function UserPanel() {
  const { user } = useUserState();
  const { userSettingsOpen } = useUserSettingsState();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setUserSettingsOpen(!userSettingsOpen));
  }

  return (
    <Container>
      <UserInfo>
        <ProfilePicture>
          <StyledImage
            loader={() => user.avatar}
            src={user.avatar}
            width={32}
            height={32}
            alt="Profile picture"
          />
        </ProfilePicture>

        <Username>
          <DisplayName>{user.username}</DisplayName>

          <Tag>#{user.tag}</Tag>
        </Username>
      </UserInfo>

      <IconsPanel>
        <Icon src={muteIcon} width={20} height={20} />

        <Icon src={deafenIcon} width={20} height={20} />

        <Icon onClick={handleClick} src={settingsIcon} width={20} height={20} />
      </IconsPanel>
    </Container>
  );
}

const Container = tw.section`
  flex justify-between w-60 h-14 px-2 bg-gray-100
`;

const UserInfo = tw.div`
  flex items-center
`;

const ProfilePicture = tw.div`
  flex mr-2 h-8
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const Username = tw.span`
  flex flex-col overflow-hidden select-text
`;

const DisplayName = tw.span`
`;

const Tag = tw.span`
`;

const IconsPanel = tw.div`
  flex justify-between align-center w-24
`;

const Icon = tw(Image)`
  cursor-pointer object-contain
`;
