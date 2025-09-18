import { Stack, Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome6'
import { Image, StyleSheet, Text } from 'react-native';

export default function TabsLayout() {
    return (
        <>
            <Tabs screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarStyle: styles.tabBarStyle,
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIconStyle: styles.tabBarIconStyle

            }} >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Categorías',
                        tabBarIcon: ({ focused }) => {
                            return <Image source={require('../../assets/images/logoCategorias2-.png')} style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }, { transform: [{ scale: focused ? 1.1 : 1 }] }]} />;
                        }
                    }}
                />
                <Tabs.Screen name="GameConfig" options={{
                    title: 'Quiz',
                    tabBarIcon: ({ focused }) => {
                        return <Image source={require('../../assets/images/LogoGame-.png')} style={[styles.tabIcon, { opacity: focused ? 1 : 0.6 }, { transform: [{ scale: focused ? 1.1 : 1 }] }]} />;
                    }
                }} />
                <Tabs.Screen
                    name="GameScreen"
                    options={{
                        href: null, // Esto oculta la pestaña
                    }}
                />
                <Tabs.Screen name='ScoreBoard' options={{
                    title: 'Puntuaciones', 
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={require('../../assets/images/scoreBoardIcon.png')}
                                className={`w-10 h-10 mb-5 ${focused ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}
                            />
                        );
                    }
                }}
                />

            </Tabs>
        </>

    );
}
const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#273A57',
        height: 80,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopColor: '#334155',
    },
    tabBarLabelStyle: {
        marginBottom: 5,
        fontSize: 12,
        fontFamily: 'MontserratRegular'
    },
    tabBarIconStyle: {
        marginTop: 5,
    },
    tabIcon: {
        width: 64,
        height: 64,
        marginBottom: 20,
    }
});