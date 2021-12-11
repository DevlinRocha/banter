import LoginForm from "../components/LoginForm";
import tw from "tailwind-styled-components/dist/tailwind";

export default function Register() {
  return (
    <Container>
      <LoginForm></LoginForm>
    </Container>
  );
}

const Container = tw.div`
    flex justify-center
`;
