# FEEDIN - AI-Powered Food Redistribution Platform

## 🌟 Vision
FEEDIN is a modern, AI-powered food redistribution platform designed to reduce food waste and connect surplus food donors with NGOs efficiently and transparently.

## 🎯 Key Features

### 1. **Smart Donation Locking System**
- When an NGO claims a donation, it's immediately locked (RESERVED status)
- Only the first NGO can access donor details
- Other NGOs see "Already Claimed" and cannot contact the donor
- Prevents donor harassment and NGO conflicts
- 15-minute timeout auto-releases unclaimed donations

### 2. **AI Intelligence Layer**
- **NGO Recommendation Engine**: Ranks NGOs by distance, demand, availability
- **Expiry Priority Engine**: Calculates priority scores for urgent donations
- **Demand Prediction**: Forecasts food requirements using historical data
- **Hunger Heatmap**: Visualizes demand zones with Google Maps
- **Route Optimization**: Uses Dijkstra algorithm for efficient delivery

### 3. **Role-Based Dashboards**
- **Donor Dashboard**: Create donations, track status, view impact metrics
- **NGO Dashboard**: Browse nearby donations, claim with timeout protection
- **Admin Dashboard**: Monitor system, manage users, view analytics
- **AI Dashboard**: Advanced analytics and intelligent recommendations

### 4. **Impact Tracking**
- Track meals saved, food rescued, families helped
- Carbon emissions reduction metrics
- Donor leaderboard with gamification
- Real-time impact counters

## 🚀 Tech Stack

### Frontend
- **React.js** - UI Framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data Visualization
- **Lucide React** - Icons
- **Zustand** - State Management

### Backend (Ready for Integration)
- **Node.js & Express** - Server
- **MongoDB Atlas** - Database
- **JWT & Bcrypt** - Authentication & Security

### APIs
- **Google Maps** - Location & Route Optimization
- **Cloudinary** - Image Storage

## 📁 Project Structure

```
src/
├── pages/
│   ├── LandingPage.js
│   ├── auth/
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   └── RoleSelectionPage.js
│   └── dashboards/
│       ├── DonorDashboard.js
│       ├── NGODashboard.js
│       ├── AdminDashboard.js
│       └── AIDashboard.js
├── components/
│   ├── Navigation.js
│   └── Footer.js
├── store/
│   ├── authStore.js
│   ├── donationStore.js
│   └── themeStore.js
├── App.js
└── index.js
```

## 🎨 Design Features

- **Glassmorphism Cards**: Modern frosted glass effect
- **Green + Orange Theme**: Eco-friendly branding
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion transitions
- **Professional UI**: Startup-quality design similar to Airbnb, Stripe

## 🔐 Security Features

- JWT authentication
- Password hashing with Bcrypt
- Role-based access control
- Protected routes
- Secure token management

## 📊 Dashboard Highlights

### Donor Dashboard
- Total donations, meals saved, impact score metrics
- Create donation form with image upload
- Donation tracking with status timeline
- Charts showing donation trends
- Food category distribution

### NGO Dashboard
- Nearby donations with distance filter
- Smart donation locking system
- 15-minute claim timeout countdown
- Contact verification system
- Claimed donations management

### Admin Dashboard
- System-wide statistics
- User and NGO management
- Donation monitoring
- Top donors leaderboard
- Growth analytics
- Recent activity log

### AI Dashboard
- NGO recommendation engine with scores
- Expiry priority calculation
- Demand prediction charts
- Hunger heatmap with zones
- Route optimization with Dijkstra algorithm
- Carbon savings tracking

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Running Development Server
```bash
npm start
```

### Building for Production
```bash
npm run build
```

## 🔑 Environment Variables

Create a `.env` file:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key
REACT_APP_API_URL=http://localhost:5000
```

## 📱 Features Coming Soon

- Google Maps integration for real-time tracking
- Volunteer collection flow system
- SMS notifications
- Payment integration for premium features
- Mobile app (React Native)
- Blockchain verification system

## 💡 Key Differentiators

1. **Conflict-Free System**: Smart locking prevents donor harassment
2. **AI-Powered Matching**: Intelligent NGO recommendations
3. **Real-time Transparency**: Live donation status tracking
4. **Impact Gamification**: Leaderboards encourage participation
5. **Route Optimization**: Mathematical efficiency in delivery
6. **Demand Prediction**: Anticipate food requirements

## 👥 Team

Built with ❤️ by the FEEDIN Team

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- Email: hello@feedin.com
- Website: www.feedin.com
- Address: Bangalore, India

---

**Transform Food Waste into Hope with AI** 🌱
