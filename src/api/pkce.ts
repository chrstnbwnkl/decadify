/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code with PKCE oAuth2 flow to authenticate
 * against the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
 */

const clientId = "ea64efce6fb44f5e9a9663cca5af211c" as const;
const redirectUrl = "http://localhost:3005";

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = "user-read-private user-read-email playlist-read-private";

interface SpotifyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
// Data structure that manages the current active token, caching it in localStorage
export const currentToken = {
  get access_token(): string | null {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token(): string | null {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in(): number | null {
    return localStorage.getItem("expires_in")
      ? Number(localStorage.getItem("expires_in"))
      : null;
  },
  get expires(): Date | null {
    const value = localStorage.getItem("expires");
    if (value === null) return value;
    return new Date(value);
  },

  save: function (response: SpotifyTokenResponse) {
    const { access_token, refresh_token, expires_in } = response;
    if (!access_token) return;
    console.log(response);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in?.toString());

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry.toString());
  },
  isExpired: function () {
    if (!this.expires) return false;
    return this.expires < new Date();
  },
};

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get("code");

// If we find a code, we're in a callback, do a token exchange
export async function authenticate() {
  if (currentToken.access_token && !currentToken.isExpired()) {
    const userData = await getUserData();
    return userData;
  }
  if (code) {
    // we request a token and save it
    const token = await getToken(code);
    currentToken.save(token);

    // Remove code from URL so we can refresh correctly.
    const url = new URL(window.location.href);
    url.searchParams.delete("code");

    const updatedUrl = url.search ? url.href : url.href.replace("?", "");
    window.history.replaceState({}, document.title, updatedUrl);

    // ...and finally return the user data
    const userData = await getUserData();
    return userData;
  } else {
    return undefined;
  }
}

async function redirectToSpotifyAuthorize() {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
async function getToken(code: string) {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl as string,
      code_verifier: code_verifier as string,
    }),
  });

  return await response.json();
}

export async function refreshToken() {
  if (!currentToken.refresh_token) return;
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: currentToken.refresh_token as string,
    }),
  });

  return await response.json();
}

async function getUserData() {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  return await response.json();
}

// Click handlers
export async function loginWithSpotifyClick() {
  await redirectToSpotifyAuthorize();
}

export async function logoutClick() {
  localStorage.clear();
  window.location.href = redirectUrl;
}
