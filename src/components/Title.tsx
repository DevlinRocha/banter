import Image from "next/image";
import tw from "tailwind-styled-components";
import { useServersState } from "../features/servers";
import memberListIcon from "../../assets/memberListIcon.svg";
import {
  setMemberListOpen,
  useUserSettingsState,
} from "../features/userSettings";
import { useAppDispatch } from "../redux/hooks";

export default function Title() {
  const { channel } = useServersState();
  const { memberListOpen } = useUserSettingsState();
  const dispatch = useAppDispatch();

  function toggleMembersList() {
    dispatch(setMemberListOpen(!memberListOpen));
  }

  return (
    <Container>
      <HeadingContainer>
        <Heading># {channel.name}</Heading>

        {channel.topic && (
          <>
            <Divider />

            <Topic>{channel.topic}</Topic>
          </>
        )}
      </HeadingContainer>

      <Toolbar>
        <StyledImage
          onClick={toggleMembersList}
          src={memberListIcon}
          width={24}
          height={24}
        />
      </Toolbar>
    </Container>
  );
}

const Container = tw.section`
  flex flex-none h-12 px-2 items-center justify-between bg-white z-10 border-b border-gray-300
`;

const HeadingContainer = tw.div`
  flex items-center
`;

const Heading = tw.h3`
  p-2
`;

const Divider = tw.div`
  w-px h-6 mx-2 bg-gray-300
`;

const Topic = tw.span`
  p-2 text-xs
`;

const Toolbar = tw.div`
  mx-2
`;

const StyledImage = tw(Image)`
  cursor-pointer
`;
