import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const PokemonDetailsScreen = ({ route }) => {
    const { pokemon } = route.params;

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: pokemon.sprites.front_default }} />
                <Text style={styles.name}>{pokemon.name}</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.info}>
                        <Text style={styles.infoLabel}>Altura:</Text>
                        <Text style={styles.infoValue}>{pokemon.height}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoLabel}>Peso:</Text>
                        <Text style={styles.infoValue}>{pokemon.weight}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoLabel}>Habilidades:</Text>
                        <View style={styles.abilitiesContainer}>
                            {pokemon.abilities.map((ability, index) => (
                                <Text key={index} style={styles.ability}>{ability.ability.name}</Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.infoLabel}>Tipos:</Text>
                        <View style={styles.typesContainer}>
                            {pokemon.types.map((type, index) => (
                                <Text key={index}>{type.type.name}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 20
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20
    },
    infoContainer: {
        width: '90%'
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666'
    },
    abilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
    },
    ability: {
        backgroundColor: '#DDD',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 3,
        fontSize: 14,
        fontWeight: 'bold'
    },
    typesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
    },
    type: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius:
            20,
        marginHorizontal: 5,
        marginVertical: 3,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF'
    }
});

export default PokemonDetailsScreen;