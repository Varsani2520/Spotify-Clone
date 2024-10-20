import Link from "next/link";
import React from "react";
import MyText from "../Common/MyText";
import { IconButton } from "@mui/material";
import { PlayArrowRounded } from "@mui/icons-material";

// reuable playlist card
const PlaylistCard = ({ item }) => {
  function truncateDescription(description, maxLength) {
    const words = description.split(" ");
    return words.length > maxLength
      ? words.slice(0, maxLength).join(" ") + "..."
      : description;
  }

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div>
      <div className="playlist-items" key={item.id}>
        {item.images.length > 0 && (
          <div className="playlist-content">
            <Link href={`/playlists/${item.id}`}>
              <img
                className="playlist-image"
                src={item.images[0].url}
                alt="playlist-image"
              />
            </Link>
            <MyText
              text1={truncateDescription(item.name, 2)}
              text2={truncateDescription(item.description, 3)}
            />
            <IconButton
              aria-label="play"
              className="play-icon"
              sx={{
                position: "absolute",
                top: "50%",
                left: "78%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "green",
                display: "none",
                borderRadius: "50%",
                padding: "2px",
              }}
              size="small"
              onClick={() => playAudio(item.audioUrl)}
            >
              <PlayArrowRounded style={{ color: "white" }} fontSize="large" />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistCard;
