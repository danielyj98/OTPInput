import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Keyboard,
  AppState,
  Pressable,
  Platform,
  Animated,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { PlayfairDisplay_400Regular } from "@expo-google-fonts/playfair-display/400Regular";
import LoadingAnimation from "./LoadingAnimation";
import ConfettiCannon from "react-native-confetti-cannon";

import { jiggleInput } from "./animationHelpers";
import styles from "./OTPInput.styles";

const OTP_LENGTH = 6;

const OTPComponent = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [clipboard, setClipBoard] = useState("");
  const [isValidClipboard, setIsValidClipboard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fontsLoaded, error] = useFonts({
    Playfair: PlayfairDisplay_400Regular,
  });

  const inputRefs = Array.from({ length: OTP_LENGTH }, () => React.createRef<TextInput>());
  const inputScales = useRef(
    Array.from({ length: OTP_LENGTH }, () => new Animated.Value(1))
  ).current;

  // Mock verification function
  const verifyOTP = async (otpCode: string) => {
    await new Promise((res) => setTimeout(res, 1500));
    return otpCode === "123456";
  };

  const resetOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
    setFocusedIndex(0);
    inputRefs[0].current?.focus();
  };

  const handleSubmit = async (otpCode: string) => {
    setIsLoading(true);
    Keyboard.dismiss();

    try {
      const isValid = await verifyOTP(otpCode);
      if (isValid) {
        Alert.alert("Success", "Neon to the moon! 🚀");
        setShowConfetti(true); // trigger confetti
        setTimeout(() => setShowConfetti(false), 3000); // auto-remove after 3s
        resetOtp();
      } else {
        Alert.alert("Error", "Invalid OTP. Try again.");
        resetOtp();
      }
    } catch {
      Alert.alert("Error", "Something went wrong. Try again.");
      resetOtp();
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    const key = e.nativeEvent.key;
    const newOtp = [...otp];

    // Regex expression that only allows single digits in the form of strings
    if (/^\d$/.test(key)) {
      // Insert or overwrite digit
      newOtp[index] = key;
      setOtp(newOtp);

      // Auto-advance
      if (index < OTP_LENGTH - 1) {
        inputRefs[index + 1].current?.focus();
      }

      // Auto-submit if all boxes are filled
      if (newOtp.every((c) => c !== "")) {
        handleSubmit(newOtp.join(""));
      }
    } else if (key === "Backspace") {
      if (newOtp[index] !== "") {
        // Clear current box
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move back and clear previous box
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const getClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setClipBoard(text);
  };

  const submitClipboard = () => {
    setOtp(clipboard.split("")); // This is just for visuals so the user understands what's happening- the <clipboard> is already perfect for submission.
    handleSubmit(clipboard);
  };

  // iOS has an auto-paste feature that will negate the paste button barring any issues with auto-paste appearing
  const iosPaste = () => {
    if (clipboard.length) {
      if (/^\d{6}$/.test(clipboard)) submitClipboard();
      else Alert.alert("Could not paste clipboard", "Please paste a 6-digit code");
    }
    Clipboard.setStringAsync("");
  };

  // Auto-focus first input and listen for clipboard changes when user re-enters app
  useEffect(() => {
    inputRefs[0].current?.focus();
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        getClipboard();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      iosPaste();
    }
    if (Platform.OS === "android") {
      setIsValidClipboard(/^\d{6}$/.test(clipboard));
    }
  }, [clipboard]);

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
      <Text style={[styles.title, { fontFamily: "Playfair" }]}>Enter OTP</Text>
      <Text style={[styles.subtitle, { fontFamily: "Playfair" }]}>Hint: Try 123456 🤫</Text>
      <View style={[styles.otpContainer]}>
        {otp.map((digit, index) => (
          <Animated.View style={{ transform: [{ scale: inputScales[index] }] }} key={index}>
            <TextInput
              ref={inputRefs[index]}
              style={[
                styles.input,
                { fontFamily: "Playfair" },
                index === focusedIndex && styles.activeBox,
              ]}
              value={otp[index]}
              onChangeText={(text) => {
                const newOtp = [...otp];
                newOtp[index] = text;
                setOtp(newOtp);
              }}
              onKeyPress={(e) => {
                handleKeyPress(e, index);
                jiggleInput(inputScales[index]);
              }}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              caretHidden={true}
              editable={!isLoading}
              onFocus={() => {
                setFocusedIndex(index);
              }}
              contextMenuHidden={true}
              textContentType="oneTimeCode"
            />
          </Animated.View>
        ))}
      </View>
      <View style={styles.pasteButtonContainer}>
        {isValidClipboard ? (
          <Pressable
            onPress={() => {
              setOtp(clipboard.split("")); // This is just for visuals so the user understands what's happening- the <clipboard> is already perfect for submission
              handleSubmit(clipboard);
              Clipboard.setStringAsync("");
            }}
            disabled={!clipboard.length}
          >
            <Text
              style={{
                color: !clipboard.length
                  ? "#EBEBE4"
                  : Platform.select({ ios: "#007AFF", android: "#28a745" }),
              }}
            >
              Paste from clipboard
            </Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.loadingContainer}>{isLoading && <LoadingAnimation />}</View>
      {showConfetti && (
        <ConfettiCannon count={50} origin={{ x: 0, y: 0 }} fadeOut={true} fallSpeed={3000} />
      )}
    </View>
  );
};

export default OTPComponent;
