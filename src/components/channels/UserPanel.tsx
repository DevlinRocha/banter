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
import { useRef } from "react";

export default function UserPanel() {
  const { user } = useUserState();
  const { userSettingsOpen } = useUserSettingsState();
  const usernameRef = useRef<HTMLSpanElement>(null);
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setUserSettingsOpen(!userSettingsOpen));
  }

  function copyUsername() {
    if (!usernameRef.current || !usernameRef.current.textContent) return;

    navigator.clipboard.writeText(usernameRef.current.textContent);
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
            unoptimized
            alt="Profile picture"
          />
        </ProfilePicture>

        <Username onClick={copyUsername} ref={usernameRef}>
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
  flex justify-between items-center w-60 h-[52px] px-2 mb-px bg-gray-200/50
  dark:bg-dark-300
`;

const UserInfo = tw.div`
  flex items-center h-min pl-0.5 ml-[-2px] mr-2 rounded
  hover:bg-gray-500/25
  dark:hover:bg-dark-25
`;

const ProfilePicture = tw.div`
  flex mr-2 h-8
`;

const StyledImage = tw(Image)`
  object-cover rounded-full cursor-pointer
`;

const Username = tw.span`
  flex flex-col w-21 py-1 mr-1 overflow-hidden select-text cursor-pointer
`;

const DisplayName = tw.span`
  text-sm font-semibold truncate leading-[1.125rem]
  dark:text-white
`;

const Tag = tw.span`
  text-[#4F5660] text-xs leading-[0.8125rem]
  dark:text-text-primary
`;

const IconsPanel = tw.div`
  flex justify-around align-center w-24
`;

const Icon = tw(Image)`
  cursor-pointer object-contain
`;
