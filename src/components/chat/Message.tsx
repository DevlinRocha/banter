import tw from "tailwind-styled-components";
import Image from "next/image";
import { MessageData } from "../../features/servers";

interface MessageProps {
  message: MessageData;
}

export default function Message(props: MessageProps) {
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
          loader={() => props.message.user.img}
          src={props.message.user.img}
          width={40}
          height={40}
          alt="Profile picture"
        />
      </ProfilePicture>
      <MessageContent>
        <MessageInfo>
          <Username>{props.message.user.name}</Username>
          <MessageDate>{getDate()}</MessageDate>
        </MessageInfo>
        <Content>{props.message.content}</Content>
      </MessageContent>
    </Container>
  );
}

const Container = tw.li`
  flex mt-2 gap-4
`;

const ProfilePicture = tw.div`
  mt-1
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

const Username = tw.span`
`;

const MessageDate = tw.span`
`;

const Content = tw.p`
`;
