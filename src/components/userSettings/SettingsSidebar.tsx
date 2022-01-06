import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";
import twitterIcon from "../../../assets/twitterIcon.svg";
import githubIcon from "../../../assets/githubIcon.svg";
import instagramIcon from "../../../assets/instagramIcon.svg";
import { useAppDispatch } from "../../redux/hooks";
import {
  setLogoutConfirmOpen,
  setUserSettingsScreen,
  useUserSettingsState,
} from "../../features/userSettings";

export default function SettingsSidebar() {
  const { userSettingsScreen, logoutConfirmOpen } = useUserSettingsState();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <NavContainer>
        <ListHeading>USER SETTINGS</ListHeading>

        <SettingsList>
          <MyAccount
            className={`${
              userSettingsScreen === "My Account" && "bg-gray-300"
            }`}
            onClick={() => dispatch(setUserSettingsScreen("My Account"))}
          >
            My Account
          </MyAccount>

          <UserProfile
            className={`${
              userSettingsScreen === "User Profile" && "bg-gray-300"
            }`}
            onClick={() => dispatch(setUserSettingsScreen("User Profile"))}
          >
            User Profile
          </UserProfile>
        </SettingsList>

        <Divider />

        <SettingsList>
          <LogOut
            onClick={() => dispatch(setLogoutConfirmOpen(!logoutConfirmOpen))}
          >
            Log Out
          </LogOut>
        </SettingsList>

        <Divider />

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
      </NavContainer>
    </Container>
  );
}

const Container = tw.div`
  flex flex-col items-end w-1/2 bg-gray-100
`;

const NavContainer = tw.nav`
  w-[218px] py-15 pr-1.5 pl-5
`;

const SettingsList = tw.ol`
`;

const ListHeading = tw.h3`
  px-2.5 pb-1.5 text-xs font-bold
`;

const ListItem = tw.li`
  px-2.5 py-1.5 mb-0.5 font-medium rounded-md cursor-pointer
  hover:bg-gray-200
`;

const MyAccount = tw(ListItem)`
`;

const UserProfile = tw(ListItem)`
`;

const Divider = tw.div`
  h-px mx-2.5 my-2 bg-gray-200
`;

const LogOut = tw(ListItem)`
  text-red-500
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
