import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

function DevMarker(props) {
  const { data } = props;

  return (
    <Marker
      key={data._id}
      coordinate={{
        longitude: data.location.coordinates[0],
        latitude: data.location.coordinates[1],
      }}>

      <Image
        style={styles.avatar}
        source={{ uri: data.avatar_url }} />

      <Callout onPress={() => { props.onPress(data.github_username) }}>
        <View style={styles.callout}>
          <Text style={styles.devName}>{data.name}</Text>
          <Text style={styles.devBio}>{data.bio}</Text>
          <Text style={styles.devSkills}>{data.skills.join(', ')}</Text>
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#7D40E7',
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  devBio: {
    color: '#666',
    marginTop: 5,
  },
  devSkills: {
    marginTop: 5,

  },
});

export default DevMarker;