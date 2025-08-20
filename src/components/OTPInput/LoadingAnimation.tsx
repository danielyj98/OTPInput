import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { PlayfairDisplay_400Regular } from "@expo-google-fonts/playfair-display/400Regular";
import * as SplashScreen from "expo-splash-screen";

const LoadingAnimation = () => {
  const dots = [
    useRef<Animated.Value>(new Animated.Value(0)).current,
    useRef<Animated.Value>(new Animated.Value(0)).current,
    useRef<Animated.Value>(new Animated.Value(0)).current,
  ];
  const [fontsLoaded, error] = useFonts({
    Playfair: PlayfairDisplay_400Regular,
  });

  const bounce = (dot: Animated.Value) =>
    Animated.sequence([
      Animated.timing(dot, {
        toValue: -4, // bounce height
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dot, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([bounce(dots[0]), bounce(dots[1]), bounce(dots[2])])
    );
    loop.start();

    return () => loop.stop();
  }, [dots]);

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Verifying</Text>
      {dots.map((dot, i) => (
        <Animated.Text key={i} style={[styles.dot, { transform: [{ translateY: dot }] }]}>
          .
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loading: {
    fontSize: 20,
    marginRight: 2,
    fontFamily: "Playfair",
  },
  dot: {
    fontSize: 20,
    marginHorizontal: 2,
    fontFamily: "Playfair",
  },
});
export default LoadingAnimation;
