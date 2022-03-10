const initialState = {
  loading: false,
  allLips: [],
  mintingTier: [
    { grade: "purple", price: 1 },
    {
      grade: "green",
      price: 0.7,
    },
    {
      grade: "red",
      price: 0.5,
    },
  ],
  allOwnerLips: [],
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        allLips: action.payload.allLips,
        allOwnerLips: action.payload.allOwnerLips,
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
