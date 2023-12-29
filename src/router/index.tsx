import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../views/Home";
import PlaylistTracks from "../components/PlaylistTracks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "playlists/:id",
        element: <PlaylistTracks />,
      },
    ],
  },
]);

export default router;
