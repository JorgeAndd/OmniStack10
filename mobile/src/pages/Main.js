import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import DevMarker from '../components/DevMarker';

import api from '../services/api';

function Main(props) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [skills, setSkills] = useState('');
  const { navigation } = props;

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, [])

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        skills
      }
    });

    setDevs(response.data.devs);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  function onSelectDev(username) {
    navigation.navigate('Profile', { github_username: username });
  }

  if (!currentRegion) {
    return null;
  }

  const devsMarkers = devs.map(dev => (
    <DevMarker
      key={dev._id}
      data={dev}
      onPress={onSelectDev} />
  ));

  return (
    <>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search devs by skill...'
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
          value={skills}
          onChangeText={setSkills}
        />

        <TouchableOpacity onPress={() => { loadDevs() }} style={styles.loadButton}>
          <MaterialIcons name='my-location' size={25} color='#7D40E7' />
        </TouchableOpacity>
      </View>

      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion} style={styles.map}>

        {devsMarkers}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  searchForm: {
    backgroundColor: '#7D40E7',
    position: 'absolute',
    paddingHorizontal: 10,
    paddingBottom: 5,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },
  loadButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  }

});

export default Main;