import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";

const OTP_LENGTH = 6;

const OTPComponent = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Create TypeScript-safe refs
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
        Alert.alert("Success", "OTP verified successfully!");
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

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    const key = e.nativeEvent.key;
    const newOtp = [...otp];

    if (/\d/.test(key)) {
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
  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Hint: Try 123456 🤫</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={[styles.input, index === focusedIndex && styles.activeBox]}
            value={otp[index]} // controlled value always from state
            onChangeText={(text) => {
              const newOtp = [...otp];
              newOtp[index] = text;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "500",
    backgroundColor: "#f9f9f9",
  },
  activeBox: {
    borderColor: "#007AFF",
    backgroundColor: "#e6f0ff",
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
    height: 60, // reserve space to prevent layout shift
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
});
