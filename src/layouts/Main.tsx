import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { GRADIENT } from "../theme";
import { useState } from "react";
import WelcomeDialog from "../components/WelcomeDialog";
import { Outlet, useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const Main = () => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px",
              backgroundImage: GRADIENT,
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                backgroundColor: "white",
                borderRadius: "4px",
                padding: "4px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <Typography
                component="h1"
                variant="h5"
                noWrap
                sx={{
                  flexGrow: 1,
                  fontWeight: "bolder",
                  background: GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Decadify
              </Typography>
            </span>
            <IconButton
              color="inherit"
              href="https://github.com/chrstnbwnkl"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              mt: 2,
              mb: 2,
              overflow: "hidden",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
      <WelcomeDialog
        open={dialogOpen}
        onCloseClick={() => setDialogOpen(false)}
      ></WelcomeDialog>
    </>
  );
};

export default Main;
