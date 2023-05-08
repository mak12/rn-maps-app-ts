import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import {DashboardReducer} from './DashboardSlice';

// combining all reducers to persist them

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['dashboard'],
  version: 1,
};
const appReducer = combineReducers({
  dashboard: DashboardReducer,
});

//we can handle globally for logout etc actions but will skip in case we want users data to remain there in case of prepopulated email password for relogin
// const rootReducer: Reducer = (state: RootState, actions: AnyAction) => {
//   // To handle any global action such as logout etc
//   if (actions.type === APP_ACTIONS.LOGOUT) {
//     state = {} as RootState;
//   }
//   return appReducer(state, actions);
// };

const persistedReducer = persistReducer(persistConfig, appReducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appReducer>;

export default persistedReducer;
