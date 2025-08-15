# OTP Input App

A simple **Expo React Native** application that provides a clean, user-friendly **One-Time Password (OTP) input interface**.  
The app allows users to enter a 6-digit code with **auto-advance** between input boxes, **cross-platform styling** (green tones with elevation for Android, blue tones with soft shadows for iOS), and **automatic submission** once all fields are filled.

## Features
- **Auto-advance**: Automatically moves to the next field when a digit is entered.
- **Cross-platform styling**:  
  - **Android** → Elevated cards with green accents.  
  - **iOS** → Blue tones with subtle box shadows.
- **Instant submission**: Code is submitted automatically when all digits are entered.
- **Backspace navigation**: Backspace moves the cursor to the previous field when empty.
- **Expo compatibility**: Easy to run and develop with Expo CLI.

## Getting Started

### Prerequisites
- **Node.js** (v18 or later recommended, but the newest version of Node has had issues with Expo, so try Node 20 if need be)
- **npm** or **yarn**
- **Expo Go** for ios or Android
- **Expo CLI** installed globally:
```bash
npm install -g expo-cli
```
### 1. Clone the Repository
```bash
git clone https://github.com/danielyj98/OTPInput.git
```
### 2. Install Dependencies
```bash
npm install
# or
yarn install
```
### 3. Start the App
```bash
npx expo start
```
This project is licensed under the MIT License.
