# Service Calculator App

A React-based calculator for design service cost estimation with dynamic pricing based on service type, add-ons, and timeline adjustments.

![Service Calculator Preview](https://api.placeholder.com/800x450)

## 🚀 Live Demo

The app is deployed at: https://yourusername.github.io/service-calculator/

## ✨ Features

- Multiple service categories (Industrial, Brand, UI/UX, Website, Impact Design)
- Dynamic add-on selection
- Adjustable timeline with rush and relaxed pricing
- Responsive design for desktop and mobile
- Real-time cost calculation

## 🛠️ Technologies Used

- React
- Vite
- Tailwind CSS
- Radix UI Components
- GitHub Pages for deployment

## 📋 Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/service-calculator.git
cd service-calculator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173/service-calculator/`

## 🚢 Deployment

### Manual Deployment to GitHub Pages

1. Update the `base` property in `vite.config.js` with your repository name:

```js
base: '/service-calculator/', // Replace with your repository name
```

2. Build and deploy:

```bash
npm run build
npm run deploy
```

### Automatic Deployment with GitHub Actions

This repository includes a GitHub Actions workflow that automatically deploys your app to GitHub Pages when you push to the main branch.

To set it up:

1. Go to your GitHub repository
2. Navigate to Settings > Pages
3. Set the Source to "GitHub Actions"

That's it! Now each push to the main branch will trigger a deployment.

## 🧰 Customization

### Changing Pricing

Edit the constants in `src/components/ServiceCalculator.jsx`:

```javascript
const BASE_COST = 500000; // Change to your base cost
const ADDON_COST = 100000; // Change to your add-on cost
```

### Adding New Services

Add new entries to the `services` object in `src/components/ServiceCalculator.jsx`:

```javascript
services: {
  newService: {
    name: "New Service Name",
    addons: [
      "Add-on 1",
      "Add-on 2",
      // Add more add-ons
    ]
  }
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.