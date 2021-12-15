import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useServersState, setUser } from "../../features/servers";
import { auth } from "../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import tw from "tailwind-styled-components/dist/tailwind";
import Image from "next/image";

export default function UserProfileCard() {
  const { user } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const currentUser = {
          name: user.displayName,
          img: user.photoURL,
        };
        dispatch(setUser(currentUser));
      } else {
        // User is signed out
      }
    });
  }, []);

  return (
    <ContainerCol>
      <Banner />

      <Container>
        <ProfilePicture>
          <StyledImage
            loader={() => user.img}
            src={user.img}
            width={80}
            height={80}
            alt="Profile picture"
          />
        </ProfilePicture>

        <Username>
          <DisplayName>{user.name}</DisplayName>
          <Discriminator>#{user.id}</Discriminator>
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
  flex t-19 l-4 border-8 rounded-full
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const Username = tw.span`
`;

const DisplayName = tw(Username)`
`;

const Discriminator = tw(Username)`
`;
