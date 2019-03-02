import { createStore } from "redux";
// import manageRoomsList from "./Reducers/roomsListReducer";
import toggleMapOrList from "./Reducers/mapOrListReducer";

export default createStore(toggleMapOrList);
