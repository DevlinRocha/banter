import tw from "tailwind-styled-components";
import Image from "next/image";

interface MessageProps {
  message: {
    user: {
      img: string;
      username: string;
    };
    content: string;
    date: string;
    edited: boolean;
    reactions: null;
  };
}

export default function Message(props: MessageProps) {
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
          <Username>{props.message.user.username}</Username>
          <Date>{props.message.date}</Date>
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

const Date = tw.span`
`;

const Content = tw.p`
`;
