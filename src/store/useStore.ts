import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: 'learner' | 'worker' | 'employer';
  skills: string[];
  walletBalance: number;
  creditScore: number;
  verified: boolean;
  profileImage: string | null;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  modules: number;
  image: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  completed: boolean;
  certificateEarned: boolean;
  enrolledAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: 'instant' | 'formal' | 'bid';
  location: string;
  payment: number;
  employerId: string;
  employerName: string;
  employerVerified: boolean;
  status: 'open' | 'in_progress' | 'completed';
  createdAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  rating?: number;
  review?: string;
  appliedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  source: 'job' | 'course' | 'transfer' | 'bonus';
  description: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (userData: Partial<User> & { password: string }) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;

  // Courses
  courses: Course[];
  enrollments: Enrollment[];
  enrollInCourse: (courseId: string) => void;
  updateProgress: (enrollmentId: string, progress: number) => void;
  completeCourse: (enrollmentId: string) => void;

  // Jobs
  jobs: Job[];
  applications: Application[];
  createJob: (job: Omit<Job, 'id' | 'createdAt' | 'status'>) => void;
  applyForJob: (jobId: string) => void;
  acceptApplication: (applicationId: string) => void;
  completeJob: (applicationId: string, rating: number, review: string) => void;

  // Wallet
  transactions: Transaction[];
  creditWallet: (amount: number, source: Transaction['source'], description: string) => void;
  debitWallet: (amount: number, source: Transaction['source'], description: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
}

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    category: 'Technology',
    duration: '45 mins',
    description: 'Learn HTML, CSS, and JavaScript basics to build modern websites.',
    modules: 5,
    image: '💻'
  },
  {
    id: '2',
    title: 'Solar Energy Installation',
    category: 'Green Economy',
    duration: '30 mins',
    description: 'Master the basics of solar panel installation and maintenance.',
    modules: 4,
    image: '☀️'
  },
  {
    id: '3',
    title: 'Freelance Writing Mastery',
    category: 'Digital Services',
    duration: '25 mins',
    description: 'Build skills in content writing, copywriting, and freelance business.',
    modules: 3,
    image: '✍️'
  },
  {
    id: '4',
    title: 'Small Business Management',
    category: 'Business Skills',
    duration: '40 mins',
    description: 'Learn essential skills for starting and managing a small business.',
    modules: 6,
    image: '📊'
  },
  {
    id: '5',
    title: 'Modern Farming Techniques',
    category: 'Agriculture',
    duration: '35 mins',
    description: 'Discover sustainable farming practices and agribusiness opportunities.',
    modules: 4,
    image: '🌾'
  },
  {
    id: '6',
    title: 'Mobile App Development',
    category: 'Technology',
    duration: '45 mins',
    description: 'Create mobile applications using React Native framework.',
    modules: 6,
    image: '📱'
  }
];

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Website Redesign Project',
    description: 'Looking for a web developer to redesign our company website with modern UI/UX.',
    category: 'bid',
    location: 'Remote',
    payment: 50000,
    employerId: 'emp1',
    employerName: 'TechCorp Kenya',
    employerVerified: true,
    status: 'open',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Delivery Driver Needed',
    description: 'Immediate need for delivery drivers in Nairobi. Own motorcycle preferred.',
    category: 'instant',
    location: 'Nairobi',
    payment: 1500,
    employerId: 'emp2',
    employerName: 'QuickDeliver',
    employerVerified: true,
    status: 'open',
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Content Writer Position',
    description: 'Full-time content writer for a growing digital marketing agency.',
    category: 'formal',
    location: 'Mombasa',
    payment: 45000,
    employerId: 'emp3',
    employerName: 'Digital Africa Media',
    employerVerified: false,
    status: 'open',
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Solar Panel Installation',
    description: 'Install solar panels for residential properties. Experience required.',
    category: 'bid',
    location: 'Kisumu',
    payment: 25000,
    employerId: 'emp4',
    employerName: 'GreenPower Solutions',
    employerVerified: true,
    status: 'open',
    createdAt: new Date()
  },
  {
    id: '5',
    title: 'Data Entry Clerk',
    description: 'Remote data entry position. Must have good typing speed and attention to detail.',
    category: 'instant',
    location: 'Remote',
    payment: 800,
    employerId: 'emp5',
    employerName: 'DataPro Services',
    employerVerified: true,
    status: 'open',
    createdAt: new Date()
  }
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      // Auth
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Mock login - in production, this would call an API
        const mockUser: User = {
          id: 'user1',
          fullName: 'John Kamau',
          email: email,
          phone: '+254 712 345 678',
          location: 'Nairobi, Kenya',
          role: 'learner',
          skills: ['Web Development', 'Digital Marketing', 'Content Writing'],
          walletBalance: 5000,
          creditScore: 75,
          verified: true,
          profileImage: null,
          createdAt: new Date()
        };
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      register: (userData) => {
        const newUser: User = {
          id: 'user' + Date.now(),
          fullName: userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          location: userData.location || '',
          role: userData.role || 'learner',
          skills: userData.skills || [],
          walletBalance: 100, // Welcome bonus
          creditScore: 0,
          verified: false,
          profileImage: null,
          createdAt: new Date()
        };
        set({ user: newUser, isAuthenticated: true });
        // Add welcome notification
        get().addNotification({
          userId: newUser.id,
          title: 'Welcome to Kujenga! 🎉',
          message: 'You have received KES 100 as a welcome bonus. Start learning and earning today!',
          type: 'success'
        });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      // Courses
      courses: mockCourses,
      enrollments: [],
      enrollInCourse: (courseId) => {
        const { user } = get();
        if (!user) return;
        
        const enrollment: Enrollment = {
          id: 'enr' + Date.now(),
          userId: user.id,
          courseId,
          progress: 0,
          completed: false,
          certificateEarned: false,
          enrolledAt: new Date()
        };
        set((state) => ({ enrollments: [...state.enrollments, enrollment] }));
        get().addNotification({
          userId: user.id,
          title: 'Course Enrolled! 📚',
          message: 'You have successfully enrolled in a new course. Start learning now!',
          type: 'info'
        });
      },
      updateProgress: (enrollmentId, progress) => set((state) => ({
        enrollments: state.enrollments.map((e) =>
          e.id === enrollmentId ? { ...e, progress } : e
        )
      })),
      completeCourse: (enrollmentId) => {
        const { user, courses, enrollments } = get();
        if (!user) return;

        const enrollment = enrollments.find(e => e.id === enrollmentId);
        const course = enrollment ? courses.find(c => c.id === enrollment.courseId) : null;

        set((state) => ({
          enrollments: state.enrollments.map((e) =>
            e.id === enrollmentId ? { ...e, completed: true, progress: 100, certificateEarned: true } : e
          )
        }));

        // Credit wallet for course completion
        const bonus = 500;
        get().creditWallet(bonus, 'course', `Completed: ${course?.title || 'Course'}`);
        get().addNotification({
          userId: user.id,
          title: 'Certificate Earned! 🏆',
          message: `Congratulations! You completed "${course?.title}" and earned KES ${bonus}!`,
          type: 'success'
        });
      },

      // Jobs
      jobs: mockJobs,
      applications: [],
      createJob: (jobData) => {
        const job: Job = {
          ...jobData,
          id: 'job' + Date.now(),
          status: 'open',
          createdAt: new Date()
        };
        set((state) => ({ jobs: [job, ...state.jobs] }));
      },
      applyForJob: (jobId) => {
        const { user, jobs } = get();
        if (!user) return;

        const job = jobs.find(j => j.id === jobId);
        const application: Application = {
          id: 'app' + Date.now(),
          jobId,
          userId: user.id,
          status: 'pending',
          appliedAt: new Date()
        };
        set((state) => ({ applications: [...state.applications, application] }));
        get().addNotification({
          userId: user.id,
          title: 'Application Submitted! 📝',
          message: `Your application for "${job?.title}" has been submitted successfully.`,
          type: 'info'
        });
      },
      acceptApplication: (applicationId) => {
        const { user, applications, jobs } = get();
        const application = applications.find(a => a.id === applicationId);
        const job = application ? jobs.find(j => j.id === application.jobId) : null;

        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === applicationId ? { ...a, status: 'accepted' } : a
          )
        }));

        if (user) {
          get().addNotification({
            userId: user.id,
            title: 'Application Accepted! ✅',
            message: `Your application for "${job?.title}" has been accepted. Get started now!`,
            type: 'success'
          });
        }
      },
      completeJob: (applicationId, rating, review) => {
        const { user, applications, jobs } = get();
        const application = applications.find(a => a.id === applicationId);
        const job = application ? jobs.find(j => j.id === application.jobId) : null;

        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === applicationId ? { ...a, status: 'completed', rating, review } : a
          )
        }));

        if (user && job) {
          get().creditWallet(job.payment, 'job', `Completed: ${job.title}`);
          get().addNotification({
            userId: user.id,
            title: 'Job Completed! 💰',
            message: `You earned KES ${job.payment.toLocaleString()} for completing "${job.title}"!`,
            type: 'success'
          });
        }
      },

      // Wallet
      transactions: [],
      creditWallet: (amount, source, description) => {
        const { user } = get();
        if (!user) return;

        const transaction: Transaction = {
          id: 'txn' + Date.now(),
          userId: user.id,
          type: 'credit',
          amount,
          source,
          description,
          createdAt: new Date()
        };
        set((state) => ({
          user: state.user ? { ...state.user, walletBalance: state.user.walletBalance + amount } : null,
          transactions: [transaction, ...state.transactions]
        }));
      },
      debitWallet: (amount, source, description) => {
        const { user } = get();
        if (!user || user.walletBalance < amount) return;

        const transaction: Transaction = {
          id: 'txn' + Date.now(),
          userId: user.id,
          type: 'debit',
          amount,
          source,
          description,
          createdAt: new Date()
        };
        set((state) => ({
          user: state.user ? { ...state.user, walletBalance: state.user.walletBalance - amount } : null,
          transactions: [transaction, ...state.transactions]
        }));
      },

      // Notifications
      notifications: [],
      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: 'notif' + Date.now(),
          read: false,
          createdAt: new Date()
        };
        set((state) => ({ notifications: [notification, ...state.notifications] }));
      },
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      })),
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true }))
      })),
      clearNotifications: () => set({ notifications: [] })
    }),
    {
      name: 'kujenga-storage',
      partialize: (state) => ({ 
        theme: state.theme,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        enrollments: state.enrollments,
        applications: state.applications,
        transactions: state.transactions,
        notifications: state.notifications
      })
    }
  )
);
