import tw from "tailwind-styled-components";
import { version } from "../../package.json";

export default function Title() {
  return (
    <Container>
      <Subcontainer>
        <Welcome>
          Welcome to Banter <Code>v{version}</Code>!
        </Welcome>
        <Welcome>This is still a work in progress</Welcome>
      </Subcontainer>
      <Subcontainer>
        <Welcome>
          To get started, select a server from the leftmost panel
        </Welcome>
        <Welcome>
          You should always have access to the Global Chat server
        </Welcome>
      </Subcontainer>
    </Container>
  );
}

const Container = tw.section`
  flex flex-col h-full w-full items-center justify-center
  dark:text-text-primary
`;

const Subcontainer = tw.section`
  flex flex-col items-center justify-center p-4
`;

const Code = tw.span`
  bg-slate-100
  dark:bg-dark-600
`;

const Welcome = tw.span`
  text-center
`;
