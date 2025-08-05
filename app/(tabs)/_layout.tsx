import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome6'

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#01131c'
            
        }} >
            <Tabs.Screen name="index" options={{ title: 'Categorías', tabBarIcon: ({ color }) => { return <FontAwesome size={24} name='code' color='black' /> } }} />
            <Tabs.Screen name="GameScreen" options={{ title: 'Juego' , tabBarIcon: ({ color }) => { return <FontAwesome size={24} name='gamepad' color='black' /> }}} />
        </Tabs>
    );
}
