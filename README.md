# Vipatkanjak Hotel Management System

This is a modern Hotel Management Web Application built with React, Vite, and Tailwind CSS.
It features a Guest Interface for bookings and an Admin Dashboard for managing room status and viewing financials.

## Features
- **Guest Portal:** Browse rooms, check availability, and simulate bookings.
- **Admin Dashboard:** Real-time room status view, financial stats, and quick actions.
- **Live State:** Booking a room in the Guest portal immediately updates the Admin Dashboard.
- **Interactive Admin:** Click on rooms in the Admin Dashboard to toggle their status (Available -> Occupied -> Cleaning -> Maintenance).

## How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    # or
    bun install
    ```

2.  **Start Development Server:**
    ```bash
    npm run dev
    # or
    bun dev
    ```

3.  Open your browser at `http://localhost:5173`

## Project Structure
- `src/context`: Contains the `HotelContext` which acts as the mock database.
- `src/pages`: Contains the Guest and Admin page views.
- `src/components`: Reusable UI components.
