import { Slot, Stack } from 'expo-router';
import 'react-native-reanimated';
import "../global.css"
import { SessionProvider } from '@/context/SessionContext';
import { PaperProvider } from 'react-native-paper';


export default function RootLayout() {
   return (
      <SessionProvider>
         <PaperProvider>
            <Slot />
         </PaperProvider>
      </SessionProvider>
   );
}
