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
import { UserData, useUserState } from "../features/user";
import { db } from "../../firebase";
import addRoleIcon from "../../assets/addRoleIcon.svg";
import {
  setAssignRoleOpen,
  setAssignRolePosition,
  useServerSettingsState,
} from "../features/serverSettings";
import AssignRole from "./AssignRole";

export default function MemberProfileCard() {
  const { user } = useUserState();
  const { member, memberProfileCardPosition } = useServersState();
  const { assignRoleOpen } = useServerSettingsState();
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLElement | null>(null);
  const skippedRender = useRef(false);
  const addRoleIconRef = useRef<HTMLDivElement | null>(null);

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
          ...memberProfileCardPosition,
          top: window.innerHeight - containerHeight - 16,
        })
      );
    }
  }, [memberProfileCardPosition, onRef]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", member.userID), (doc) => {
      if (!doc.exists()) return;

      const docData = doc.data();

      const member: UserData = {
        username: docData.username,

        tag: docData.tag,

        avatar: docData.avatar,

        about: docData.about,

        banner: docData.banner,

        userID: doc.id,
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

  function handleClick() {
    dispatch(setAssignRoleOpen(!assignRoleOpen));

    if (!addRoleIconRef.current) return;

    const assignRolePositionX =
      addRoleIconRef.current.getBoundingClientRect().left - 125;

    const assignRolePositionY =
      addRoleIconRef.current.getBoundingClientRect().top + 32;

    dispatch(
      setAssignRolePosition({
        left: assignRolePositionX,
        top: assignRolePositionY,
      })
    );
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

            {member.about && (
              <HeadingContainer>
                <ProfileHeading>ABOUT ME</ProfileHeading>

                <AboutMeContainer>{member.about}</AboutMeContainer>
              </HeadingContainer>
            )}

            {member.roles ? (
              member.roles.map((role, index) => {
                return <div key={index}>{role.name}</div>;
              })
            ) : (
              <ProfileHeading>NO ROLES</ProfileHeading>
            )}

            <AddRoleIconContainer ref={addRoleIconRef}>
              {user.userRoles?.serverOwner && (
                <AddRoleIcon
                  onClick={handleClick}
                  src={addRoleIcon}
                  width={24}
                  height={22}
                />
              )}
            </AddRoleIconContainer>
          </ProfileContainer>
        </Container>
      )}
      {assignRoleOpen && <AssignRole />}
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
  object-cover rounded-full
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

const HeadingContainer = tw.div`
  mb-4
`;

const ProfileHeading = tw.h3`
  mb-2 text-gray-600 text-xs font-bold
`;

const AboutMeContainer = tw.div`
  text-sm select-text
`;

const AddRoleIconContainer = tw.div`
`;

const AddRoleIcon = tw(Image)`
  rounded
  hover:cursor-pointer
`;
