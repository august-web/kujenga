import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Wallet, Award, TrendingUp, Clock, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const DashboardPage: React.FC = () => {
  const { user, courses, enrollments, applications, transactions } = useStore();

  const userEnrollments = enrollments.filter(e => e.userId === user?.id);
  const userApplications = applications.filter(a => a.userId === user?.id);
  const userTransactions = transactions.filter(t => t.userId === user?.id);

  const completedCourses = userEnrollments.filter(e => e.completed).length;
  const activeJobs = userApplications.filter(a => a.status === 'accepted').length;
  const totalEarned = userTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const inProgressCourses = userEnrollments
    .filter(e => !e.completed)
    .slice(0, 3)
    .map(enrollment => ({
      ...enrollment,
      course: courses.find(c => c.id === enrollment.courseId)
    }));

  const recentTransactions = userTransactions.slice(0, 5);

  const stats = [
    { label: 'Courses Enrolled', value: userEnrollments.length, icon: BookOpen, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { label: 'Completed', value: completedCourses, icon: Award, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    { label: 'Active Jobs', value: activeJobs, icon: Briefcase, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { label: 'Total Earned', value: `KES ${totalEarned.toLocaleString()}`, icon: Wallet, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' }
  ];

  const quickActions = [
    { to: '/courses', label: 'Browse Courses', icon: BookOpen, description: 'Find new skills to learn' },
    { to: '/jobs', label: 'Find Jobs', icon: Briefcase, description: 'Explore available opportunities' },
    { to: '/wallet', label: 'View Wallet', icon: Wallet, description: 'Check your earnings' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          Welcome back, {user?.fullName?.split(' ')[0]}! 👋
        </h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Credit Score & Verification */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Credit Score */}
        <div className="card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[var(--text-primary)]">Kujenga Credit Score</h3>
            <TrendingUp size={20} className="text-primary-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary-600">{user?.creditScore}</span>
              <span className="text-sm text-[var(--text-muted)] mb-1">/ 100</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500"
                style={{ width: `${user?.creditScore}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Complete courses and jobs to improve your score
            </p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="card rounded-2xl p-6">
          <h3 className="font-semibold text-[var(--text-primary)]">Account Status</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              {user?.verified ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <Clock size={20} className="text-yellow-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-[var(--text-primary)]">
                  {user?.verified ? 'Verified Account' : 'Pending Verification'}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {user?.verified ? 'Your identity has been verified' : 'Complete your profile to get verified'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Star size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-[var(--text-primary)] capitalize">{user?.role} Account</p>
                <p className="text-sm text-[var(--text-muted)]">
                  {user?.role === 'learner' && 'Access to all courses and learning materials'}
                  {user?.role === 'worker' && 'Apply for jobs and gigs'}
                  {user?.role === 'employer' && 'Post jobs and hire talent'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* In Progress Courses */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Continue Learning</h2>
          <Link to="/courses" className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
            View all courses
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inProgressCourses.length > 0 ? (
            inProgressCourses.map((item) => (
              <Link
                key={item.id}
                to="/courses"
                className="card group rounded-2xl p-4 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-2xl">
                    {item.course?.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--text-primary)] group-hover:text-primary-600 truncate">
                      {item.course?.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.course?.category}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Progress</span>
                    <span className="font-medium text-[var(--text-primary)]">{item.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                    <div 
                      className="h-full rounded-full bg-primary-500 transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full card rounded-2xl p-8 text-center">
              <BookOpen size={40} className="mx-auto text-[var(--text-muted)]" />
              <h3 className="mt-4 font-medium text-[var(--text-primary)]">No courses in progress</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Start learning by enrolling in a course</p>
              <Link to="/courses" className="btn-primary mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm">
                Browse Courses
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.to}
                  className="card flex items-center gap-4 rounded-xl p-4 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                    <Icon size={24} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--text-primary)]">{action.label}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{action.description}</p>
                  </div>
                  <ArrowRight size={20} className="text-[var(--text-muted)]" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Recent Activity</h2>
            <Link to="/wallet" className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
              View all
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-4 card rounded-2xl">
            {recentTransactions.length > 0 ? (
              <div className="divide-y divide-[var(--border-color)]">
                {recentTransactions.map((txn) => (
                  <div key={txn.id} className="flex items-center gap-4 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      txn.type === 'credit' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {txn.type === 'credit' ? '+' : '-'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--text-primary)] truncate">{txn.description}</p>
                      <p className="text-sm text-[var(--text-muted)] capitalize">{txn.source}</p>
                    </div>
                    <div className={`font-semibold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.type === 'credit' ? '+' : '-'}KES {txn.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Wallet size={40} className="mx-auto text-[var(--text-muted)]" />
                <h3 className="mt-4 font-medium text-[var(--text-primary)]">No transactions yet</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Complete courses or jobs to earn</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
