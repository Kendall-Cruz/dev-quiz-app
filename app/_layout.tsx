import { Slot, Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css"
import { SessionProvider } from '@/context/SessionContext';


export default function RootLayout() {
   return (
      <SessionProvider>
         <Slot />
      </SessionProvider>
   );
}
