# NSAYƐ

> Connecting Skills with Opportunities Across Africa

NSAYƐ is a comprehensive digital platform designed to bridge the skills gap and create economic opportunities for individuals across Africa. The platform enables users to discover programs and training, find employment opportunities ranging from TVET roles to digital jobs, and manage their careers through a unified platform — by ProjEvent Technologies.

## 🌟 Features

### 📚 Programs & Training
- Access courses and training across multiple categories:
  - **Technical & Vocational (TVET)**: Electricians, welders, mechanics, refrigeration
  - **Digital & Tech**: Developers, designers, IT support, digital marketing
  - **Business & Admin**: Office admins, operations, customer service
  - **Marketing & Creative**: Content creators, social media, graphics
  - **Healthcare**: Nurses, assistants, lab tech, community health
  - **Hospitality**: Hotels, restaurants, tourism, events
  - **Freelance / Remote**: Remote projects across Africa & global clients
  - **Engineering & Construction**: Civil, mechanical, site workers

- Track learning progress with interactive modules
- Earn certificates upon course completion
- Build your NSAYƐ profile showcasing your strengths

### 💼 Jobs & Opportunities
- **Full-time Positions**: Stable roles with benefits
- **Part-time & Internships**: Flexible opportunities
- **Apprenticeships**: Hands-on learning with earning
- **Contract / Project**: Short-term engagements
- **Remote Work**: Flexible location-independent roles
- Real-time job notifications and alerts
- Application tracking and status updates
- Only verified employers and opportunities

### 💰 Digital Wallet
- Secure payment system for job earnings
- Transaction history and financial tracking
- NSAYƐ Credit Score system for better opportunities
- Transparent fee structure

### 👤 User Profiles
- Comprehensive profile management
- Skills showcase and endorsements
- Verification badges for trusted users
- Portfolio of completed courses and jobs
- Performance ratings and reviews

### 🎯 Dashboard
- Personalized dashboard with key metrics
- Quick access to programs, jobs, and wallet
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
   git clone https://github.com/yourusername/nsaye.git
   cd nsaye
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
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
  - `/register` - New user registration (3-step profile creation)
  - `/courses` - Browse programs and training

- **Protected Routes** (requires authentication):
  - `/dashboard` - User dashboard
  - `/jobs` - Browse job opportunities
  - `/wallet` - Manage earnings and transactions
  - `/profile` - User profile management

## 📊 Data Models

### User
- Profile information (name, email, phone, location, country)
- Role: learner, worker, or employer
- Skills and verification status
- Wallet balance and credit score
- Profile image

### Programs / Courses
- Multi-category training system
- Module-based learning structure
- Course descriptions and duration
- Enrollment tracking and progress

### Jobs
- Multiple job types (full-time, part-time, internship, apprenticeship, contract, remote)
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
- Custom indigo/orange color scheme matching the NSAYƐ brand
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

NSAYƐ is built by ProjEvent Technologies — a passionate team dedicated to empowering communities across Africa through technology, skills development, and real opportunities.

## 🤝 Support

For support, please open an issue on GitHub or contact our team:
- Email: info@projevent.net
- WhatsApp / Call: +233 24 406 3717

---

**NSAYƐ — Connecting Skills with Opportunities Across Africa**
**Designed & powered by ProjEvent Technologies**
