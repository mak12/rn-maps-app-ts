import {
  DashboardReducer,
  DashboardAction,
  initialAppState,
  AppState,
} from '../DashboardSlice';

describe('Dashboard Reducer', () => {
  describe('set places search result', () => {
    it('should set places search result', () => {
      const workLoc = {
        description: 'Work',
        geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
      };
      const expected: AppState = {
        ...initialAppState,
        placesSearchResults: [workLoc],
      };
      expect(
        DashboardReducer(
          initialAppState,
          DashboardAction.onSetSearchResult(workLoc),
        ),
      ).toEqual(expected);
    });
  });
});
