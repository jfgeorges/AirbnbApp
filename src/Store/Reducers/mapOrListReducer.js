const initialState = { mapOrList: "list" };

const toggleMapOrList = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case "TOGGLE_MAP_OR_LIST": {
      nextState = { ...state, mapOrList: state.mapOrList === "map" ? "list" : "map" };
      return nextState || state;
    }
    default:
      return state;
  }
};

export default toggleMapOrList;
