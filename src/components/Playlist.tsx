import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { IPlaylist } from "../api/spotify";
import { useNavigate } from "react-router-dom";

const Playlist = ({ playlist }: { playlist: IPlaylist }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ m: 1, p: 2, height: "240px" }}>
      <CardActionArea onClick={() => navigate(`/playlists/${playlist.id}`)}>
        <CardMedia
          component="img"
          height="150"
          image={playlist.images[0]?.url}
        />
        <Typography variant="h6" noWrap sx={{ mt: 1, fontWeight: "bold" }}>
          {playlist.name === "" ? "\u00A0" : playlist.name}
        </Typography>
        <Typography sx={{ color: "#666" }}>
          {playlist.owner.display_name ? `${playlist.owner.display_name}` : ""}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default Playlist;
