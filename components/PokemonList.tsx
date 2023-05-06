import React, { useState, useEffect } from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListItem, Divider, SearchBar } from '@rneui/themed';

Icon.loadFont();

const PokemonList = ({navigation}) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    async function fetchAllPokemons() {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
            const results = response.data.results;
            const pokemonData = await Promise.all(
                results.map(async (result) => {
                    const response = await axios.get(result.url);
                    return response.data;
                })
            );
            setPokemonList(pokemonData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAllPokemons()
    }, []);

    if (isLoading) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    const handleSearch = () => {
        if(searchQuery != ""){
            setIsLoading(true);
            axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`).then(res => {
                setPokemonList([res.data]);
                setIsLoading(false);
            }).catch(err => {
                setPokemonList([]);
                setIsLoading(false);
            });
        }else{
            fetchAllPokemons()
        }
    }

    function clearSearchText() {
        setSearchText('');
    }

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search..."
                onChangeText={value => setSearchQuery(value)}
                value={searchQuery}
                onSubmitEditing={handleSearch}
                platform="ios"
                cancelButtonTitle="Cancelar"
                searchIcon={{ color: '#007aff' }}
                cancelIcon={{ color: '#007aff' }}
                containerStyle={{ backgroundColor: 'white' }}
                inputContainerStyle={{ backgroundColor: '#e6e6ea' }}
                inputStyle={{ fontSize: 16 }}
                onClear={clearSearchText}
                searchIcon={
                    <Icon
                        name="search"
                        size={24}
                        color="#517fa4"
                    />
                }
                clearIcon={
                    <Icon
                        name="clear"
                        size={24}
                        color="#517fa4"
                    />
                }
            />
            {
                pokemonList.length > 0 ? (
                    <FlatList
                        data={pokemonList}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { pokemon: item })}>
                                <ListItem >
                                    <Avatar source={{ uri: item.sprites.front_default }} />
                                    <ListItem.Content>
                                        <ListItem.Title>{item.name}</ListItem.Title>
                                    </ListItem.Content>
                                    <Icon name="chevron-right" size={30} />
                                </ListItem>
                                <Divider />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}/>
                ) : (
                    <Text style={{ textAlign: 'center', marginTop: 50 }}>Nenhum resultado encontrado.</Text>
                )
            }

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
