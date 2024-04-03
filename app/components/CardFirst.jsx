import React from 'react'
import style from '../style.css'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
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

            <HomeIcon sx={{ marginRight: '8px' }} />
            <span>Home</span>
          </li>
          <li className='tab search'>
            <SearchIcon sx={{ marginRight: '8px', cursour: 'pointer' }} />
            <span style={{ color: "gray" }}>Search</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CardFirst
