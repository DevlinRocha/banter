import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";
import {
  MemberData,
  setMember,
  setMemberProfileCardOpen,
  setMemberProfileCardPosition,
  useServersState,
} from "../features/servers";
import { useAppDispatch } from "../redux/hooks";
import { useEffect, useLayoutEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useUserState } from "../features/user";
import { db, setServerRole } from "../../firebase";
import addRoleIcon from "../../assets/addRoleIcon.svg";
import {
  setAssignRoleOpen,
  setAssignRolePosition,
  useServerSettingsState,
} from "../features/serverSettings";
import AssignRole from "./AssignRole";
import { parseURLs } from "../utilities/functions";

export default function MemberProfileCard() {
  const { user } = useUserState();
  const { server, member, memberPreview, memberProfileCardPosition } =
    useServersState();
  const { assignRoleOpen, assignRoleHeight } = useServerSettingsState();
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
    if (!memberPreview.userID) return;
    const unsubscribe = onSnapshot(
      doc(db, "users", memberPreview.userID),
      (doc) => {
        if (!doc.exists()) return;

        const docData = doc.data();

        const member: MemberData = {
          username: docData.username,

          tag: docData.tag,

          avatar: docData.avatar,

          about: docData.about,

          banner: docData.banner,

          // permissions: memberPreview.permissions,

          roles: memberPreview.roles || [],

          serverOwner: memberPreview.serverOwner
            ? memberPreview.serverOwner
            : false,

          userID: doc.id,
        };

        dispatch(setMember(member));
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!addRoleIconRef.current) return;

    const assignRolePositionX =
      addRoleIconRef.current.getBoundingClientRect().left - 113;

    const assignRolePositionY =
      addRoleIconRef.current.getBoundingClientRect().top + 32;

    dispatch(
      setAssignRolePosition({
        top:
          assignRolePositionY + assignRoleHeight > window.innerHeight
            ? addRoleIconRef.current.getBoundingClientRect().top -
              (assignRoleHeight + 8)
            : assignRolePositionY,
        left: assignRolePositionX,
      })
    );
  }, [assignRoleHeight]);

  function closeWindow() {
    dispatch(setMemberProfileCardOpen(false));
    dispatch(setAssignRoleOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function handleClick() {
    dispatch(setAssignRoleOpen(!assignRoleOpen));
  }

  function removeRole(member: MemberData, roleID: string) {
    if (!user.roles.serverOwner) return;

    const newMember = { ...member };

    const roleIDList = newMember.roles.map((role) => role.roleID);

    const newRoles = roleIDList.filter((role) => role !== roleID);

    setServerRole(server.serverID, member.userID, newRoles);
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
              unoptimized
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

                <AboutMeContainer>{parseURLs(member.about)}</AboutMeContainer>
              </HeadingContainer>
            )}

            <Roles>
              <ProfileHeading>
                {member.roles.length > 0
                  ? member.roles.length > 1
                    ? "ROLES"
                    : "ROLE"
                  : "NO ROLES"}
              </ProfileHeading>

              <RolesList>
                {member.roles.map((role, index) => {
                  const RoleColorStyle = {
                    backgroundColor: role.color,
                  };

                  return (
                    <RoleContainer
                      onClick={() => removeRole(member, role.roleID)}
                      key={index}
                    >
                      <RoleColor style={RoleColorStyle} />
                      <RoleName>{role.name}</RoleName>
                    </RoleContainer>
                  );
                })}
                <AddRoleIconContainer ref={addRoleIconRef}>
                  {user.roles.serverOwner ? (
                    <AddRoleIcon
                      onClick={handleClick}
                      src={addRoleIcon}
                      width={24}
                      height={22}
                    />
                  ) : (
                    ""
                  )}
                </AddRoleIconContainer>
              </RolesList>
            </Roles>
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

const Roles = tw.div`
  flex flex-col
`;

const RolesList = tw.div`
  flex
`;

const RoleContainer = tw.div`
  flex h-6 items-center p-1 mr-1 mb-1 rounded bg-gray-100 cursor-pointer
  hover:bg-gray-100
`;

const RoleColor = tw.div`
  w-3 h-3 mr-2.5 rounded-full
`;

const RoleName = tw.span`
  text-xs font-medium
`;

const ProfileHeading = tw.h3`
  mb-2 text-gray-600 text-xs font-bold
`;

const AboutMeContainer = tw.div`
  text-sm select-text
`;

const AddRoleIconContainer = tw.div`
  flex-none mr-1 mb-1
`;

const AddRoleIcon = tw(Image)`
  rounded select-text whitespace-pre-wrap
  hover:cursor-pointer
`;

const LinkText = tw.a`
  text-blue-600
  hover:underline
`;
