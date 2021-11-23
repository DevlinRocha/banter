import tw from "tailwind-styled-components";

export default function TextArea() {
  return (
    <Container>
      <TextInput type="text" placeholder="Message" />
    </Container>
  );
}

const Container = tw.div`

`;

const TextInput = tw.input`
  border-black border-2 rounded-md
`;
