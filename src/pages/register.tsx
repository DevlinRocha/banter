import tw from "tailwind-styled-components/dist/tailwind";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { setUser, resetUserState } from "../features/user";
import { useAppDispatch } from "../redux/hooks";
import RegistrationForm from "../components/RegistrationForm";

export default function Register() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const currentUser = {
            username: docSnap.data().username,

            tag: docSnap.data().tag,

            avatar: docSnap.data().avatar,

            about: docSnap.data().about,

            banner: docSnap.data().banner,

            userID: user.uid,
          };

          dispatch(setUser(currentUser));
          router.push("/app");
        } else {
          // doc.data() will be undefined in this case

          dispatch(resetUserState());

          console.log("No such document!");
        }
      } else {
        dispatch(resetUserState());
      }
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

const Container = tw.div`
  flex justify-center items-center w-screen h-screen bg-indigo-500
`;
