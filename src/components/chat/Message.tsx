import { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { MessageData } from "../../features/servers";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

interface MessageProps {
  message: MessageData;
}

export default function Message(props: MessageProps) {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(
    "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/defaultProfilePicture.svg?alt=media&token=e0ee525e-6ad5-4098-9198-77608ec38f3a"
  );

  useEffect(() => {
    const userID = props.message.userID;
    const unsubscribe = onSnapshot(doc(db, "users", userID), (doc) => {
      if (!doc.exists()) return;

      const username = doc.data().username;
      const avatar = doc.data().avatar;

      setUsername(username);
      setAvatar(avatar);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function getDate() {
    const timestamp = props.message.timestamp;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayNumber = date.getDay();
    const day = getDay(date, dayNumber);

    let hours = date.getHours();
    let minutes: number | string = date.getMinutes();
    let period = "";

    if (hours > 12) {
      period = "PM";
      hours = hours - 12;
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
      format = `${month}/${day}/${year}`;
    }

    return format;
  }

  function getDay(dateSent: Date, day: number) {
    const date = new Date();
    const today = new Date().getDay();

    if (
      dateSent.getFullYear() === date.getFullYear() &&
      dateSent.getMonth() === date.getMonth()
    ) {
      switch (day) {
        case today:
          return "Today";
        case today - 1:
          return "Yesterday";
        default:
          return day;
      }
    } else {
      return day;
    }
  }

  return (
    <Container>
      <ProfilePicture>
        <StyledImage
          loader={() => avatar}
          src={avatar}
          width={40}
          height={40}
          alt="Profile picture"
        />
      </ProfilePicture>

      <MessageContent>
        <MessageInfo>
          <Username>{username}</Username>

          <MessageDate>{getDate()}</MessageDate>
        </MessageInfo>

        <Content>{props.message.content}</Content>
      </MessageContent>
    </Container>
  );
}

const Container = tw.li`
  flex w-full mt-[17px] py-0.5 pr-12 pl-4 gap-4
  hover:bg-gray-50
`;

const ProfilePicture = tw.div`
  flex-none mt-0.5
`;

const MessageContent = tw.div`
  flex flex-col
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const MessageInfo = tw.div`
  flex flex-wrap gap-1
`;

const Username = tw.h2`
  text-gray-900 font-semibold
`;

const MessageDate = tw.span`
  flex items-center text-xs
`;

const Content = tw.p`
  font-medium
`;
