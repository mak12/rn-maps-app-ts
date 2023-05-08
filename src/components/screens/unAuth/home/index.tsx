import React, {memo, useRef} from 'react';
import {
  Image,
  ImageStyle,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import {
  APP_SCREEN,
  HomeStackParamList,
  PlacesSearchResult,
} from '@utilities/types';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import isEqual from 'react-fast-compare';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import MapView, {MapMarker, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {PLACES_API_KEY} from '@env';
import SvgMapMarker from '@assets/images/source/svg_mapMarker.svg';
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from '@utilities/constants';
import {DashboardAction} from '@redux/reducer/DashboardSlice';
import {useTranslation} from 'react-i18next';

interface IStyles {
  container: ViewStyle;
  searchContainer: ViewStyle;
  markerFixed: ViewStyle;
  marker: ImageStyle;
}

type HomeScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  APP_SCREEN.HOME
>;
type HomeScreenNavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  APP_SCREEN.HOME
>;
const HomeScreenComp: React.FC<HomeScreenProps> = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {placesSearchResults} = useAppSelector(x => x.dashboard);
  const refMapView = useRef<MapView | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const animateCameraToPosition = (
    lat: number | undefined,
    lng: number | undefined,
    zoomLevel = 1,
  ) => {
    var curLoc = {
      latitude: lat ? lat : DEFAULT_LATITUDE,
      longitude: lng ? lng : DEFAULT_LONGITUDE,
    };
    if (refMapView && refMapView.current?.animateCamera) {
      refMapView.current.animateCamera({
        center: curLoc,
        zoom: zoomLevel,
        pitch: 0,
        heading: 0,
        altitude: 0,
      });
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder={t('dashboard:autoCompletePlaceholder')}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log('data');
            console.log(JSON.stringify(data));
            console.log('detail');
            console.log(JSON.stringify(details));
            if (details != null) {
              const {geometry, address_components, formatted_address} = details;
              if (geometry) {
                if (address_components) {
                  let searchRes: PlacesSearchResult = {
                    description: formatted_address,
                    geometry: {
                      location: {
                        lat: geometry.location.lat,
                        lng: geometry.location.lng,
                      },
                    },
                  };
                  dispatch(DashboardAction.onSetSearchResult(searchRes));
                }
                animateCameraToPosition(
                  geometry.location.lat,
                  geometry.location.lng,
                  16,
                );
              }
            }
          }}
          predefinedPlaces={
            placesSearchResults.length ? placesSearchResults : undefined
          }
          fetchDetails={true}
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'formatted_address,geometry,plus_code,address_component',
          }}
          query={{
            key: PLACES_API_KEY,
            language: 'en',
          }}
        />
      </SafeAreaView>
      <MapView
        ref={refMapView}
        style={StyleSheet.absoluteFillObject}
        showsIndoors={false}
        showsIndoorLevelPicker={false}
        provider={'google'}
        initialRegion={{
          latitude: DEFAULT_LATITUDE,
          longitude: DEFAULT_LONGITUDE,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={styles.markerFixed}>
        <SvgMapMarker width={30} height={30} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    zIndex: 99,
    marginHorizontal: 20,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
});
export const HomeScreen = memo(HomeScreenComp, isEqual);
