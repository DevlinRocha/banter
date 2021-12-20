import { useAppDispatch } from "../../redux/hooks";
import { useUserState } from "../../features/user";
import { getAuth } from "firebase/auth";
import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";

export default function UserProfileCard() {
  const auth = getAuth();
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  return (
    <ContainerCol>
      <Banner />

      <Container>
        <ProfilePicture>
          <StyledImage
            loader={() => user.avatar}
            src={user.avatar}
            width={80}
            height={80}
            alt="Profile picture"
          />
        </ProfilePicture>

        <Username>
          <DisplayName>{user.username}</DisplayName>

          <Tag>#{user.tag}</Tag>
        </Username>
      </Container>
    </ContainerCol>
  );
}

const Container = tw.section`
  flex rounded-md
`;

const ContainerCol = tw(Container)`
  flex flex-col
`;

const Banner = tw.span`
  w-165 h-25 bg-blue-300 rounded-t-md
`;

const ProfilePicture = tw.div`
  flex t-19 l-4 border-[7px] rounded-full
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const Username = tw.span`
`;

const DisplayName = tw(Username)`
`;

const Tag = tw(Username)`
`;
