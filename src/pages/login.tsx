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

      const docData = docSnap.data();

      const currentUser = {
        username: docData.username,

        tag: docData.tag,

        avatar: docData.avatar,

        about: docData.about,

        banner: docData.banner,

        userID: user.uid,

        email: docData.email,
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
