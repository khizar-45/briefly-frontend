import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const GoogleLoginButton = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //mongodb post request can be added here in the future
      console.log("User Logged In:");
      console.log("Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("Profile Pic:", user.photoURL);
      console.log("UID:", user.uid);
      
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex justify-center items-center mx-auto cursor-pointer text-center px-4 py-2 bg-black text-white rounded-lg font-semibold shadow-[inset_0_0_0_1px_white]
            active:bg-[hsl(56,100%,50%)] active:text-black active:scale-90
            hover:shadow-none hover:bg-[hsl(56,100%,50%)] hover:text-black transition-all duration-50"
    >
      <img
        src="/google.png"
        alt="Google logo"
        className="w-5 h-5 mr-3"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
