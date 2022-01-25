import { useEffect, useState } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { createGifMessage } from "../../../firebase";
import { setSendGifOpen } from "../../features/sendGif";
import { useServersState } from "../../features/servers";
import { useUserState } from "../../features/user";
import { useAppDispatch } from "../../redux/hooks";

interface GifData {
  content_description: string;
  id: string;
  url: string;
  media: [
    {
      loopedmp4: {
        url: string;
      };
    }
  ];
}

export default function SendGif() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<GifData[]>([]);
  const { server, channel } = useServersState();
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchGifs();
  }, [searchInput]);

  async function fetchGifs() {
    const baseURL = `https://g.tenor.com/v1/search?q=${searchInput}&key=${process.env.NEXT_PUBLIC_TENOR_API_KEY}&limit=8`;
    const fetchedGifs = await fetch(baseURL);
    const gifsData = await fetchedGifs.json();
    setSearchResults(gifsData.results);
  }

  function closeWindow() {
    dispatch(setSendGifOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function sendGif(url: string) {
    createGifMessage(server.serverID, channel.channelID, user.userID, url);
    closeWindow();
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <GifPicker>
          <Header>
            <GifSearchContainer>
              <GifSearch
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Search Tenor"
              />
            </GifSearchContainer>
          </Header>

          <ContentContainer>
            <GifContainer>
              {searchResults.map((result) => {
                const url = result.media[0].loopedmp4.url;

                return (
                  <Gif
                    onClick={() => sendGif(url)}
                    src={url}
                    autoPlay
                    loop
                    preload="auto"
                    key={result.id}
                  />
                );
              })}
            </GifContainer>
          </ContentContainer>
        </GifPicker>
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  absolute w-full h-full z-50
`;

const Container = tw.section`
  absolute right-4 bottom-0 w-[424px] h-[412px] bg-gray-100 rounded-lg drop-shadow-lg
`;

const GifPicker = tw.div`
  flex flex-col pt-4 w-full h-full
`;

const Header = tw.header`
  px-4 pb-4 border-b h-[46px]
`;

const GifSearchContainer = tw.div`
  flex w-full h-[34px] bg-gray-200 rounded-middle
`;

const GifSearch = tw.input`
  w-full m-px px-2 bg-transparent
  placeholder-gray-500
`;

const ContentContainer = tw.div`
  relative w-full h-full p-2 overflow-hidden
  hover:overflow-y-scroll
`;

const GifContainer = tw.div`
  absolute flex flex-wrap gap-2
`;

const Gif = tw.video`
  w-[194px] h-fit rounded-[5px] object-cover cursor-pointer
  hover:outline hover:outline-[3px] hover:outline-primary hover:drop-shadow-md
`;
