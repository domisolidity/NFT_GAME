const initialState = {
  updated: false,
};

const dailyMissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_REQUEST":
      return {
        updated: true,
      };
    case "OFF_REQUEST":
      return {
        updated: false,
      };

    default:
      return state;
  }
};

export default dailyMissionReducer;
