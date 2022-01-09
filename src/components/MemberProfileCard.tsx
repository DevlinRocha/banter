import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";
import { setMemberProfileCardOpen, useServersState } from "../features/servers";
import { useAppDispatch } from "../redux/hooks";
import { useLayoutEffect, useState } from "react";

export default function MemberProfileCard() {
  const { member, memberProfileCardHeight } = useServersState();
  const [containerStyle, setContainerStyle] = useState<ContainerStyle>({
    top: 0,
  });
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!memberProfileCardHeight) return;

    setContainerStyle({ top: memberProfileCardHeight });
  }, [memberProfileCardHeight]);

  function closeWindow() {
    dispatch(setMemberProfileCardOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  const bannerStyle = {
    backgroundColor: member.banner,
  };

  interface ContainerStyle {
    top: number | string;
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation} style={containerStyle}>
        <Banner style={bannerStyle} />

        <ProfilePicture>
          <StyledImage
            loader={() => member.avatar}
            src={member.avatar}
            width={80}
            height={80}
            alt="Profile picture"
          />
        </ProfilePicture>

        <UsernameContainer>
          <Username>{member.username}</Username>

          <Tag>#{member.tag}</Tag>
        </UsernameContainer>

        <ProfileContainer>
          <Divider />

          <ProfileHeading>ABOUT ME</ProfileHeading>

          <AboutMeContainer>{member.about}</AboutMeContainer>
        </ProfileContainer>
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full z-20
`;

const Container = tw.section`
  absolute right-[248px] flex flex-col w-[18.75rem] bg-white rounded drop-shadow-xl
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
  pt-16 pb-4 pl-4 text-xl font-medium select-text
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
  select-text
`;
