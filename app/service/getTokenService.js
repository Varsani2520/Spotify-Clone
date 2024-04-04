export async function getAccessToken() {
  var authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=22777105ec8949f59b900e7dc9f6073c&client_secret=372948613cb241cdbacc3ecf6a72803c`,}

  return fetch("https://accounts.spotify.com/api/token", authParameters)
    .then((res) => res.json())
    .then((res) => {
     const check= localStorage.setItem("access_token", res.access_token);
     console.log(check)
      return res.access_token; // Return the access token
    })
    .catch((err) => {
      console.error("errro in tokn",err);
      throw new Error("Error fetching access token");
    });
}
