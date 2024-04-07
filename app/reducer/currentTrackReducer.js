// reducers.js

const initialState = {
  currentTrack: null,
  status: "pending",
};
export const addTrack = "addToTrack";
export const TrackCurrentReducer = (state = initialState, action) => {
  switch (action.type) {
    case addTrack:
      return {
        ...state,
        currentTrack: action.payload,
        status: "success",
      };
    // other cases
    default:
      return state;
  }
};

export default TrackCurrentReducer;
