import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase, Wallet, Award, CheckCircle, Star } from 'lucide-react';
import { Logo } from '../components/Logo';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Learn & Earn',
      description: 'Access free courses in Technology, Green Economy, Digital Services, Business, and Agriculture. Earn certificates and rewards as you learn.'
    },
    {
      icon: Briefcase,
      title: 'Jobs & Gigs',
      description: 'Find instant gigs, formal jobs, and project opportunities. Get paid directly to your wallet upon completion.'
    },
    {
      icon: Wallet,
      title: 'Digital Wallet',
      description: 'Manage your earnings, track transactions, and build your Kujenga Credit Score for better opportunities.'
    },
    {
      icon: Award,
      title: 'Get Certified',
      description: 'Earn recognized certificates upon course completion. Showcase your skills to potential employers.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '200+', label: 'Courses Available' },
    { value: '10K+', label: 'Jobs Posted' },
    { value: 'KES 5M+', label: 'Paid to Workers' }
  ];

  const categories = [
    { name: 'Technology', icon: '💻', color: 'from-blue-500 to-blue-600' },
    { name: 'Green Economy', icon: '🌱', color: 'from-green-500 to-green-600' },
    { name: 'Digital Services', icon: '📱', color: 'from-purple-500 to-purple-600' },
    { name: 'Business Skills', icon: '📊', color: 'from-orange-500 to-orange-600' },
    { name: 'Agriculture', icon: '🌾', color: 'from-amber-500 to-amber-600' }
  ];

  const testimonials = [
    {
      name: 'Amina Hassan',
      role: 'Web Developer',
      location: 'Nairobi',
      content: 'Kujenga helped me transition from casual jobs to a stable tech career. The courses are practical and the earnings are real!',
      rating: 5
    },
    {
      name: 'David Ochieng',
      role: 'Solar Technician',
      location: 'Kisumu',
      content: 'I learned solar installation through Kujenga and now run my own business. The platform changed my life.',
      rating: 5
    },
    {
      name: 'Grace Mwangi',
      role: 'Content Writer',
      location: 'Mombasa',
      content: 'From learner to employer in 6 months. Kujenga gave me the skills and confidence to start my agency.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="text-center">
            <Logo size="lg" className="mx-auto mb-8 justify-center" />
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-[var(--text-primary)]">Build Skills.</span>{' '}
              <span className="gradient-text">Earn Daily.</span>{' '}
              <span className="text-[var(--text-primary)]">Sustain Tomorrow.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)] sm:text-xl">
              Join Africa's leading platform for skills training, job opportunities, and digital earning. 
              Start your journey to financial freedom today.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="btn-primary flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                Start Earning Today
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/courses"
                className="btn-secondary flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                Browse Courses
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-primary-500" />
                Free to join
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-primary-500" />
                Instant payouts
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={16} className="text-primary-500" />
                Verified employers
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600 sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              The Challenge We're Solving
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Youth unemployment in Africa is a crisis. Millions of talented young people lack access to skills training and job opportunities.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card rounded-2xl p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-2xl dark:bg-red-900/30">
                📊
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">60% Youth Unemployment</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Over 60% of African youth are unemployed or underemployed, limiting economic growth.
              </p>
            </div>
            <div className="card rounded-2xl p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl dark:bg-orange-900/30">
                🎓
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Skills Gap</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Traditional education doesn't prepare youth for the modern digital economy.
              </p>
            </div>
            <div className="card rounded-2xl p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl dark:bg-yellow-900/30">
                💰
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Limited Access</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Quality training and job opportunities are concentrated in urban areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[var(--bg-secondary)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              The Kujenga Ecosystem
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              A complete platform for skills development, employment, and financial growth.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card rounded-2xl p-6 transition-transform hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                    <Icon size={24} className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{feature.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Learn In-Demand Skills
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Choose from 200+ courses across high-growth sectors.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/courses"
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-6 text-white transition-transform hover:-translate-y-1`}
              >
                <span className="text-4xl">{category.icon}</span>
                <h3 className="mt-4 font-semibold">{category.name}</h3>
                <ArrowRight className="absolute bottom-4 right-4 opacity-0 transition-all group-hover:opacity-100" size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--bg-secondary)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary)]">
              Real stories from Kujenga community members.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card rounded-2xl p-6">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-[var(--text-secondary)]">"{testimonial.content}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-sm font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{testimonial.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{testimonial.role} • {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-16 sm:px-16">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Transform Your Future?
              </h2>
              <p className="mt-4 text-lg text-primary-100">
                Join thousands of young Africans building skills, finding jobs, and earning daily on Kujenga.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary-700 transition-colors hover:bg-primary-50"
                >
                  Create Free Account
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Logo size="sm" />
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                Building Africa's future workforce through skills, jobs, and digital earning opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">Platform</h4>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to="/courses" className="hover:text-primary-600">Courses</Link></li>
                <li><Link to="/jobs" className="hover:text-primary-600">Jobs</Link></li>
                <li><Link to="/wallet" className="hover:text-primary-600">Wallet</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">Resources</h4>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-primary-600">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-600">Blog</a></li>
                <li><a href="#" className="hover:text-primary-600">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-[var(--border-color)] pt-8 text-center text-sm text-[var(--text-muted)]">
            © 2024 Kujenga. All rights reserved. Built for Africa, by Africa.
          </div>
        </div>
      </footer>
    </div>
  );
};
