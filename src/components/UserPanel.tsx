import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useServersState, setUser } from "../features/servers";

export default function UserPanel() {
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
    <Container>
      <ProfilePicture>
        <StyledImage
          loader={() => user.img}
          src={user.img}
          width={40}
          height={40}
          alt="Profile picture"
        />
      </ProfilePicture>
      <Username>{user.name}</Username>
    </Container>
  );
}

const Container = tw.section`
  flex
`;

const ProfilePicture = tw.div`
`;

const StyledImage = tw(Image)`
`;

const Username = tw.span`
`;
