import React from 'react'
import style from '../style.css'
const CardFirst = () => {
  return (
    <div className="card">
              <div className="tabs">
                <ul>
                  <li className="tab">
                    <img
                      src="https://e1.pngegg.com/pngimages/532/220/png-clipart-spotify-for-macos-spotify-logo.png"
                      alt="spotify_icon"
                      className="spotify-logo"
                    />
                    <span>Spotify</span>
                  </li>
                  <li className="tab home">
                    <img
                      src="https://img.icons8.com/material-outlined/24/ffffff/home--v1.png"
                      alt="home_icon"
                      style={{ marginRight: "8px" }} // Apply space between Home label and image
                    />
                    <span>Home</span>
                  </li>
                  <li>
                    <img
                      src="https://img.icons8.com/material-outlined/24/ffffff/search--v1.png"
                      alt="search_icon"
                      style={{ marginRight: "8px" }} // Apply space between Search label and image
                    />
                    <span style={{ color: "gray" }}>Search</span>
                  </li>
                </ul>
              </div>
            </div>
  )
}

export default CardFirst
