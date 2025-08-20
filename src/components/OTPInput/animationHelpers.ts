import { Animated } from "react-native";

export const jiggleInput = (anim: Animated.Value) => {
  Animated.sequence([
    Animated.timing(anim, {
      toValue: 1.15,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(anim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start();
};
