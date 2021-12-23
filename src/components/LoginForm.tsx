import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "../../firebase";
import tw from "tailwind-styled-components/dist/tailwind";
import banterIcon from "../../assets/banterIcon.svg";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
      <LoginContainer>
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

        <Link href="/login">
          <LinkText>Forgot your password?</LinkText>
        </Link>

        <LoginButton>
          <LoginText>Login</LoginText>
        </LoginButton>

        <Fine>
          Need an account?
          <Link href="/register">
            <LinkText> Register</LinkText>
          </Link>
        </Fine>
      </LoginContainer>

      <Separator />

      <BanterContainer>
        <BanterIcon>
          <StyledImage
            src={banterIcon}
            width={176}
            height={176}
            alt="Banter logo"
          />
        </BanterIcon>
        <Caption>Log in to Banter</Caption>
      </BanterContainer>
    </Container>
  );
}

const Container = tw.form`
  flex w-196 h-102 p-8 justify-between bg-white rounded-md
`;

const LoginContainer = tw.div`
  flex flex-col justify-center gap-4 w-full h-full
`;

const Heading = tw.h3`
  text-center font-bold
`;

const Subheading = tw.span`
  text-center
`;

const LinkText = tw.span`
  text-blue-600 cursor-pointer
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

const LoginButton = tw.button`
  flex justify-center rounded-md mb-2 py-0.5 px-4 bg-indigo-500 text-white cursor-pointer
`;

const LoginText = tw.span`
  flex items-center h-10
`;

const Fine = tw.span`
`;

const Separator = tw.div`
  w-0 h-0 border mx-8 self-center
`;

const BanterContainer = tw.div`
  flex flex-col justify-center items-center w-60 h-full
`;

const BanterIcon = tw.figure`
  flex w-60 justify-center mb-8
`;

const StyledImage = tw(Image)`
  rounded-md
`;

const Caption = tw.h3`
`;
