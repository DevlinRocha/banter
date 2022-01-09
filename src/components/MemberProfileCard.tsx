import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";
import {
  setMember,
  setMemberProfileCardOpen,
  setMemberProfileCardPosition,
  useServersState,
} from "../features/servers";
import { useAppDispatch } from "../redux/hooks";
import { useEffect, useLayoutEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { UserData } from "../features/user";
import { db } from "../../firebase";

export default function MemberProfileCard() {
  const { member, memberID, memberProfileCardPosition } = useServersState();
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLElement | null>(null);
  const skippedRender = useRef(false);

  const onRef = (node: HTMLElement) => {
    if (node) containerRef.current = node;
  };

  useEffect(() => {
    if (skippedRender.current) {
      return;
    }
    skippedRender.current = true;
  }, []);

  useLayoutEffect(() => {
    if (
      !memberProfileCardPosition ||
      !memberProfileCardPosition.top ||
      !containerRef.current
    )
      return;

    const containerHeight = containerRef.current.getBoundingClientRect().height;

    if (memberProfileCardPosition.top + containerHeight > window.innerHeight) {
      dispatch(
        setMemberProfileCardPosition({
          top: window.innerHeight - containerHeight - 16,
          left: memberProfileCardPosition.left,
        })
      );
    }
  }, [memberProfileCardPosition, onRef]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", memberID), (doc) => {
      if (!doc.exists()) return;

      const member: UserData = {
        username: doc.data().username,

        tag: doc.data().tag,

        avatar: doc.data().avatar,

        about: doc.data().about,

        banner: doc.data().banner,

        userID: doc.id,

        email: doc.data().email,
      };

      dispatch(setMember(member));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function closeWindow() {
    dispatch(setMemberProfileCardOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  const bannerStyle = {
    backgroundColor: member.banner,
  };

  return (
    <Backdrop onClick={closeWindow}>
      {skippedRender.current && (
        <Container
          onClick={stopPropagation}
          ref={onRef}
          style={memberProfileCardPosition}
        >
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
      )}
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full z-20
`;

const Container = tw.section`
  absolute flex flex-col w-[18.75rem] bg-white rounded drop-shadow-xl
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
