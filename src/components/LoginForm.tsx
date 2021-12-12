import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "../../firebase";
import tw from "tailwind-styled-components/dist/tailwind";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    let email = "";
    let password = "";
    if (emailRef.current) {
      email = emailRef.current.value;
    }
    if (passwordRef.current) {
      password = passwordRef.current.value;
    }
    signIn(email, password);
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Heading>Welcome back!</Heading>
      <Subheading>{"We're so excited to see you again!"}</Subheading>

      <EmailField>
        <EmailLabel htmlFor="emailInput">Email</EmailLabel>
        <EmailInput ref={emailRef} type="email" required id="emailInput" />
      </EmailField>

      <PasswordField>
        <PasswordLabel htmlFor="passwordInput">Password</PasswordLabel>
        <PasswordInput
          ref={passwordRef}
          type="pasword"
          required
          id="passwordInput"
        />
      </PasswordField>

      <SubmitButton type="submit" value="Login" />

      <Link href="/login">Forgot your password?</Link>
      <Fine>
        Need an account? <Link href="/register">Register</Link>
      </Fine>
    </Container>
  );
}

const Container = tw.form`
  flex flex-col justify-center gap-4 w-80
`;

const Heading = tw.h3`
  text-center
`;

const Subheading = tw.h3`
  text-center
`;

const GenericFieldset = tw.fieldset`
  flex flex-col gap-1
`;

const GenericLabel = tw.label`
`;

const GenericInput = tw.input`
  border-2 rounded-md p-1
`;

const EmailField = tw(GenericFieldset)`
`;

const EmailLabel = tw(GenericLabel)`
`;

const EmailInput = tw(GenericInput)`
`;

const PasswordField = tw(GenericFieldset)`
`;

const PasswordLabel = tw(GenericLabel)`
`;

const PasswordInput = tw(GenericInput)`
`;

const SubmitButton = tw.input`
  p-2 rounded-md
`;

const Fine = tw.span`
`;
