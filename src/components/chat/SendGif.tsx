import { useEffect, useState } from "react";
import tw from "tailwind-styled-components/dist/tailwind";

export default function SendGif() {
  const [searchInput, setSearchInput] = useState("");
  const [gifSrc, setGifSrc] = useState("");

  useEffect(() => {
    fetchGifs();
  }, [searchInput]);

  async function fetchGifs() {
    const baseURL = `https://g.tenor.com/v1/search?q=${searchInput}&key=${process.env.NEXT_PUBLIC_TENOR_API_KEY}&limit=8`;
    const fetchedGifs = await fetch(baseURL);
    const gifsData = await fetchedGifs.json();
    setGifSrc(gifsData.results[0].media[0].loopedmp4.url);
  }

  return (
    <Container>
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
          <GifContainer
            src={gifSrc}
            autoPlay
            loop
            preload="auto"
            width={194}
            height={194}
          />
        </ContentContainer>
      </GifPicker>
    </Container>
  );
}

const Container = tw.section`
  absolute right-4 bottom-0 w-[424px] h-[412px] bg-gray-100 rounded-lg
`;

const GifPicker = tw.div`
  flex flex-col pt-4 w-full h-full
`;

const Header = tw.header`
  px-4 pb-4
`;

const GifSearchContainer = tw.div`
  flex w-full h-[34px] bg-gray-200 rounded-middle
`;

const GifSearch = tw.input`
  w-full m-px px-2 bg-transparent
  placeholder-gray-500
`;

const ContentContainer = tw.div`
  flex w-full h-full
`;

const GifContainer = tw.video`
`;
