import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC } from "react";
import useAuth from "../hooks/useAuth";

interface WelcomeDialogProps {
  open: boolean;
  onCloseClick: () => void;
}

const WelcomeDialog: FC<WelcomeDialogProps> = ({ open, onCloseClick }) => {
  const { display_name } = useAuth();
  return (
    <Dialog
      open={open}
      sx={{
        backdropFilter: "blur(5px)",
      }}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0,0,0,0)" },
        },
      }}
    >
      <DialogTitle>Welcome, {display_name}!</DialogTitle>
      <DialogContent>Let's start digging through your tunes!</DialogContent>
      <DialogActions>
        <Button onClick={onCloseClick} variant="contained">
          Go
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WelcomeDialog;
