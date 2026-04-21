# Kujenga

> Empowering African Communities Through Skills, Jobs, and Economic Opportunities

Kujenga is a comprehensive digital platform designed to bridge the skills gap and create economic opportunities for individuals across Africa. The platform enables users to learn new skills through curated courses, find employment opportunities ranging from instant gigs to formal jobs, and manage their earnings through a built-in digital wallet system.

## 🌟 Features

### 📚 Learn & Earn
- Access free and premium courses across multiple categories:
  - **Technology**: Web Development, Mobile Apps, Cloud Computing
  - **Green Economy**: Solar Energy, Sustainable Practices
  - **Digital Services**: Freelance Writing, Content Creation
  - **Business Skills**: Entrepreneurship, Management
  - **Agriculture**: Modern Farming, Agribusiness

- Track learning progress with interactive modules
- Earn recognized certificates upon course completion
- Build your professional profile and portfolio

### 💼 Jobs & Opportunities
- **Instant Gigs**: Quick, short-term opportunities
- **Formal Jobs**: Full-time and part-time positions
- **Project Bids**: Flexible project-based work
- Real-time job notifications and alerts
- Application tracking and status updates
- Direct communication with employers

### 💰 Digital Wallet
- Secure payment system for job earnings
- Transaction history and financial tracking
- Kujenga Credit Score system for better opportunities
- Multiple payment methods support
- Transparent fee structure

### 👤 User Profiles
- Comprehensive profile management
- Skills showcase and endorsements
- Verification badges for trusted users
- Portfolio of completed courses and jobs
- Performance ratings and reviews

### 🎯 Dashboard
- Personalized dashboard with key metrics
- Quick access to courses, jobs, and wallet
- Real-time notifications
- Activity timeline and insights

### 🌓 Dark Mode
- Full dark mode support
- Seamless theme switching
- Optimized for different lighting conditions

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.3
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.17
- **Routing**: React Router 7.14.1
- **State Management**: Zustand 5.0.12
- **UI Icons**: Lucide React 1.8.0
- **Notifications**: React Hot Toast 2.6.0

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kujenga.git
   cd kujenga
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to see the application

## 🚀 Usage

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Project Structure
```
src/
├── components/       # Reusable React components
│   ├── Logo.tsx
│   └── Navbar.tsx
├── pages/           # Page components for each route
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── CoursesPage.tsx
│   ├── JobsPage.tsx
│   ├── WalletPage.tsx
│   └── ProfilePage.tsx
├── store/           # Zustand state management
│   └── useStore.ts
├── utils/           # Utility functions
│   └── cn.ts
├── App.tsx          # Main app component with routing
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## 🔐 Authentication & Routing

The application implements both public and protected routes:

- **Public Routes**:
  - `/` - Landing page
  - `/login` - User login
  - `/register` - New user registration

- **Protected Routes** (requires authentication):
  - `/dashboard` - User dashboard
  - `/courses` - Browse and manage courses
  - `/jobs` - Browse job opportunities
  - `/wallet` - Manage earnings and transactions
  - `/profile` - User profile management

## 📊 Data Models

### User
- Profile information (name, email, phone, location)
- Role: learner, worker, or employer
- Skills and verification status
- Wallet balance and credit score
- Profile image

### Courses
- Multi-category course system
- Module-based learning structure
- Course descriptions and duration
- Enrollment tracking and progress

### Jobs
- Multiple job types (instant, formal, bid)
- Location and payment information
- Employer verification system
- Application management

### Wallet & Transactions
- Digital wallet for earnings management
- Transaction tracking (credit/debit)
- Multiple income sources (jobs, courses, bonuses)
- Financial history and analytics

### Notifications
- Real-time user notifications
- Multiple notification types (success, info, warning, error)
- Read/unread status tracking

## 🎨 Styling

The application uses Tailwind CSS with custom configuration:

- Responsive design for all device sizes
- Dark mode support with CSS variables
- Custom color schemes and themes
- Optimized component styling with `clsx` and `tailwind-merge`

## 🔄 State Management

Zustand is used for lightweight, efficient state management with persistence capabilities:

- User authentication state
- Theme preferences
- Course enrollments and progress
- Job applications and tracking
- Wallet and transaction history
- Notifications

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Kujenga is built by a passionate team dedicated to empowering communities across Africa through technology and education.

## 🤝 Support

For support, please open an issue on GitHub or contact our support team.

## 🔗 Links

- **Website**: [kujenga.io](https://kujenga.io)
- **Documentation**: [docs.kujenga.io](https://docs.kujenga.io)
- **Community**: [community.kujenga.io](https://community.kujenga.io)

---

**Made with ❤️ to empower African communities**
