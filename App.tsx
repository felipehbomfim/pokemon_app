import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetailsScreen';
import { Button } from 'react-native-elements';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('Pokemons');
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginTop: 10 }}>Bem-vindo ao meu app</Text>
            <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 30 }}>Nesse aplicativo, foi utilizado a API: https://pokeapi.co/</Text>
            <Button
                title="Ver Pokemons"
                buttonStyle={{ backgroundColor: '#007AFF', borderRadius: 10 }}
                onPress={handlePress}
                titleStyle={{ fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}
            />
        </View>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Pokemons" component={PokemonList} />
                <Stack.Screen name="Detalhes" component={PokemonDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 50,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default App;
