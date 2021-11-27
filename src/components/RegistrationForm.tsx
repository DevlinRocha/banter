import { useRef } from "react";
import { useRouter } from "next/router";
import { createAccount } from "../../firebase";
import tw from "tailwind-styled-components/dist/tailwind";

export default function RegistrationForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: any) {
    e.preventDefault();
    let email = "";
    let password = "";
    let username = "";
    if (emailRef.current) {
      email = emailRef.current.value;
    }
    if (passwordRef.current) {
      password = passwordRef.current.value;
    }
    if (usernameRef.current) {
      username = usernameRef.current.value;
    }
    createAccount(email, password, username);
    router.push("/register-complete");
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Create an account</FormTitle>

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
          id="usernameInput"
        />
      </UsernameField>

      <PasswordField>
        <PasswordLabel htmlFor="passwordInput">Password</PasswordLabel>
        <PasswordInput
          ref={passwordRef}
          type="pasword"
          required
          placeholder="Password"
          id="passwordInput"
        />
      </PasswordField>
      <SubmitButton type="submit" value="Continue" />
    </FormContainer>
  );
}

const FormContainer = tw.form`
  flex flex-col justify-center gap-4 w-80
`;

const FormTitle = tw.h3`
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

const SubmitButton = tw.input`
  p-2 rounded-md
`;
