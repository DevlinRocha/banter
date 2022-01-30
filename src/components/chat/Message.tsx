import { useState, useEffect, useRef, RefObject } from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import {
  MessageData,
  setMemberID,
  setMemberProfileCardPosition,
  setMemberProfileCardOpen,
  useServersState,
  setViewMediaOpen,
  setViewMedia,
} from "../../features/servers";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAppDispatch } from "../../redux/hooks";

interface MessageProps {
  message: MessageData;
}

export default function Message(props: MessageProps) {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(
    "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/defaultProfilePicture.svg?alt=media&token=e0ee525e-6ad5-4098-9198-77608ec38f3a"
  );
  const avatarRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLHeadingElement>(null);
  const { memberProfileCardOpen } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userID = props.message.userID;

    const unsubscribe = onSnapshot(doc(db, "users", userID), (doc) => {
      if (!doc.exists()) return;

      const docData = doc.data();

      const username = docData.username;
      const avatar = docData.avatar;

      setUsername(username);
      setAvatar(avatar);
    });
    return () => {
      unsubscribe();
    };
  }, [props.message.userID]);

  function getDate() {
    const timestamp = props.message.timestamp;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthDay = date.getDate();
    const day = getDay(date, monthDay);

    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    let period = "";

    if (hours === 12) {
      period = "PM";
    } else if (hours > 12) {
      period = "PM";
      hours = hours - 12;
    } else if (hours === 0) {
      hours = 12;
      period = "AM";
    } else {
      period = "AM";
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let format = "";

    if (day === "Today" || day === "Yesterday") {
      format = `${day} at ${hours}:${minutes} ${period}`;
    } else {
      format = `${month + 1}/${monthDay}/${year}`;
    }

    return format;
  }

  function getDay(dateSent: Date, monthDay: number) {
    const date = new Date();
    const today = new Date().getDate();

    if (
      dateSent.getFullYear() === date.getFullYear() &&
      dateSent.getMonth() === date.getMonth()
    ) {
      switch (monthDay) {
        case today:
          return "Today";
        case today - 1:
          return "Yesterday";
        default:
          return monthDay;
      }
    } else {
      return monthDay;
    }
  }

  function viewProfile(
    userID: string,
    ref: RefObject<HTMLHeadingElement | HTMLDivElement>
  ) {
    dispatch(setMemberProfileCardOpen(!memberProfileCardOpen));

    if (!ref.current) return;

    const memberProfileCardX = ref.current.getBoundingClientRect().right;
    const memberProfileCardY = ref.current.getBoundingClientRect().top;

    dispatch(setMemberID(userID));

    dispatch(
      setMemberProfileCardPosition({
        left: memberProfileCardX + 6,
        top: memberProfileCardY,
      })
    );
  }

  function viewMedia(src: string, type: string) {
    dispatch(setViewMediaOpen(true));
    dispatch(setViewMedia({ src, type }));
  }

  return (
    <Container>
      <MessageContainer>
        <ProfilePictureContainer
          onClick={() => viewProfile(props.message.userID, avatarRef)}
          ref={avatarRef}
        >
          <ProfilePicture
            loader={() => avatar}
            src={avatar}
            width={40}
            height={40}
            alt="Profile picture"
          />
        </ProfilePictureContainer>

        <ContentContainer>
          <MessageContent>
            <MessageInfo>
              <Username
                onClick={() => viewProfile(props.message.userID, messageRef)}
                ref={messageRef}
              >
                {username}
              </Username>

              <MessageDate>{getDate()}</MessageDate>
            </MessageInfo>

            <Content>{props.message.content}</Content>
          </MessageContent>
          {props.message.image && (
            <MessageAccessories>
              <MessageImage
                onClick={() => viewMedia(props.message.image, "image")}
                src={props.message.image}
              />
            </MessageAccessories>
          )}
          {props.message.video && (
            <MessageAccessories>
              <MessageVideo
                onClick={() => viewMedia(props.message.video, "video")}
                src={props.message.video}
                autoPlay
                loop
                preload="auto"
              />
            </MessageAccessories>
          )}
        </ContentContainer>
      </MessageContainer>
    </Container>
  );
}

const Container = tw.li`
  flex w-full select-text
`;

const MessageContainer = tw.div`
  flex w-full mt-[17px] py-0.5 pr-12 pl-4
  hover:bg-gray-50
`;

const ProfilePictureContainer = tw.div`
  flex-none mt-0.5 cursor-pointer select-none
`;

const ContentContainer = tw.div`
  flex flex-col pl-4
`;

const MessageContent = tw.div`
  flex flex-col
`;

const ProfilePicture = tw(Image)`
  object-cover rounded-full
`;

const MessageInfo = tw.div`
  flex flex-wrap
`;

const Username = tw.h2`
  mr-1 text-gray-900 font-semibold cursor-pointer break-all
  hover:underline hover:decoration-gray-900
`;

const MessageDate = tw.span`
  flex items-center ml-1 text-xs font-medium font-gray-500
`;

const Content = tw.p`
  font-medium text-gray-800
`;

const MessageAccessories = tw.div`
  flex w-full h-full max-w-[400px] max-h-[300px] py-0.5
`;

const MessageImage = tw.img`
  object-contain rounded-middle cursor-pointer
`;

const MessageVideo = tw.video`
  object-contain rounded-middle cursor-pointer
`;
