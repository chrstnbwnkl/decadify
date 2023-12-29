import { useEffect, useState } from "react";
import { IPlaylist, getCurrentUserPlaylists } from "../api/spotify";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Playlist from "../components/Playlist";

const SelectPlaylist = () => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>();
  useEffect(() => {
    async function _() {
      const response = await getCurrentUserPlaylists();
      // go through playlists and request tracks
      setPlaylists(response);
    }
    _();
  }, []);

  if (!playlists)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography sx={{ mt: 3 }}>
          Retrieving your playlists. Hang in there...
        </Typography>
        <CircularProgress sx={{ m: 3 }} />
      </Box>
    );

  return (
    <Grid container sx={{ width: "100%", overflow: "auto", height: "100%" }}>
      {playlists.map((p) => {
        return (
          <Grid key={p.id} xs={12} md={6} lg={3} item>
            <Playlist playlist={p}></Playlist>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SelectPlaylist;
