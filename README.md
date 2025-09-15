# Simple React App

A basic React application with a counter component to demonstrate React hooks and state management.

## Features

- Simple counter with increase, decrease, and reset functionality
- Modern UI with gradient background and smooth animations
- Responsive design that works on all devices

## How to Run the Code

### Prerequisites

Make sure you have Node.js installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   The app will automatically open in your default browser at `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

### Project Structure

```
simple-react-app/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── App.js              # Main App component
│   ├── App.css             # App component styles
│   ├── index.js            # App entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## What You'll See

The app displays:
- A welcome message
- A counter that starts at 0
- Three buttons: Decrease, Reset, and Increase
- Instructions for editing the code

## Making Changes

To modify the app:
1. Edit the files in the `src` folder
2. Save the changes
3. The browser will automatically reload with your updates

## Troubleshooting

If you encounter any issues:
1. Make sure Node.js is installed
2. Try deleting the `node_modules` folder and running `npm install` again
3. Check that port 3000 is not already in use by another application 