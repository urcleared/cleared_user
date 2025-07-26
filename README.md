# Cleared User Mobile Web App

A React-based mobile web application for the Cleared platform's user interface.

## Features

- Mobile-first responsive design
- Maintains mobile appearance on desktop browsers
- Built with React and TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

The build output will be in the `build` folder.

## Design

The application features a mobile-optimized interface that:
- Displays in a phone-like frame on desktop browsers (max width: 390px)
- Fills the entire viewport on actual mobile devices
- Uses iOS-inspired design elements

## Available Scripts

- `npm start` - Runs the development server
- `npm test` - Launches the test runner
- `npm run build` - Creates a production build
- `npm run eject` - Ejects from Create React App (one-way operation)