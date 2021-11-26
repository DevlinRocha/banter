import tw from "tailwind-styled-components/dist/tailwind";

export default function RegistrationForm() {
  return (
    <FormContainer>
      <FormTitle>Create an account</FormTitle>

      <EmailField>
        <EmailLabel htmlFor="emailInput">Email</EmailLabel>
        <EmailInput type="email" required placeholder="Email" id="emailInput" />
      </EmailField>
      <UsernameField>
        <UsernameLabel htmlFor="usernameInput">Username</UsernameLabel>
        <UsernameInput
          type="text"
          required
          placeholder="What should everyone call you?"
          id="usernameInput"
        />
      </UsernameField>

      <PasswordField>
        <PasswordLabel htmlFor="passwordInput">Password</PasswordLabel>
        <PasswordInput
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
