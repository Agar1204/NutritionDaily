# Personal Nutrition App

A React-based nutrition tracking app for monitoring daily food intake and nutritional data. 


Users can create accounts and log in to track their daily food intake with nutrition data. They can search for foods from a comprehensive database, log them to their daily diary, and view calculated daily summary totals for calories, protein, carbs, and fats. The app provides a simple, clean interface for understanding your daily nutritional intake.

## Key Features

- **User authentication** with secure account creation and login
- **Food search** via Nutritionix API with comprehensive database
- **Daily logging** with portion tracking
- **Real-time calculations** showing daily summary totals
- **Nutrient tracking** for calories, protein, carbs, and fats
- **Data persistence** with Firebase Firestore

## Tech Stack

- **React** with Vite
- **Firebase** (Auth + Firestore)
- **Nutritionix API** for food data

## Current Status

✅ **Phase 1 Complete (MVP)**
- User authentication system
- Food search and database integration
- Daily food logging with portions
- Real-time nutrient calculations

🚧 **Coming Next**
- Goal setting and progress tracking (Phase 2)
- Recipe builder and meal suggestions (Phase 3)

## Setup

1. Clone and install dependencies: `npm install`
2. Create `.env.local` with Firebase config and Nutritionix API keys
3. Set up Firebase project with Auth and Firestore
4. Run with `npm run dev`
