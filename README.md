# Marketeer

Marketeer is a market scheduling platform designed to connect users with marketplace owners for seamless booking and management. Built with **Next.js** and **TypeScript**, styled using **Tailwind CSS** with **Google Firebase** as a database, Marketeer provides a user-friendly interface for registering and managing markets.

## Demo
https://marketeer-market-scheduler.vercel.app

## Features

### User Features
- **Register and Login**: Securely create an account and log in using Firebase Authentication.
- **Market Registration**: Register your own market to book stalls at various marketplaces listed on the platform.
- **Profile Management**: View and manage your registered market as well as personal details via your profile.
- **Marketplace Hub**: View what markets are availble to you, as well as what stalls are already booked to help find whats right for you.

### Admin Features (Marketplace Owners)
- **Marketplace Registration**: Create and manage your own marketplaces, making them visible to users.
- **Admin Panel Access**: 
  - Approve or deny booking requests from users.
  - Add new dates and update details for your marketplace.
  - Manage additional information about your marketplace.

## Frontend
- **Next.js**: Framework for building the web application.
- **TypeScript**: Ensures type-safe development for scalability.
- **Tailwind CSS**: Provides efficient and responsive styling.

## Backend
- **Google Firebase**:
  - **Authentication**: For secure user account creation and management.
  - **Cloud Firestore**: As the primary database for storing user, market, and booking data.
  - **Cloud Functions**: For serverless logic to handle backend processes.
