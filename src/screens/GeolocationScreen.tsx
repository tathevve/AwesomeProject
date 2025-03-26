import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import useGeolocation from '../hooks/useGeolocation';

const GeolocationScreen: React.FC = () => {
  const {location, getLocation, loading, error} = useGeolocation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geolocation</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {location ? (
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
          <Text style={styles.locationText}>
            Longitude: {location.longitude}
          </Text>
        </View>
      ) : (
        <Text style={styles.placeholder}>Your location will appear here.</Text>
      )}
      <Button
        title={loading ? 'Getting Location...' : 'Get My Location'}
        onPress={getLocation}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    alignItems: 'center',
    width: '80%',
  },
  locationText: {
    fontSize: 16,
    color: 'darkgray',
    fontWeight: 'bold',
  },
  placeholder: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default GeolocationScreen;
