import { useAppDispatch } from "../../redux/hooks";
import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { useUserState } from "../../features/user";
import muteIcon from "../../../assets/muteIcon.png";
import deafenIcon from "../../../assets/deafenIcon.png";
import settingsIcon from "../../../assets/settingsIcon.svg";
import { setUserSettingsOpen, useSettingsState } from "../../features/settings";

export default function UserPanel() {
  const { user } = useUserState();
  const { userSettingsOpen } = useSettingsState();
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setUserSettingsOpen(!userSettingsOpen));
  }

  return (
    <Container>
      <UserInfo>
        <ProfilePicture>
          <StyledImage
            loader={() => user.img}
            src={user.img}
            width={32}
            height={32}
            alt="Profile picture"
          />
        </ProfilePicture>

        <Username>{user.name}</Username>
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
  flex justify-between px-2
`;

const UserInfo = tw.section`
  flex
`;

const ProfilePicture = tw.div`
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const Username = tw.span`
`;

const IconsPanel = tw.section`
  flex justify-between align-center w-24
`;

const Icon = tw(Image)`
  cursor-pointer object-contain
`;
