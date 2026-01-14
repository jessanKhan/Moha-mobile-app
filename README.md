```zsh
      ___           ___           ___           ___     
     /  /\         /  /\         /  /\         /  /\    
    /  /::|       /  /::\       /  /:/        /  /::\   
   /  /:|:|      /  /:/\:\     /  /:/        /  /:/\:\  
  /  /:/|:|__   /  /:/  \:\   /  /::\ ___   /  /::\ \:\ 
 /__/:/_|::::\ /__/:/ \__\:\ /__/:/\:\  /\ /__/:/\:\_\:\
 \__\/  /~~/:/ \  \:\ /  /:/ \__\/  \:\/:/ \__\/  \:\/:/
       /  /:/   \  \:\  /:/       \__\::/       \__\::/ 
      /  /:/     \  \:\/:/        /  /:/        /  /:/  
     /__/:/       \  \::/        /__/:/        /__/:/   
     \__\/         \__\/         \__\/         \__\/    

```
# Anti-Human Trafficking Information & Support Mobile Application (IOM – MOHA)

## Project Summary
This project delivers a **secure, bilingual (Bangla/English), mobile-first application** that serves as the official mobile extension of Bangladesh’s national anti-human trafficking platform under the **International Organization for Migration (IOM)** and the **Ministry of Home Affairs (MOHA)**. The app is designed to **prevent, detect, and respond to human trafficking** by providing citizens, potential victims, survivors, and stakeholders with immediate access to trusted information, emergency support, and secure reporting tools—especially in **low-connectivity and rural environments**.

At its core, the application centralizes **awareness, prevention, reporting, and response** into a single, easy-to-use mobile experience. Public users can anonymously submit incident reports, access emergency hotlines with one tap, explore policies and laws, learn about human trafficking, and find prevention guidance and success stories.

## Core Modules
The application is composed of several key modules implemented using reusable components:
- **Home:** Dashboard with quick access to vital features.
- **Report Form:** Secure submission of incident reports (anonymous or identified).
- **Data & Statistics:** Visualized data on trafficking trends.
- **Policies & Laws:** Access to legal frameworks and policies.
- **Emergency Contacts:** One-tap access to help hotlines.
- **News & Media:** Latest updates and media content.
- **Prevention Measures:** Guidelines for safety and prevention.
- **Quick Links:** Important external resources.
- **Information about Traffickers:** Data and profiles (restricted).
- **Educational Content:** Learning materials for awareness.

## Key Features
- **Bilingual Interface:** Full support for Bangla and English.
- **Anonymous Reporting:** Securely submit incident reports without revealing identity.
- **Emergency Support:** Persistent emergency call buttons and one-tap access.
- **Offline Capabilities:** Content caching for access in low-connectivity areas.
- **Push Notifications:** Alerts for updates and emergencies.

## Role-Based Access Control (RBAC)
The system supports three distinct user roles:
- **Viewers:** General public; can consume content, submit reports, and access emergency services.
- **Editors:** Manage and update time-sensitive content and review submissions.
- **Administrators:** Full control over users, content, configurations, approvals, and analytics.

## Architecture
The system is built on a **component-based, cross-platform architecture** using **React Native**, ensuring consistent performance on both Android and iOS.

### Folder Structure
The project follows a professional and scalable directory structure in `src/`:
- `components/`: Reusable UI components (atoms, molecules, organisms).
- `screens/`: Application screens corresponding to the modules.
- `navigation/`: Routing and navigation configuration.
- `services/`: API and third-party service integrations.
- `store/`: State management.
- `utils/`: Helper functions.
- `theme/`: Styling constants (colors, typography).
- `assets/`: Images, fonts, and other static assets.

## Getting Started

### Prerequisites
- Node.js (>= 20)
- React Native CLI
- Android Studio / Xcode

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MohaMobileApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS pods (Mac only)**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

**Android:**
```bash
npm run android
# or
npx react-native run-android
```

**iOS:**
```bash
npm run ios
# or
npx react-native run-ios
```

## Security & Privacy
Security is foundational to this project. We implement:
- Anonymous reporting mechanisms.
- Encrypted data transmission and secure storage.
- Strict permission handling and audit logs.
- Compliance-ready workflows for victim protection.
