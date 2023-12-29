import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ITrack } from "../api/spotify";

const Track = ({ track }: { track: ITrack }) => {
  return (
    <Card sx={{ m: 1, p: 2, maxWidth: "100%", height: "280px" }}>
      <CardActionArea
        sx={{ width: "100%", height: "100%", p: 1 }}
        href={track.track.external_urls.spotify}
        target="_blank"
      >
        <CardMedia
          component="img"
          height="150"
          image={track.track.album.images[0]?.url}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }} noWrap>
          {track.track.name}
        </Typography>
        <CardContent sx={{ p: 0 }}>
          <Typography noWrap sx={{ color: "#555" }}>
            {track.track.artists.map((a) => a.name).join(", ")}
          </Typography>
          <Typography sx={{ color: "#666" }}>
            (
            {track.track.album.release_date
              ? track.track.album.release_date.slice(0, 4)
              : "no year"}
            )
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Track;
