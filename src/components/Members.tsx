import { useEffect, useRef } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import tw from "tailwind-styled-components/dist/tailwind";
import {
  useServersState,
  setMemberIDs,
  setMembers,
  setMemberProfileCardOpen,
  setMember,
  setMemberProfileCardHeight,
} from "../features/servers";
import { UserData } from "../features/user";
import { useAppDispatch } from "../redux/hooks";
import Image from "next/image";

export default function Members() {
  const { server, members, memberIDs, memberProfileCardOpen } =
    useServersState();
  const memberRef = useRef<HTMLLIElement[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!server.serverID) return;

    const q = query(collection(db, "servers", server.serverID, "members"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memberIDs: string[] = [];

      querySnapshot.forEach((doc) => {
        memberIDs.push(doc.id);
      });

      dispatch(setMemberIDs(memberIDs));
    });
    return () => {
      unsubscribe();
    };
  }, [server]);

  useEffect(() => {
    const q = query(collection(db, "users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memberList: UserData[] = [];

      querySnapshot.forEach((doc) => {
        if (!memberIDs.includes(doc.id)) return;

        const member: UserData = {
          username: doc.data().username,

          tag: doc.data().tag,

          avatar: doc.data().avatar,

          about: doc.data().about,

          banner: doc.data().banner,

          userID: doc.id,

          email: doc.data().email,
        };

        memberList.push(member);
      });

      dispatch(setMembers(memberList));
    });

    return () => {
      unsubscribe();
    };
  }, [memberIDs]);

  function viewProfile(member: UserData, index: number) {
    dispatch(setMemberProfileCardOpen(!memberProfileCardOpen));

    if (!memberRef.current) return;

    const memberProfileCardHeight =
      memberRef.current[index].getBoundingClientRect().top;

    dispatch(setMember(member));

    dispatch(setMemberProfileCardHeight(memberProfileCardHeight));
  }

  return (
    <Container>
      <Sidebar>
        <Heading>MEMBERS - {members.length}</Heading>
        {members.map((member, index) => {
          return (
            <MemberContainer
              onClick={(e) => viewProfile(member, index)}
              ref={(el) => (memberRef.current[index] = el)}
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
                <Username>{member.username}</Username>
              </Member>
            </MemberContainer>
          );
        })}
      </Sidebar>
    </Container>
  );
}

const Container = tw.aside`
  flex flex-none w-60 h-full bg-gray-50
`;

const Sidebar = tw.ol`
  w-60 pb-5 overflow-hidden
  hover:overflow-y-auto
`;

const Heading = tw.h2`
  pt-6 pr-2 pl-4
`;

const MemberContainer = tw.li`
  max-w-56 h-11 ml-2 py-px
`;

const Member = tw.div`
  flex items-center h-full px-2 rounded cursor-pointer
  hover:bg-gray-100
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const Username = tw.span`
  ml-3 flex-1 overflow-hidden
`;
