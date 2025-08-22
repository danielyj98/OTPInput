import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import OTPInput from "./src/components/OTPInput/OTPInput";

export default function App() {
  return (
    <LinearGradient
      colors={["#ffffffff", "#ff9865ff"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <OTPInput />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
