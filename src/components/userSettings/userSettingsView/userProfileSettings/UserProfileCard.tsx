import { useUserState } from "../../../../features/user";
import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";
import { useAppDispatch } from "../../../../redux/hooks";
import { setChangeAvatarOpen } from "../../../../features/userSettings";
import { parseURLs } from "../../../../utilities/functions";

export default function UserProfileCard() {
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  const bannerStyle = {
    backgroundColor: user.banner,
  };

  return (
    <Container>
      <Banner style={bannerStyle} />

      <ProfilePicture>
        <HoverTextBackdrop>
          <HoverText>CHANGE AVATAR</HoverText>
        </HoverTextBackdrop>

        <StyledImage
          onClick={() => dispatch(setChangeAvatarOpen(true))}
          loader={() => user.avatar}
          src={user.avatar}
          width={80}
          height={80}
          unoptimized
          alt="Profile picture"
        />
      </ProfilePicture>

      <SettingContainer>
        <UsernameContainer>
          <Username>{user.username}</Username>

          <Tag>#{user.tag}</Tag>
        </UsernameContainer>

        <Divider />

        <ProfileContainer>
          <ProfileHeading>ABOUT ME</ProfileHeading>

          <AboutMeContainer>{parseURLs(user.about)}</AboutMeContainer>
        </ProfileContainer>
      </SettingContainer>
    </Container>
  );
}

const Container = tw.section`
  relative flex flex-col w-[18.75rem] bg-white rounded drop-shadow-xl
  dark:bg-dark-300
`;

const ProfileContainer = tw.section`
  flex flex-col pt-4 pb-3
`;

const SettingContainer = tw.section`
  flex flex-col m-4 mt-16 px-3 bg-gray-100 rounded
  dark:bg-dark-600 dark:text-text-tertiary
`;

const HoverTextBackdrop = tw.div`
  absolute hidden w-full h-full bg-black/50 rounded-full z-10 group pointer-events-none
  group-hover:block
`;

const HoverText = tw.span`
  absolute flex w-full h-full text-center justify-center items-center text-[10px] text-white font-bold
`;

const Banner = tw.span`
  h-15 rounded-t-lg
`;

const ProfilePicture = tw.div`
  absolute top-4 left-4 flex border-[7px] border-white rounded-full group
  dark:border-dark-300
`;

const StyledImage = tw(Image)`
  object-cover rounded-full cursor-pointer
`;

const UsernameContainer = tw.div`
  pt-3 text-xl font-medium select-text
`;

const Username = tw.span`
  break-all
  dark:text-white
`;

const Tag = tw.span`
  text-gray-600
  dark:text-text-primary
`;

const Divider = tw.div`
  w-full h-px mt-3 bg-gray-200
  dark:bg-dark-75
`;

const ProfileHeading = tw.h3`
  mb-2 text-xs font-bold
  dark:text-white
`;

const AboutMeContainer = tw.div`
  text-sm select-text break-words whitespace-pre-wrap
`;

const LinkText = tw.a`
  text-blue-600
  hover:underline
`;
