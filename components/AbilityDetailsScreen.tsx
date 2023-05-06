import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Dialog, Button,Overlay } from 'react-native-elements';
import axios from 'axios';

const AbilityDetailsScreen = ({ visible, abilityUrl, toggleDialog }) => {
    const [abilityDetails, setAbilityDetails] = useState(null);

    async function getAbilityDetailsDialog(abilityUrl) {
        if (abilityUrl != ""){
            try {
                const response = await axios.get(abilityUrl);
                setAbilityDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        getAbilityDetailsDialog(abilityUrl);
    }, [abilityUrl]);

    return (
        <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
            {abilityDetails ? (
                <View style={styles.dialogContainer}>
                    <Text style={styles.dialogTitle}>{abilityDetails?.name}</Text>
                    <Text style={styles.dialogEffectTitle}>Efeito:</Text>
                    <Text style={styles.dialogText}>{abilityDetails?.effect_entries[0]?.short_effect}</Text>
                    <View style={styles.dialogSeparator}></View>
                    <Text style={styles.dialogLabel}>Pokémons com esta habilidade:</Text>
                    <ScrollView style={styles.dialogScroll}>
                        {abilityDetails?.pokemon.map((pokemon, index) => (
                            <Text key={index} style={styles.dialogPokemon}>
                                {pokemon.pokemon.name}
                            </Text>
                        ))}
                    </ScrollView>
                    <View style={styles.dialogSeparator}></View>
                    <Text style={styles.dialogEffectTitle}>Descrição:</Text>
                    <ScrollView style={styles.dialogScroll}>
                        {abilityDetails?.effect_entries.map((entry, index) => (
                            <Text key={index} style={styles.dialogText}>
                                {entry.short_effect}
                            </Text>
                        ))}
                    </ScrollView>
                    <View style={styles.dialogSeparator}></View>
                    <Text style={styles.dialogEffectTitle}>Em que gerações esta habilidade existe:</Text>
                    <ScrollView style={styles.dialogScroll}>
                        {abilityDetails?.generation?.name && <Text style={styles.dialogText}>{abilityDetails.generation.name}</Text>}
                    </ScrollView>
                    <Button buttonStyle={{backgroundColor: "red", marginTop: 20}}title="Fechar" onPress={toggleDialog} />
                </View>
            ) : (
                <View>
                    <Text>Carregando informações...</Text>
                </View>
            )}
        </Dialog>
    );

};

const styles = StyleSheet.create({
    dialogContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    dialogTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    dialogEffectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    dialogText: {
        fontSize: 16,
        marginVertical: 5,
    },
    dialogLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    dialogSeparator: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginVertical: 10,
    },
    dialogScroll: {
        maxHeight: 200,
    },
    dialogPokemon: {
        fontSize: 16,
        marginVertical: 5,
        paddingHorizontal: 10,
    },
});

export default AbilityDetailsScreen;
