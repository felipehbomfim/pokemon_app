import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Button, Dialog } from 'react-native-elements';
import AbilityDetailsScreen from'./AbilityDetailsScreen';

const PokemonDetailsScreen = ({ route }) => {
    const { pokemon } = route.params;
    const [visible, setVisible] = useState(false);
    const [selectedAbilityUrl, setSelectedAbilityUrl] = useState('');

    const toggleStuffs = (url ) => {
        setSelectedAbilityUrl(url)
        toggleDialog();
    };

    const toggleDialog = (url ) => {
        setVisible(!visible);
    };

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
                                <Button style={styles.ability} key={index} title={ability.ability.name} onPress={() => toggleStuffs(ability.ability.url)}/>
                                // <Text key={index} style={styles.ability}>{ability.ability.name}</Text>
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
            <AbilityDetailsScreen
                visible={visible}
                abilityUrl={selectedAbilityUrl}
                toggleDialog={toggleDialog}
                ></AbilityDetailsScreen>
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
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 20,
        marginHorizontal: 2,
        marginVertical: 2,
        fontSize: 10,
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