import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import SelectPlaylist from "./SelectPlaylist";

const Home: FC = () => {
  return (
    <Card
      sx={{
        width: "90vw",
        overflow: "hidden",
        height: "99%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ p: 2, alignSelf: "start" }}>
        Your Playlists{" "}
      </Typography>
      <Typography sx={{ pl: 2, color: "#555" }}>
        Click on a playlist to start filtering by year.
      </Typography>
      <CardContent sx={{ overflow: "hidden", height: "100%" }}>
        <SelectPlaylist />
      </CardContent>
    </Card>
  );
};

export default Home;
