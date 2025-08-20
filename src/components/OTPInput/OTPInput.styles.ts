import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    borderColor: "rgba(255, 255, 255, 0.5)", // soft subtle border
    borderRadius: 12,
    fontSize: 28,
    fontWeight: "500",
    backgroundColor: "rgba(255, 220, 210, 1)", // tinted to match gradient
    color: "#6B4226", // readable text
    textAlign: "center",
  },
  activeBox: {
    borderColor: "rgba(255, 120, 90, 1)", // strong, warm contrast
    backgroundColor: "rgba(255, 230, 220, 0.95)",
    shadowColor: "rgba(255, 120, 90, 0.4)", // subtle aura
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, // tighter, softer glow
    shadowRadius: 6, // small radius for tight aura
    elevation: 6,
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
  pasteText: {
    color: "#666",
    fontSize: 16,
  },
});
