import LoginForm from "../components/LoginForm";
import tw from "tailwind-styled-components/dist/tailwind";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { setUser, resetUserState } from "../features/user";
import { useAppDispatch } from "../redux/hooks";

export default function Register() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      if (!user) return dispatch(resetUserState());

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return dispatch(resetUserState());

      const currentUser = {
        username: docSnap.data().username,

        tag: docSnap.data().tag,

        avatar: docSnap.data().avatar,

        about: docSnap.data().about,

        banner: docSnap.data().banner,

        userID: user.uid,

        email: docSnap.data().email,
      };

      dispatch(setUser(currentUser));
      router.push("/channels/@me");
    });
    return () => {
      authStateListener();
    };
  }, []);

  return (
    <Container>
      <LoginForm></LoginForm>
    </Container>
  );
}

export async function getServerSideProps() {
  const auth = getAuth();

  if (auth) {
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
