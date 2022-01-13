import { useEffect, useRef } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import tw from "tailwind-styled-components/dist/tailwind";
import {
  useServersState,
  setMemberIDs,
  setMembers,
  setMemberProfileCardOpen,
  MemberData,
  setMemberID,
  setMemberProfileCardPosition,
} from "../features/servers";
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
      const memberList: MemberData[] = [];

      querySnapshot.forEach((doc) => {
        if (!memberIDs.includes(doc.id)) return;

        const member: MemberData = {
          username: doc.data().username,

          avatar: doc.data().avatar,

          userID: doc.id,
        };

        memberList.push(member);
      });

      dispatch(setMembers(memberList));
    });

    return () => {
      unsubscribe();
    };
  }, [memberIDs]);

  function viewProfile(userID: string, index: number) {
    dispatch(setMemberProfileCardOpen(!memberProfileCardOpen));

    if (!memberRef.current) return;

    const memberProfileCardY =
      memberRef.current[index].getBoundingClientRect().top;

    dispatch(setMemberID(userID));

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
                onClick={() => viewProfile(member.userID, index)}
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
        </MemberList>
      </Sidebar>
    </Container>
  );
}

const Container = tw.div`
  relative flex-none w-60 h-full
`;

const Sidebar = tw.aside`
  absolute flex flex-none w-full h-full bg-gray-50
`;

const MemberList = tw.ol`
  pb-5 overflow-hidden
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
