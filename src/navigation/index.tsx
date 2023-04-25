import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {UnAuthentication} from './unAuthentication';

const AppNavigation: React.FC = () => {
  return (
    <>
      <NavigationContainer>
        <UnAuthentication />
      </NavigationContainer>
    </>
  );
};
export default AppNavigation;
