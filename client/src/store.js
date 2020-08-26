import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./_reducers";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const intialState = {};
const middleware = [thunk];
let store = createStore(
  persistedReducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let persistor = persistStore(store);

export  { store, persistor };
