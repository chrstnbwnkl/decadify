import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthProvider from "./providers/AuthProvider";
import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
