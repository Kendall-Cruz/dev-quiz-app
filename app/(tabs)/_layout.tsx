import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome6'

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'white',
            tabBarActiveBackgroundColor: '#2A405E',
            
            tabBarStyle: {
                backgroundColor: '#273A57',
                height: 80,
                paddingBottom: 10,
                paddingTop: 10,

                
            },
            tabBarLabelStyle: {
                marginBottom: 5, 
                fontSize: 12,
            },
            tabBarIconStyle: {
                marginTop: 5,
            }

        }} >
            <Tabs.Screen name="index" options={{ title: 'Categorías', tabBarIcon: ({ color }) => { return <FontAwesome size={24} name='code' color='white' /> } }} />
            <Tabs.Screen name="GameScreen" options={{ title: 'Juego', tabBarIcon: ({ color }) => { return <FontAwesome size={24} name='gamepad' color='white' /> } }} />
        </Tabs>
    );
}
