import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  Keyboard,
  AppState,
  Pressable,
} from "react-native";
import * as Clipboard from "expo-clipboard";

import styles from "./OTPInput.styles";

const OTP_LENGTH = 6;

const OTPComponent = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [clipboard, setClipBoard] = useState("");
  const [isValidClipboard, setIsValidClipboard] = useState(false);
  const inputRefs = Array.from({ length: OTP_LENGTH }, () => React.createRef<TextInput>());

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
    setIsValidClipboard(/^\d{6}$/.test(clipboard));
    setClipBoard(text);
  };

  // Auto-focus first input on mount
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
    setIsValidClipboard(/^\d{6}$/.test(clipboard));
  }, [clipboard]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Hint: Try 123456 🤫</Text>
      {isValidClipboard ? (
        <Pressable
          onPress={() => {
            setOtp(clipboard.split("")); // This is just for visuals so the user understands what's happening- the <clipboard> is already perfect for submission.
            handleSubmit(clipboard);
          }}
        >
          <Text>Paste</Text>
        </Pressable>
      ) : null}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={[styles.input, index === focusedIndex && styles.activeBox]}
            value={otp[index]}
            onChangeText={(text) => {
              const newOtp = [...otp];
              newOtp[index] = text;
              console.log(text);
              setOtp(newOtp);
            }}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            caretHidden={true}
            editable={!isLoading}
            onFocus={() => setFocusedIndex(index)}
          />
        ))}
      </View>

      <View style={styles.loadingContainer}>
        {isLoading && (
          <>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Verifying...</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default OTPComponent;
