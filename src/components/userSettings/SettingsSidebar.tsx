import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";
import twitterIcon from "../../../assets/twitterIcon.svg";
import githubIcon from "../../../assets/githubIcon.svg";
import instagramIcon from "../../../assets/instagramIcon.svg";
import { useAppDispatch } from "../../redux/hooks";
import {
  setLogoutConfirmOpen,
  setSettings,
  useSettingsState,
} from "../../features/settings";

export default function SettingsSidebar() {
  const { logoutConfirmOpen } = useSettingsState();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <ListHeading>USER SETTINGS</ListHeading>
      <SettingsList>
        <ListItem onClick={() => dispatch(setSettings("My Account"))}>
          My Account
        </ListItem>
        <ListItem onClick={() => dispatch(setSettings("User Profile"))}>
          User Profile
        </ListItem>
      </SettingsList>

      <SettingsList>
        <ListItem
          onClick={() => dispatch(setLogoutConfirmOpen(!logoutConfirmOpen))}
        >
          Log Out
        </ListItem>
      </SettingsList>

      <SocialLinks>
        <SocialLink href="https://twitter.com/DevlinRocha" target="_blank">
          <StyledImage src={twitterIcon} width={16} height={16} />
        </SocialLink>
        <SocialLink
          href="https://github.com/DevlinRocha/banter"
          target="_blank"
        >
          <StyledImage src={githubIcon} width={16} height={16} />
        </SocialLink>
        <SocialLink
          href="https://www.instagram.com/devlinrocha/"
          target="_blank"
        >
          <StyledImage src={instagramIcon} width={16} height={16} />
        </SocialLink>
      </SocialLinks>
    </Container>
  );
}

const Container = tw.nav`
`;

const SettingsList = tw.ol`
`;

const ListHeading = tw.h3`
  px-2.5 pb-1.5
`;

const ListItem = tw.li`
  px-2.5 py-1.5 mb-0.5 cursor-pointer
`;

const SocialLinks = tw(SettingsList)`
  flex px-2.5 py-2
`;

const SocialLink = tw.a`
  px-0.5 mr-2
`;
const StyledImage = tw(Image)`
  object-contain
`;
