// actions.js

import { addTrack } from "../reducer/currentTrackReducer";

export const addToTracks = (track) => ({
  type: addTrack, // Ensure that the action type constant is imported and correctly spelled
  payload: track,
});
