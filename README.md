# Personal Nutrition App

A React-based nutrition tracking app for monitoring daily food intake and nutritional goals.

## What it does

Currently tracks daily food intake with nutrition data. Users can log in and search for foods, add them to their daily log, and view calculated daily summary totals for calories, protein, carbs, and fats.

## Tech Stack

- **React** with Vite
- **Firebase** (Auth + Firestore)
- **Nutritionix API** for food data

## Current Status

✅ **Phase 1 Complete (MVP)**
- User authentication
- Food search via Nutritionix API
- Daily food logging with calculated summary totals
- Basic nutrient totals

🚧 **Coming Next**
- Goal setting and progress tracking
- Historical data view
- Better UI/UX (Phase 2)
- Recipe builder and meal suggestions (Phase 3)

## Setup

1. Clone and install dependencies: `npm install`
2. Create `.env.local` with Firebase config and Nutritionix API keys
3. Set up Firebase project with Auth and Firestore
4. Run with `npm run dev`
