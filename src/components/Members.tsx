import { useEffect, useRef, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import tw from "tailwind-styled-components/dist/tailwind";
import {
  useServersState,
  setMembers,
  setMemberProfileCardOpen,
  setMemberProfileCardPosition,
  setMemberRoles,
  MemberRole,
  MemberInfo,
  RoleData,
  MemberData,
  setMemberPreview,
} from "../features/servers";
import { useAppDispatch } from "../redux/hooks";
import Image from "next/image";

export default function Members() {
  const { server, members, memberRoles, memberProfileCardOpen } =
    useServersState();
  const memberRef = useRef<HTMLLIElement[]>([]);
  const [assignedRoles, setAssignedRoles] = useState<RoleData[][]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!server.serverID) return;

    const q = query(collection(db, "servers", server.serverID, "members"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memberRolesList: MemberRole[] = [];

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        const memberRoles: MemberRole = {
          userID: doc.id,

          serverOwner: docData.serverOwner,

          roles: docData.roles,

          // permissions: docData.permissions,
        };

        memberRolesList.push(memberRoles);
      });

      dispatch(setMemberRoles(memberRolesList));
    });
    return () => {
      unsubscribe();
    };
  }, [server]);

  useEffect(() => {
    const q = query(collection(db, "users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memberList: MemberInfo[] = [];
      const memberIDs: string[] = [];

      const members = getRoles(server.roles, memberRoles);

      members.map((member) => memberIDs.push(member.userID));

      querySnapshot.forEach((doc) => {
        if (!memberIDs.includes(doc.id)) return;

        const docData = doc.data();

        const member: MemberInfo = {
          username: docData.username,

          avatar: docData.avatar,

          userID: doc.id,
        };

        memberList.push(member);
      });

      const newMembers = [];

      for (let i = 0; i < memberList.length; i++) {
        newMembers.push({
          ...memberList[i],
          ...members.find((member) => member.userID === memberList[i].userID),
        });
      }

      dispatch(setMembers(newMembers));
    });

    return () => {
      unsubscribe();
    };
  }, [memberRoles]);

  useEffect(() => {
    const membersWithRoles: MemberData[] = members.filter(
      (member) => member.roles
    );

    const rolesList: RoleData[] = [];

    for (let i = 0; i < membersWithRoles.length; i++) {
      const roleLength = membersWithRoles[i].roles.length;

      for (let j = 0; j < roleLength; j++) {
        rolesList.push(membersWithRoles[i].roles[j]);
      }
    }

    const organizedRoles = organizeRoles(rolesList);

    setAssignedRoles(organizedRoles);
  }, [members]);

  function getRoles(serverRoles: RoleData[], memberRoles: MemberRole[]) {
    const newMembers: MemberRole[] = JSON.parse(JSON.stringify(memberRoles));

    const members = newMembers.map((member) => {
      if (!member.roles) return member;

      if (member.roles.length <= 0) return member;
      for (let i = 0; i < member.roles.length; i++) {
        if (serverRoles.length <= 0) return member;
        for (let j = 0; j < serverRoles.length; j++) {
          if (member.roles[i] !== serverRoles[j].roleID) return member;
          member.roles[i] = serverRoles[j];

          return member;
        }
        return member;
      }
      return member;
    });

    return members;
  }

  function organizeRoles(rolesList: RoleData[]) {
    const results = [];

    for (let i = 0; i < rolesList.length; i++) {
      if (!results.length) results.push([rolesList[i]]);

      for (let j = 0; j < results.length; j++) {
        if (rolesList[i].roleID === results[j][0].roleID) {
          results[j].push(rolesList[i]);
        } else {
          results.push([rolesList[i]]);
        }
      }
    }

    return results;
  }

  function viewProfile(member: MemberData, index: number) {
    dispatch(setMemberProfileCardOpen(!memberProfileCardOpen));

    if (!memberRef.current) return;

    const memberProfileCardY =
      memberRef.current[index].getBoundingClientRect().top;

    dispatch(setMemberPreview(member));

    dispatch(
      setMemberProfileCardPosition({ top: memberProfileCardY, right: 248 })
    );
  }

  return (
    <Container>
      <Sidebar>
        <MemberList>
          <Heading>MEMBERS - {members.length}</Heading>
          {members.map((member, index) => {
            return (
              <MemberContainer
                onClick={() => viewProfile(member, index)}
                ref={(el: HTMLLIElement) => (memberRef.current[index] = el)}
                key={index}
              >
                <Member>
                  <StyledImage
                    loader={() => member.avatar}
                    src={member.avatar}
                    width={32}
                    height={32}
                    alt={`${member.username}'s profile picture`}
                  />
                  <UsernameContainer>
                    <Username>{member.username}</Username>

                    {member.serverOwner && (
                      <ServerOwnerIcon>&#128081;</ServerOwnerIcon>
                    )}
                  </UsernameContainer>
                </Member>
              </MemberContainer>
            );
          })}
        </MemberList>
      </Sidebar>
    </Container>
  );
}

const Container = tw.div`
  relative flex-none w-60 h-full bg-gray-100
`;

const Sidebar = tw.aside`
  absolute flex flex-none w-full h-full
`;

const MemberList = tw.ol`
  pb-5 overflow-hidden
  hover:overflow-y-auto
`;

const Heading = tw.h2`
  pt-6 pr-2 pl-4
`;

const MemberContainer = tw.li`
  w-56 h-11 ml-2 py-px
`;

const Member = tw.div`
  flex items-center h-full px-2 rounded cursor-pointer
  hover:bg-gray-200
`;

const StyledImage = tw(Image)`
  object-cover rounded-full
`;

const UsernameContainer = tw.div`
  flex w-[164px]
`;

const Username = tw.span`
  ml-3 overflow-hidden truncate
`;

const ServerOwnerIcon = tw.span`
  ml-1
`;
