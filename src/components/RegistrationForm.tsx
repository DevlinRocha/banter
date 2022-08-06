import { useRef } from "react";
import Link from "next/link";
import { createAccount } from "../../firebase";
import tw from "tailwind-styled-components/dist/tailwind";

export default function RegistrationForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    let email = "";
    let password = "";
    let username = "";

    if (!emailRef.current || !passwordRef.current || !usernameRef.current)
      return;

    email = emailRef.current.value;
    password = passwordRef.current.value;
    username = usernameRef.current.value;

    await createAccount(email, password, username);
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Header>Create an account</Header>

      <RegisterContainer>
        <EmailField>
          <EmailLabel htmlFor="emailInput">Email</EmailLabel>

          <EmailInput
            ref={emailRef}
            type="email"
            required
            placeholder="Email"
            id="emailInput"
          />
        </EmailField>

        <UsernameField>
          <UsernameLabel htmlFor="usernameInput">Username</UsernameLabel>

          <UsernameInput
            ref={usernameRef}
            type="text"
            required
            placeholder="What should everyone call you?"
            autoComplete="username"
            id="usernameInput"
            minLength={2}
            maxLength={32}
          />
        </UsernameField>

        <PasswordField>
          <PasswordLabel htmlFor="passwordInput">Password</PasswordLabel>

          <PasswordInput
            ref={passwordRef}
            type="password"
            required
            placeholder="Password"
            autoComplete="new-password"
            id="passwordInput"
          />
        </PasswordField>

        <ContinueButton type="submit" value="Continue" />

        <Link href="/login" passHref>
          <LinkText>Already have an account?</LinkText>
        </Link>

        <Fine>
          By registering, you agree to be respectful to others and not sue
          Banter.
        </Fine>
      </RegisterContainer>
    </Container>
  );
}

const Container = tw.form`
  flex flex-col w-120 bg-white rounded-md p-8
`;

const Header = tw.h3`
  text-center text-2xl leading-[1.875rem] font-semibold
`;

const RegisterContainer = tw.div`
  flex flex-col w-full h-full mt-5
`;

const GenericFieldset = tw.fieldset`
  flex flex-col mb-5
`;

const GenericLabel = tw.label`
  mb-2 text-xs text-gray-600 font-semibold
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

const UsernameField = tw(GenericFieldset)`
`;

const UsernameLabel = tw(GenericLabel)`
`;

const UsernameInput = tw(GenericInput)`
`;

const PasswordField = tw(GenericFieldset)`
`;

const PasswordLabel = tw(GenericLabel)`
`;

const PasswordInput = tw(GenericInput)`
`;

const ContinueButton = tw.input`
  w-full h-10 px-4 py-0.5 bg-indigo-500 rounded text-white cursor-pointer
`;

const LinkText = tw.button`
  text-blue-600 cursor-pointer w-fit mt-2 text-sm font-medium
  hover:underline hover:decoration-blue-600
`;

const Fine = tw.span`
  mt-5 text-xs
`;
