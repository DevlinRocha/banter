import tw from "tailwind-styled-components";
import Image from "next/image";

interface MessageProps {
  message: {
    user: {
      img: string;
      name: string;
    };
    content: string;
    date: {
      seconds: number;
      nanoseconds: number;
    };
    edited: boolean;
    reactions: never[];
    timestamp: number;
  };
}

export default function Message(props: MessageProps) {
  function getDate() {
    const timestamp = props.message.timestamp;
    const date = new Date(timestamp);
    const dayNumber = date.getDay();
    const day = getDay(dayNumber);
    const minutes = date.getMinutes();

    let hours = date.getHours();
    let period = "";

    if (hours > 12) {
      period = "PM";
      hours = hours - 12;
    } else {
      period = "AM";
    }

    const format = `${day} at ${hours}:${minutes} ${period}`;
    return format;
  }

  function getDay(day: number) {
    const today = new Date().getDay();
    switch (day) {
      case today:
        return "Today";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
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
  flex mt-2
`;

const ProfilePicture = tw.div`
  absolute left-4
`;

const MessageContent = tw.div`
  flex flex-col ml-72px
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
