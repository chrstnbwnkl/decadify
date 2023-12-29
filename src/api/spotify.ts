import { currentToken } from "./pkce";

export interface ICurrentUserPlaylists {
  href: string;
  limit: string;
  next: string;
  total: number;
  items: IPlaylist[];
}

export interface ITracks {
  href: string;
  limit: number;
  next: string;
  items: ITrack[];
}

export interface IPlaylist {
  id: string;
  name: string;
  tracks: { href: string; total: number };
  images: { url: string }[];
  owner: {
    display_name: string;
  };
}

export interface ITrack {
  track: {
    id: string;
    external_urls: {
      spotify: string;
    };
    artists: {
      id: string;
      name: string;
    }[];
    album: {
      id: string;
      release_date: string;
      images: { url: string }[];
    };
    name: string;
  };
}

const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1";
export async function getCurrentUserPlaylists(
  limit = 50
): Promise<IPlaylist[]> {
  let nextRequestUrl = `${SPOTIFY_ENDPOINT}/me/playlists?limit=${limit}`;
  const allPlaylists = [];
  do {
    const res = await fetch(nextRequestUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken.access_token}`,
      },
    });

    const playlists: ICurrentUserPlaylists = await res.json();
    nextRequestUrl = playlists.next;
    allPlaylists.push(...playlists.items);
  } while (nextRequestUrl);

  return allPlaylists;
}

export async function getPlaylistById(id: string): Promise<IPlaylist> {
  const res = await fetch(`${SPOTIFY_ENDPOINT}/playlists/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${currentToken.access_token}`,
    },
  });
  return res.json();
}

export async function getAllTracks(playlistId: string) {
  let nextRequestUrl = `${SPOTIFY_ENDPOINT}/playlists/${playlistId}/tracks?limit=50`;
  const allTracks = [];
  do {
    const res = await fetch(nextRequestUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentToken.access_token}`,
      },
    });
    const track: ITracks = await res.json();
    nextRequestUrl = track.next;
    if (!track.items) continue;
    allTracks.push(...track.items);
  } while (nextRequestUrl);

  return allTracks;
}
