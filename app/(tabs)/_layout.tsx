import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Categorías' }} />
      <Tabs.Screen name="GameScreen" options={{ title: 'Juego' }} />
    </Tabs>
  );
}
