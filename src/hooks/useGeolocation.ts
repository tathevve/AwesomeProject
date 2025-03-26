import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    } else {
      const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
    }
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {return true;}
      if (status === RESULTS.DENIED) {
        const alwaysStatus = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        return (
          alwaysStatus === RESULTS.GRANTED || alwaysStatus === RESULTS.LIMITED
        );
      }
      Alert.alert(
        'Permission Denied',
        'Please enable location access in settings.',
      );
      return false;
    }
  };

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    let hasPermission = await checkPermission();
    if (!hasPermission) {
      hasPermission = await requestPermission();
      if (!hasPermission) {
        setLoading(false);
        setError(
          'Permission denied. Please enable location access in settings.',
        );
        return;
      }
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      error => {
        setError(`Error getting location: ${error.message}`);
        setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return {location, getLocation, loading, error};
};

export default useGeolocation;
