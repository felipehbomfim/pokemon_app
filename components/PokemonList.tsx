import React, { useState, useEffect } from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons'
Icon.loadFont();

const PokemonList = ({navigation}) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonList = async () => {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');

            const pokemonDataPromises = response.data.results.map(async (result) => {
                const pokemonDataResponse = await axios.get(result.url);
                return pokemonDataResponse.data;
            });
            const pokemonData = await Promise.all(pokemonDataPromises);

            setPokemonList(pokemonData);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        };

        fetchPokemonList();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={pokemonList}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { pokemon: item })}>
                        <ListItem bottomDivider>
                            <Avatar source={{ uri: item.sprites.front_default }} />
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <Icon name="chevron-right" size={30} />
                        </ListItem>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}/>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    divider: {
        backgroundColor: 'gray',
        height: 1,
        marginLeft: 70,
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PokemonList;
