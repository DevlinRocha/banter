import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signInAsGuest } from "../../firebase";
import tw from "tailwind-styled-components/dist/tailwind";
import banterIcon from "../../assets/banterIcon.svg";
import { useRouter } from "next/router";

export default function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    let email = "";
    let password = "";

    if (!emailRef.current || !passwordRef.current) return;

    email = emailRef.current.value;
    password = passwordRef.current.value;

    signIn(email, password);
  }

  async function guestLogin() {
    await signInAsGuest();
    router.push("/channels/@me");
  }

  return (
    <Container onSubmit={handleSubmit}>
      <LoginContainer>
        <Heading>Welcome back!</Heading>

        <Subheading>{"We're so excited to see you again!"}</Subheading>

        <EmailField>
          <EmailLabel htmlFor="emailInput">Email</EmailLabel>

          <EmailInput
            ref={emailRef}
            type="email"
            required
            autoComplete="username"
            id="emailInput"
          />
        </EmailField>

        <PasswordField>
          <PasswordLabel htmlFor="passwordInput">Password</PasswordLabel>

          <PasswordInput
            ref={passwordRef}
            type="password"
            required
            autoComplete="current-password"
            id="passwordInput"
          />
          <Link href="/login" passHref>
            <Fine>
              <LinkText>Forgot your password?</LinkText>
            </Fine>
          </Link>
        </PasswordField>

        <LoginButton>
          <LoginText>Login</LoginText>
        </LoginButton>

        <Fine>
          Need an account?{" "}
          <Link href="/register" passHref>
            <LinkText> Register</LinkText>
          </Link>
        </Fine>
      </LoginContainer>

      <Separator />

      <BanterContainer onClick={guestLogin}>
        <BanterIcon>
          <StyledImage
            src={banterIcon}
            width={176}
            height={176}
            alt="Banter logo"
          />
        </BanterIcon>
        <Caption>Log in as Guest</Caption>
        <SubCaption>
          Click this to login to Banter with a <Bold>guest account</Bold>{" "}
          instantly.
        </SubCaption>
      </BanterContainer>
    </Container>
  );
}

const Container = tw.form`
  flex w-196 h-102 p-8 justify-between bg-white rounded-md select-none
`;

const LoginContainer = tw.div`
  flex flex-col justify-center w-full h-full
`;

const Heading = tw.h3`
  text-2xl text-center font-semibold mb-2
`;

const Subheading = tw.span`
  text-center mb-5 text-gray-600
`;

const LinkText = tw.span`
  text-blue-600 font-medium cursor-pointer
  hover:underline hover:decoration-blue-600
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
  text-sm text-gray-500 mt-1
`;

const Separator = tw.div`
  w-0 h-0 border mx-8 self-center
`;

const BanterContainer = tw.div`
  flex flex-col justify-center items-center w-60 h-full text-center cursor-pointer
`;
const BanterIcon = tw.figure`
  flex w-60 justify-center mb-8
`;

const StyledImage = tw(Image)`
  rounded-md
`;

const Caption = tw.h3`
  text-2xl font-semibold mb-2
`;

const SubCaption = tw.span`
  text-gray-600
`;

const Bold = tw.span`
  font-semibold
`;
