import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main(props) {
    const [currentRegion, setCurrentRegion] = useState(null);
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

    if (!currentRegion) {
        return null;
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -15.7541464, longitude: -47.9001824 }}>
                <Image style={styles.avatar} source={{ uri: "https://avatars1.githubusercontent.com/u/5915194?s=460&v=4" }} />

                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: 'JorgeAndd' });
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Jorge Andrade</Text>
                        <Text style={styles.devBio}>Mauris et turpis facilisis, blandit augue scelerisque, consequat felis. In quis auctor dolor.</Text>
                        <Text style={styles.devSkills}>C#, Javascript, React</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
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

    }

});

export default Main;