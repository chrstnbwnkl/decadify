import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IPlaylist,
  ITrack,
  getAllTracks,
  getPlaylistById,
} from "../api/spotify";
import Track from "./Track";

const PlaylistTracks = () => {
  const { id } = useParams();
  const [tracks, setTracks] = useState<ITrack[]>();
  const [playlist, setPlaylist] = useState<IPlaylist>();
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  useEffect(() => {
    async function _() {
      if (!id) return setTracks(undefined);
      const allTracks = await getAllTracks(id);
      setTracks(allTracks);
    }
    _();
  }, [id]);

  useEffect(() => {
    async function _() {
      if (!id) return;
      const res = await getPlaylistById(id);
      setPlaylist(res);
    }
    _();
  }, [id]);

  const filteredTracks = useMemo(() => {
    if (!tracks) return undefined;
    if (year === "") return tracks;
    return tracks.filter((t) =>
      !t.track.album.release_date
        ? false
        : t.track.album.release_date.slice(0, 4) === year
    );
  }, [tracks, year]);

  if (!tracks)
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
          Retrieving Tracks. Hang in there...
        </Typography>
        <CircularProgress sx={{ m: 3 }} />
      </Box>
    );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        width: "90vw",
        height: "99%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          mt: 1,
          mb: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        <IconButton onClick={() => navigate("/")} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" noWrap sx={{ width: "250px" }}>
          {playlist ? playlist.name : ""}
        </Typography>
        <Box sx={{ flexGrow: 2 }}></Box>
        <FormControl size="small" sx={{ width: "250px" }}>
          <InputLabel id="year-select" sx={{ mb: 1 }}>
            Year
          </InputLabel>
          <Select
            value={year}
            labelId="year-select"
            label="Year"
            onChange={handleYearChange}
          >
            {new Array(7)
              .fill(0)
              .map((_, i) => new Date().getFullYear() - i * 10)
              .map((v) => (
                <MenuItem key={v} value={v.toString()}>
                  {v}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      {!filteredTracks || filteredTracks?.length === 0 ? (
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
            Oh noes, no tracks in this playlist from {year}.
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          sx={{ maxWidth: "95vw", overflow: "auto", maxHeight: "100%" }}
        >
          {filteredTracks.map((t) => {
            return (
              <Grid item key={t.track.id} xs={12} md={6} lg={3}>
                <Track track={t}></Track>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Card>
  );
};

export default PlaylistTracks;
