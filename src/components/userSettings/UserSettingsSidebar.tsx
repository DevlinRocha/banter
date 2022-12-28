import tw from "tailwind-styled-components/dist/tailwind";
import TwitterIcon from "./TwitterIcon";
import GithubIcon from "./GithubIcon";
import InstagramIcon from "./InstagramIcon";
import { useAppDispatch } from "../../redux/hooks";
import {
  setLogoutConfirmOpen,
  setUnsavedChangesError,
  setUserSettingsScreen,
  useUserSettingsState,
} from "../../features/userSettings";
import { useUserState } from "../../features/user";

export default function SettingsSidebar() {
  const { userSettingsScreen, userCopy } = useUserSettingsState();
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  function unsavedChanges() {
    if (!userCopy) return false;

    if (userCopy !== user) {
      dispatch(setUnsavedChangesError(true));

      setTimeout(() => {
        dispatch(setUnsavedChangesError(false));
      }, 1500);

      return true;
    }
  }

  function viewMyAccount() {
    if (unsavedChanges()) return;

    dispatch(setUserSettingsScreen("My Account"));
  }

  function viewUserProfile() {
    if (unsavedChanges()) return;

    dispatch(setUserSettingsScreen("User Profile"));
  }

  function viewAppAppearance() {
    if (unsavedChanges()) return;

    dispatch(setUserSettingsScreen("Appearance"));
  }

  return (
    <Container>
      <NavContainer>
        <ListHeading>USER SETTINGS</ListHeading>

        <SettingsList>
          <MyAccount
            className={`${
              userSettingsScreen === "My Account" &&
              "bg-gray-300 dark:bg-dark-50/60 dark:text-white dark:hover:text-white"
            }`}
            onClick={viewMyAccount}
          >
            My Account
          </MyAccount>

          <UserProfile
            className={`${
              userSettingsScreen === "User Profile" &&
              "bg-gray-300 dark:bg-dark-50/60 dark:text-white dark:hover:text-white"
            }`}
            onClick={viewUserProfile}
          >
            User Profile
          </UserProfile>
        </SettingsList>

        <Divider />

        <ListHeading>APP SETTINGS</ListHeading>

        <SettingsList>
          <Appearance
            className={`${
              userSettingsScreen === "Appearance" &&
              "bg-gray-300 dark:bg-dark-50/60 dark:text-white dark:hover:text-white"
            }`}
            onClick={viewAppAppearance}
          >
            Appearance
          </Appearance>
        </SettingsList>

        <Divider />

        <SettingsList>
          <ListItem onClick={() => dispatch(setLogoutConfirmOpen(true))}>
            Log Out
          </ListItem>
        </SettingsList>

        <Divider />

        <SocialLinks>
          <SocialLink href="https://twitter.com/DevlinRocha" target="_blank">
            <Twitter />
          </SocialLink>

          <SocialLink
            href="https://github.com/DevlinRocha/banter"
            target="_blank"
          >
            <Github />
          </SocialLink>

          <SocialLink
            href="https://www.instagram.com/devlinrocha/"
            target="_blank"
          >
            <Instagram />
          </SocialLink>
        </SocialLinks>
      </NavContainer>
    </Container>
  );
}

const Container = tw.div`
  flex flex-col items-end w-1/2 bg-gray-100
  dark:bg-dark-200
`;

const NavContainer = tw.nav`
  w-[218px] py-15 pr-1.5 pl-5
`;

const SettingsList = tw.ol`
`;

const ListHeading = tw.h3`
  px-2.5 pb-1.5 text-xs font-bold
  dark:text-text-secondary
`;

const ListItem = tw.li`
  px-2.5 py-1.5 mb-0.5 font-medium rounded-md cursor-pointer
  hover:bg-gray-200
  dark:text-text-primary dark:hover:bg-dark-50/40 dark:hover:text-tertiary
`;

const MyAccount = tw(ListItem)`
`;

const UserProfile = tw(ListItem)`
`;

const Appearance = tw(ListItem)`
`;

const Divider = tw.div`
  h-px mx-2.5 my-2 bg-gray-200
  dark:bg-dark-50/[.48]
`;

const SocialLinks = tw(SettingsList)`
  flex px-2.5 py-2
`;

const SocialLink = tw.a`
  px-0.5 mr-2
`;

const Twitter = tw(TwitterIcon)`
`;

const Github = tw(GithubIcon)`
`;

const Instagram = tw(InstagramIcon)`
`;
