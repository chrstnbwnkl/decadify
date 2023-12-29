import { Dialog, Link, Typography } from "@mui/material";
import { FC } from "react";
import { GRADIENT } from "../theme";

interface LoginPromptScreenProps {
  onLoginClick: () => void;
}

const LoginPromptScreen: FC<LoginPromptScreenProps> = ({ onLoginClick }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: GRADIENT,
      }}
    >
      <Dialog open slotProps={{ backdrop: { invisible: true } }}>
        <Typography variant="h6" sx={{ textAlign: "center", p: 10 }}>
          Ready to set up your ultimate New Year's eve playlist?{" "}
          <Link sx={{ cursor: "pointer" }} onClick={onLoginClick}>
            Click here
          </Link>{" "}
          to log in via Spotify!
        </Typography>
      </Dialog>
    </div>
  );
};

export default LoginPromptScreen;
