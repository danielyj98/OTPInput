import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import OTPInput from './src/components/OTPInput/OTPInput';

export default function App() {
  return (
    <View style={styles.container}>
      <OTPInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
