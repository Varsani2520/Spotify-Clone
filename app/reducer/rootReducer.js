import { combineReducers } from "redux";
import TrackCurrentReducer from "./currentTrackReducer";


export const rootReducer = combineReducers({
 selectedTrack:TrackCurrentReducer,
});