import tw from "tailwind-styled-components/dist/tailwind";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { resetUserState } from "../features/user";
import { useAppDispatch } from "../redux/hooks";
import RegistrationForm from "../components/RegistrationForm";

export default function Register() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, (user) => {
      if (!user) return dispatch(resetUserState());

      router.push("/channels/@me");
    });
    return () => {
      authStateListener();
    };
  }, []);

  return (
    <Container>
      <RegistrationForm></RegistrationForm>
    </Container>
  );
}

export async function getServerSideProps() {
  const auth = getAuth();

  if (auth.currentUser) {
    return {
      redirect: {
        destination: "/channels/@me",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Container = tw.div`
  flex justify-center items-center w-screen h-screen bg-indigo-500
`;
