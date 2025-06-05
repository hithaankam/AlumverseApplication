
#  Alumverse Frontend

A cross-platform mobile frontend built using **React Native with Expo**, designed for seamless alumni interaction. This project is part of a full-stack app inspired by a modern social media-style architecture using Supabase for backend authentication and data handling.

---

Getting Started

### Step 1: Project Setup with Expo

Using Expo for React Native development to ensure rapid cross-platform compatibility and easier development workflow.

```bash
npx create-expo-app frontend
cd frontend
npx expo start
````

> 🔹 Use **`a`** to open Android emulator (requires Android Studio).
> 🔹 Use **`w`** to run in browser (faster but limited features).

### Helpful Commands

* `npm run reset-project` – Resets the project to initial state (based on `App.js` default template).
* `npx expo-doctor` – Checks for incompatible or outdated dependencies.

---

## ⚙️ Libraries & Dependencies

### Core Navigation

```bash
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
```

### UI & Animation

```bash
npx expo install expo-linear-gradient
```

Used for card-flipping animation and gradient effects.

>  Styling references were sourced from online UI/UX design resources to create modern-looking screens.



## Screens Implemented

* Login Page (with validation and styled input)
* Home Page
* Card Flip UI using `expo-linear-gradient`
* Error handling and state management using React Hooks (`useState`, `useEffect`)


