import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useServersState, setUser } from "../features/servers";
import muteIcon from "../../assets/muteIcon.png";
import deafenIcon from "../../assets/deafenIcon.png";
import settingsIcon from "../../assets/settingsIcon.svg";

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

  function handleClick() {}

  return (
    <Container>
      <UserInfo>
        <ProfilePicture>
          <StyledImage
            loader={() => user.img}
            src={user.img}
            width={32}
            height={32}
            alt="Profile picture"
          />
        </ProfilePicture>

        <Username>{user.name}</Username>
      </UserInfo>

      <IconsPanel>
        <Icon src={muteIcon} width={20} height={20} />
        <Icon src={deafenIcon} width={20} height={20} />
        <Icon onClick={handleClick} src={settingsIcon} width={20} height={20} />
      </IconsPanel>
    </Container>
  );
}

const Container = tw.section`
  flex justify-between px-2
`;

const UserInfo = tw.section`
  flex
`;

const ProfilePicture = tw.div`
`;

const StyledImage = tw(Image)`
  object-contain rounded-full
`;

const Username = tw.span`
`;

const IconsPanel = tw.section`
  flex justify-between align-center w-24
`;

const Icon = tw(Image)`
  cursor-pointer object-contain
`;
