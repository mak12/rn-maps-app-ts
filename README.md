# rn-maps-app-ts

Maps and Places AutoComplete app build with TS

# setup

Instal node modules using either yarn or npm

`npm i`

install pods using

` cd ios; pod install; cd ..`

or for m1 processors

` cd ios; arch -x86_64 pod install; cd ..`

Get your [Google Places API Key](https://developers.google.com/maps/documentation/places/web-service/get-api-key/).

- Create a `.env` file at the root of directory and add below line and replace with your key, you got from above step.

`PLACES_API_KEY = "Replace with Your Key here"`

# Android Setup for maps

Get your [Google Maps Android SDK API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key).

- Goto manifest file of android and replace "Your_Google_maps_API_Key_Here" with you android maps sdk key.

# ios Setup for maps

Get your [Google Maps ios SDK API Key](https://developers.google.com/maps/documentation/ios-sdk/get-api-key).

- Goto AppDelegate.mm file of ios project and replace "Your_Google_maps_API_Key_Here" with you ios maps sdk key.

# running

For android run

`npx react-native run-android`

or for ios

`npx react-native run-ios`

for Test

`yarn test`

#TODO's

- general improvements
- test cases underway
