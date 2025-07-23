import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Set the key in the /.env file
    authDomain: "lynai-housing-app.firebaseapp.com",
    projectId: "lynai-housing-app",
    storageBucket: "lynai-housing-app.firebasestorage.app",
    messagingSenderId: "238599956197",
    appId: "1:238599956197:web:87b8bb1729ef2fd187960c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
