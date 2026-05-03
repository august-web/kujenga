import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, MapPin, Briefcase, BookOpen, Users, Building2, Award, TrendingUp, Quote } from 'lucide-react';
import { Logo } from '../components/Logo';

export const LandingPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchType, setSearchType] = useState('');

  const stats = [
    { value: '245+', label: 'Active Jobs', subtext: 'Updated daily', icon: Briefcase },
    { value: '18,500+', label: 'Registered Users', subtext: 'Youth, grads & artisans', icon: Users },
    { value: '320+', label: 'Partner Employers', subtext: 'Across multiple sectors', icon: Building2 },
    { value: '4,100+', label: 'Placements', subtext: 'Verified outcomes', icon: TrendingUp }
  ];

  const skillCategories = [
    { name: 'Technical & Vocational', description: 'Electricians, welders, mechanics, refrigeration & more', icon: '⚡' },
    { name: 'Digital & Tech', description: 'Developers, designers, IT support, data & digital marketing', icon: '💻' },
    { name: 'Business & Admin', description: 'Office admins, front desk, operations & customer service', icon: '📊' },
    { name: 'Marketing & Creative', description: 'Content creators, social media, graphics, brand promoters', icon: '🎨' },
    { name: 'Healthcare', description: 'Nurses, assistants, lab techs & community health', icon: '🏥' },
    { name: 'Hospitality', description: 'Hotels, restaurants, tourism, events & guest relations', icon: '🏨' },
    { name: 'Freelance / Remote', description: 'Remote projects across Africa & global clients', icon: '🌍' },
    { name: 'Engineering & Construction', description: 'Civil, mechanical, site workers & project teams', icon: '🏗️' }
  ];

  const testimonials = [
    {
      initials: 'AK',
      name: 'Angela',
      role: 'TVET Graduate',
      category: 'Refrigeration Technician',
      content: 'I moved from odd jobs to a stable role with benefits in under 2 months.',
      badge: 'Full-time placement'
    },
    {
      initials: 'DM',
      name: 'David',
      role: 'Digital Designer',
      category: 'Creative & Digital',
      content: 'Through NSAYƐ I landed a remote design contract with a regional brand.',
      badge: 'Remote project'
    },
    {
      initials: 'NS',
      name: 'Nana',
      role: 'Admin Assistant',
      category: 'Business & Admin',
      content: 'The platform helped me refine my CV and get multiple interviews in one week.',
      badge: 'Career launch'
    }
  ];

  const featuredEmployers = [
    'A1 AfroTech Solutions',
    'HB Horizon Builders',
    'HC HealCare Clinics',
    'MS MarketStreet Retail',
    'NG NextGen Creative'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-earth-50 px-4 py-2 text-sm font-medium text-earth-700 dark:bg-earth-900/30 dark:text-earth-300">
              <span className="flex h-2 w-2 rounded-full bg-earth-500"></span>
              By ProjEvent Technologies
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              Empowering youth, graduates, professionals, and skilled workers with{' '}
              <span className="gradient-text">life-changing opportunities</span>{' '}
              across Africa
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)] sm:text-xl">
              TVET, Digital, Creative, Administrative and more — all from one smart platform connecting skills with real opportunities.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/jobs"
                className="btn-primary flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold"
              >
                Find Jobs
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/courses"
                className="flex items-center gap-2 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-primary)] px-8 py-4 text-lg font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-secondary)]"
              >
                Explore Programs
                <BookOpen size={20} />
              </Link>
            </div>
            <p className="mt-6 text-sm text-[var(--text-muted)]">
              TVET • Digital • Creative • Admin — Serving talents across Africa
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent"></div>
      </section>

      {/* Impact Stats */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Impact you can measure.
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Track how NSAYƐ connects skills to real jobs and opportunities.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                    <Icon size={24} className="text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 font-medium text-[var(--text-primary)]">{stat.label}</div>
                  <div className="text-xs text-[var(--text-muted)]">{stat.subtext}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">Search Opportunities</h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Find the right role for your skills. Only verified employers and opportunities.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-1">
                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Keyword</label>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Job title or skill"
                  className="input-field w-full rounded-xl px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Location</label>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="City or country"
                  className="input-field w-full rounded-xl px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Skill Category</label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="input-field w-full rounded-xl px-4 py-3 text-sm"
                >
                  <option value="">All Skill Categories</option>
                  <option value="tvet">TVET & Vocational</option>
                  <option value="digital">Digital & Tech</option>
                  <option value="business">Business & Admin</option>
                  <option value="marketing">Marketing & Creative</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="hospitality">Hospitality & Tourism</option>
                  <option value="freelance">Freelance / Remote</option>
                  <option value="engineering">Engineering & Construction</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">Job Type</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="input-field w-full rounded-xl px-4 py-3 text-sm"
                >
                  <option value="">Any type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="apprenticeship">Apprenticeship</option>
                  <option value="contract">Contract / Project</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              <div className="flex items-end">
                <Link
                  to="/jobs"
                  className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
                >
                  <Search size={18} />
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Paths: Talent & Employers */}
      <section className="bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Built for talent & employers.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-[var(--text-secondary)]">
            Whether you're looking for your next role or building a winning team, NSAYƐ gives you the tools to move faster.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                <Users size={24} className="text-primary-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">For Talent & Job Seekers</h3>
              <p className="mb-4 text-sm text-[var(--text-muted)]">Students, graduates, artisans & professionals.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-primary-500" />
                  Search verified jobs and opportunities across Africa.
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-primary-500" />
                  Build a NSAYƐ profile that highlights your strengths.
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-primary-500" />
                  Track your applications and interview progress in one place.
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-primary-500" />
                  Discover programs, trainings, and apprenticeships that fit your path.
                </li>
              </ul>
              <Link
                to="/register"
                className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
              >
                Start as a Talent
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-earth-100 dark:bg-earth-900/30">
                <Building2 size={24} className="text-earth-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">For Employers & Partners</h3>
              <p className="mb-4 text-sm text-[var(--text-muted)]">SMEs, corporates, NGOs & projects.</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-earth-500" />
                  Post roles and describe the skills you need.
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-earth-500" />
                  Access a pre-screened pool of talent across TVET, digital, creative & admin.
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-earth-500" />
                  Shortlist, contact, and schedule interviews faster.
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <ArrowRight size={16} className="mt-0.5 flex-shrink-0 text-earth-500" />
                  Need help? Contact the NSAYƐ team to post jobs on your behalf.
                </li>
              </ul>
              <Link
                to="/register"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-earth-500 bg-earth-50 px-6 py-3 text-sm font-semibold text-earth-700 transition-colors hover:bg-earth-100 dark:bg-earth-900/20 dark:text-earth-400"
              >
                Hire through NSAYƐ
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Skill categories we support.
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Talent across ALL skill categories — TVET, digital, creative, professional, administrative, and more.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category, index) => (
              <Link
                key={index}
                to="/jobs"
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all hover:border-primary-300 hover:shadow-md"
              >
                <span className="text-3xl">{category.icon}</span>
                <h3 className="mt-3 font-semibold text-[var(--text-primary)]">{category.name}</h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Real people. Real opportunities.
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              A snapshot of how NSAYƐ is helping talent step into life-changing roles.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm">
                <Quote size={24} className="text-primary-400 opacity-50" />
                <p className="mt-3 text-[var(--text-secondary)]">"{testimonial.content}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-sm font-bold text-white">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{testimonial.name}, {testimonial.role}</p>
                      <p className="text-sm text-[var(--text-muted)]">{testimonial.category}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                  {testimonial.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Employers */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Featured employers & partners</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              A growing network of African businesses, NGOs, and global partners looking for skilled talent.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {featuredEmployers.map((employer, index) => (
              <div
                key={index}
                className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-6 py-4 text-sm font-medium text-[var(--text-secondary)]"
              >
                {employer}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/register"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Want to feature your organisation here? Contact Admin to Post Jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-earth-800 px-6 py-14 sm:px-12">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Transform Your Future?
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Join thousands of young Africans building skills, finding jobs, and earning daily on NSAYƐ.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-earth-800 transition-colors hover:bg-earth-50"
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
            <div className="md:col-span-1">
              <Logo size="sm" />
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                NSAYƐ (by ProjEvent Technologies) connects skills with real opportunities across TVET, digital, creative, professional and more.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">Platform</h4>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li><Link to="/jobs" className="hover:text-primary-600">Browse Jobs</Link></li>
                <li><Link to="/courses" className="hover:text-primary-600">Explore Programs</Link></li>
                <li><Link to="/register" className="hover:text-primary-600">For Employers</Link></li>
                <li><Link to="/register" className="hover:text-primary-600">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li><a href="#" className="hover:text-primary-600">About NSAYƐ</a></li>
                <li><a href="#" className="hover:text-primary-600">Our Mission & SDGs</a></li>
                <li><a href="#" className="hover:text-primary-600">FAQs</a></li>
                <li><a href="#" className="hover:text-primary-600">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">Contact</h4>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li>Email: <a href="mailto:cytech73@gmail.com" className="text-primary-600 hover:text-primary-700">cytech73@gmail.com</a></li>
                <li>Phone / WhatsApp: <a href="tel:+233244063717" className="text-primary-600 hover:text-primary-700">+233 24 406 3717</a></li>
              </ul>
              <div className="mt-4 flex gap-3">
                <a href="#" className="text-[var(--text-muted)] hover:text-primary-600">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-[var(--border-color)] pt-8 text-center text-sm text-[var(--text-muted)]">
            © NSAYƐ. All rights reserved. Designed & powered by ProjEvent Technologies.
          </div>
        </div>
      </footer>
    </div>
  );
};
