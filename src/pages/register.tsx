import RegistrationForm from "../components/RegistrationForm";
import tw from "tailwind-styled-components/dist/tailwind";

export default function Register() {
  return (
    <Container>
      <RegistrationForm></RegistrationForm>
    </Container>
  );
}

const Container = tw.div`
    flex justify-center
`;
