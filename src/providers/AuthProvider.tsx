import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AuthContext, IAuthContext } from "../context/AuthContext";
import { authenticate, loginWithSpotifyClick } from "../api/pkce";
import LoginPromptScreen from "../layouts/LoginPromptScreen";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userData, setUserData] = useState<IAuthContext>();

  const handleLoginClick = useCallback(async () => {
    // redirect to spotify.com
    loginWithSpotifyClick();
  }, []);

  useEffect(() => {
    async function auth() {
      // try to authenticate with spotify, will do so only if in callback
      const user = await authenticate();

      if (!user) return;
      setUserData(user);
    }

    auth();
  }, []);
  if (!userData) return <LoginPromptScreen onLoginClick={handleLoginClick} />;
  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
