import Image from "next/image";
import tw from "tailwind-styled-components/dist/tailwind";
import { setViewMediaOpen, useServersState } from "../features/servers";
import { useAppDispatch } from "../redux/hooks";

export default function ViewMedia() {
  const { viewMedia } = useServersState();
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setViewMediaOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        {viewMedia.type === "image" && viewMedia.src && (
          <StyledImage
            onClick={closeWindow}
            loader={() => viewMedia.src}
            src={viewMedia.src}
            width={992}
            height={609}
            unoptimized
          />
        )}

        {viewMedia.type === "video" && viewMedia.src && (
          <StyledVideo src={viewMedia.src} autoPlay loop preload="auto" />
        )}
        <LinkText
          href={viewMedia.src}
          rel="noreferrer noopener"
          target="_blank"
        >
          Open original
        </LinkText>
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black/[0.85] z-20
`;

const Container = tw.div`
  fixed flex flex-col w-fit h-fit top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
`;

const StyledImage = tw(Image)`
  object-contain
`;

const StyledVideo = tw.video`
  object-contain
`;

const LinkText = tw.a`
  text-sm text-gray-400 font-medium cursor-pointer leading-[30px]
  hover:underline
`;
