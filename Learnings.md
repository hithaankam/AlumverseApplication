# Alumni Platform Project - Frontend Learnings

## 1. Choosing the Frontend Framework: Expo

- Initially started with React Native CLI and raw setup but faced complexity and setup issues.
- Switched to **Expo** because it provides:
  - Easier setup and project initialization.
  - Cross-platform compatibility out of the box (iOS, Android, web support).
  - Faster development cycle with features like hot reloading and an easy-to-use development environment.
- Commands used to start Expo project:
  - `npx create-expo-app frontend --template` — to create a new Expo app with templates.
  - `npx expo start` — to launch the local development server and open Expo Dev Tools.

## 2. Project Architecture & Design

- Built with **React Native**, **Expo**, and **TypeScript** for strong typing and better developer experience.
- UI structured with reusable, modular components:
  - **Post.tsx**: Represents a single post with UI and logic to handle likes.
  - **feed.tsx**: Fetches the list of posts from backend and renders them dynamically.
- Centralized API interactions into one service file:
  - **AlumService.ts** handles all HTTP requests to the backend, keeping remote calls organized and decoupled from UI components.

## 3. Installing and Configuring Dependencies

- Installed navigation and UI-support libraries for smooth app navigation and better UI:
  - `@react-navigation/native`
  - `@react-navigation/stack`
  - `react-native-screens`
  - `react-native-safe-area-context`

## 4. Key Learnings & Solutions

- **Data Field Mismatch: `id` vs `_id`**
  - Backend MongoDB documents use `_id` as the unique identifier.
  - Frontend code initially assumed `id`.
  - Fixed by updating frontend interfaces and key extractors to consistently use `_id`, avoiding display and rendering issues.

- **State Management Improvements**
  - Added states such as `isLoading`, `error`, and `refreshing` in components to:
    - Show loading spinners during data fetch.
    - Handle and display error states gracefully.
    - Support pull-to-refresh or similar UX features.

- **Using `useEffect` Hook**
  - Employed `useEffect` to fetch data from backend API when components mount.
  - Ensures the feed is populated dynamically and stays up to date on rendering.

- **Optimistic UI Updates**
  - Implemented `handleLike` to update UI immediately on user interaction to provide instant feedback.
  - If the API call to backend fails, reverted the UI change, maintaining consistency with server state.

## 5. Debugging Tools Used
(ctrl + shift + I) -> Network
- **Browser Console**
  - Inspected errors or warnings in frontend code logic and API response handling.

- **Network Tab (Developer Tools)**
  - Monitored HTTP requests, response codes, headers, and payload.
  - Crucial for spotting API errors like 403 Forbidden or 500 Internal Server Errors and troubleshooting connectivity issues.

## 6. Challenges and Future Directions

- Transitioning from raw React Native CLI setup to Expo simplified development but required relearning some configuration nuances.
- Next steps include:
  - Adding **Spring Boot authentication** on the backend for secure user access.
  - Designing and implementing a **user dashboard** for better user experience and platform capabilities.