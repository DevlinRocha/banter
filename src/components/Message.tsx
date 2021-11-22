import tw from "tailwind-styled-components";

interface MessageProps {
  message: {
    user: {
      img: string;
      username: string;
    };
    content: string;
    edited: boolean;
    reactions: null;
  };
}

export default function Message(props: MessageProps) {
  return (
    <Container>
      <Username>{props.message.user.username}</Username>
      <ProfilePicture src={props.message.user.img} />
      <p>{props.message.content}</p>
    </Container>
  );
}

const Container = tw.div`
`;

const ProfilePicture = tw.img`
`;

const Username = tw.p`
`;
