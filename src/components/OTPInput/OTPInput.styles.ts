import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  pasteButtonContainer: {
    fontSize: 16,
    marginTop: 20,
    height: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    position: "relative",
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 28,
    fontWeight: "500",
    backgroundColor: "#f9f9f9",
  },
  activeBox: {
    borderColor: Platform.select({ ios: "#007AFF", android: "#28a745" }),
    backgroundColor: Platform.select({ ios: "#e6f0ff", android: "#e6ffe6" }),
    ...Platform.select({
      ios: {
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
    height: 60,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
});
