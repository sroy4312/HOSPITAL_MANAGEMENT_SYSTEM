import { initializeApp } from "firebase/app";
import { getAuth } from "firbase/auth";


const firebaseConfig = {

}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;