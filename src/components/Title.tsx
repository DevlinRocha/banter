import tw from "tailwind-styled-components";

export default function Title() {
  return <Header>Global Chat</Header>;
}

const Header = tw.section`
  flex sticky top-0 h-10 bg-white z-10
`;
