import {SLICE_NAME} from '@models/generalTypes';
import {store} from '@redux/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PlacesSearchResult} from '@utilities/types';

export interface AppState {
  placesSearchResults: PlacesSearchResult[];
  loading: boolean;
}

export const initialAppState: AppState = {
  placesSearchResults: [],
  loading: false,
};
const dashboardSlice = createSlice({
  name: SLICE_NAME.DASHBOARD,
  initialState: initialAppState,
  reducers: {
    onSetSearchResult: (
      state,
      {payload}: PayloadAction<PlacesSearchResult>,
    ) => {
      state.placesSearchResults.push(payload);
    },
    onClearSearchResult: state => {
      state.placesSearchResults = [];
    },
  },
  extraReducers: builder => {},
});

export const DashboardReducer = dashboardSlice.reducer;

export const DashboardAction = {
  ...dashboardSlice.actions,
};
