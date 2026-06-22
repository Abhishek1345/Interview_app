import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";
const persistConfig = {
    key: "root",
    storage,
  };
const userSlice=createSlice({
    name:"user",
    initialState:{data:null},
    reducers:{
        login:(state,action)=>{
            state.data={...action.payload}},
        logout:(state)=>{state.data=null}
    }
})
const rootReducer = combineReducers({
    user: userSlice.reducer,
  });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const {login,logout}=userSlice.actions;
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], 
          },
        }),
  });
  
  export const persistor = persistStore(store);
export default store;