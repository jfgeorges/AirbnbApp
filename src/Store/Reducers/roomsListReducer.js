const initialState = { rooms: [] };

const manageRoomsList = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case "UPDATE_ROOMS_LIST": {
      nextState = { ...state, rooms: action.value };
      return nextState || state;
    }
    default:
      return state;
  }
};

export default manageRoomsList;
