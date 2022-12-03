import tw from "tailwind-styled-components";
import { version } from "../../package.json";

export default function Title() {
  return (
    <Container>
      <Welcome>
        Welcome to Banter <Code>v{version}</Code>!
      </Welcome>
    </Container>
  );
}

const Container = tw.section`
  flex h-full w-full items-center justify-center bg-white z-10
`;

const Welcome = tw.span``;

const Code = tw.span`
  bg-slate-100
`;
