// Mock verification
export const mockOTPVerification = async (
  otp: string
): Promise<{ success: boolean; message: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock logic: accept specific codes or simple validation
  const validCodes = ["123456", "000000", "111111"];
  const isValid = validCodes.includes(otp) || otp === "123456";

  console.log({
    success: isValid,
    message: isValid ? "OTP verified successfully!" : "Invalid OTP. Try 123456",
  });

  return {
    success: isValid,
    message: isValid ? "OTP verified successfully!" : "Invalid OTP. Try 123456",
  };
};
