import { useUserState } from "../../features/user";
import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";

export default function UserProfileCard() {
  const { user } = useUserState();

  const bannerStyle = {
    backgroundColor: user.banner,
  };

  return (
    <Container>
      <Banner style={bannerStyle} />

      <ProfilePicture>
        <StyledImage
          loader={() => user.avatar}
          src={user.avatar}
          width={80}
          height={80}
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

        <AboutMeContainer>{user.about}</AboutMeContainer>
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

const Banner = tw.span`
  h-15 rounded-t-lg
`;

const ProfilePicture = tw.div`
  absolute top-4 left-4 flex border-[7px] border-white rounded-full
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const UsernameContainer = tw.div`
  pt-16 pb-4 pl-4 text-xl font-medium
`;

const Username = tw.span`
`;

const Tag = tw(Username)`
  text-gray-600
`;

const Divider = tw.div`
  w-full h-px mb-4 bg-gray-200
`;

const ProfileHeading = tw.h3`
  mb-2 text-xs font-bold
`;

const AboutMeContainer = tw.div`
`;
