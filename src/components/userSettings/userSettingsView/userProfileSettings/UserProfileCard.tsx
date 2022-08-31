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

      <UsernameContainer>
        <Username>{user.username}</Username>

        <Tag>#{user.tag}</Tag>
      </UsernameContainer>

      <ProfileContainer>
        <Divider />

        <ProfileHeading>ABOUT ME</ProfileHeading>

        <AboutMeContainer>{parseURLs(user.about)}</AboutMeContainer>
      </ProfileContainer>
    </Container>
  );
}

const Container = tw.section`
  relative flex flex-col w-[18.75rem] bg-white rounded drop-shadow-xl
`;

const ProfileContainer = tw.section`
  flex flex-col p-4 pt-0
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
`;

const StyledImage = tw(Image)`
  object-cover rounded-full cursor-pointer
`;

const UsernameContainer = tw.div`
  pt-16 pb-4 pl-4 text-xl font-medium select-text
`;

const Username = tw.span`
  break-all
`;

const Tag = tw.span`
  text-gray-600
`;

const Divider = tw.div`
  w-full h-px mb-4 bg-gray-200
`;

const ProfileHeading = tw.h3`
  mb-2 text-xs font-bold
`;

const AboutMeContainer = tw.div`
  select-text break-words whitespace-pre-wrap
`;

const LinkText = tw.a`
  text-blue-600
  hover:underline
`;
