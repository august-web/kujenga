import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff, ArrowRight, GraduationCap, ArrowLeft, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Logo } from '../components/Logo';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    status: '',
    skillArea: '',
    experience: '',
    lookingFor: '',
    cvLink: '',
    description: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.fullName || !formData.email)) return;
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the Terms of Use and Privacy Policy');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: `${formData.city}, ${formData.country}`,
      role: 'learner',
      password: formData.password
    });

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center">
          <Logo size="md" className="mx-auto mb-6 justify-center" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Create your NSAYƐ profile</h1>
          <p className="mt-2 text-[var(--text-secondary)]">Student / youth / graduate registration – complete your profile in 3 quick steps.</p>
        </div>

        {/* Step Indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${s <= step ? 'text-primary-600' : 'text-[var(--text-muted)]'}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  s < step ? 'bg-primary-600 text-white' : s === step ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-[var(--bg-secondary)]'
                }`}>
                  {s < step ? <Check size={16} /> : s}
                </div>
                <span className="hidden text-sm font-medium sm:block">
                  {s === 1 ? 'Personal Info' : s === 2 ? 'Skills Info' : 'Account Setup'}
                </span>
              </div>
              {s < 3 && <div className={`h-0.5 w-8 ${s < step ? 'bg-primary-600' : 'bg-[var(--border-color)]'}`}></div>}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input-field w-full rounded-xl py-3 pl-10 pr-4"
                    placeholder="John Kamau"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Email Address
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field w-full rounded-xl py-3 pl-10 pr-4"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Phone Number
                </label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field w-full rounded-xl py-3 pl-10 pr-4"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-field mt-1 w-full rounded-xl px-4 py-3"
                >
                  <option value="">Select country</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Other">Other African country</option>
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[var(--text-secondary)]">
                  City / Town
                </label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field w-full rounded-xl py-3 pl-10 pr-4"
                    placeholder="Accra"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Current Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input-field mt-1 w-full rounded-xl px-4 py-3"
                >
                  <option value="">Select status</option>
                  <option value="Student">Student</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                  <option value="TVET / Technical">TVET / Technical</option>
                  <option value="Job seeker">Job seeker</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold"
              >
                Next: Skills Info
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Step 2: Skills Info */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="skillArea" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Main Skill Area
                </label>
                <select
                  id="skillArea"
                  name="skillArea"
                  value={formData.skillArea}
                  onChange={handleChange}
                  className="input-field mt-1 w-full rounded-xl px-4 py-3"
                >
                  <option value="">Select skill area</option>
                  <option value="TVET">Technical & Vocational (TVET)</option>
                  <option value="Digital">Digital / ICT</option>
                  <option value="Creative">Creative / Media</option>
                  <option value="Business">Business / Admin</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Hospitality">Hospitality / Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Experience Level
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="input-field mt-1 w-full rounded-xl px-4 py-3"
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="lookingFor" className="block text-sm font-medium text-[var(--text-secondary)]">
                  What are you looking for?
                </label>
                <select
                  id="lookingFor"
                  name="lookingFor"
                  value={formData.lookingFor}
                  onChange={handleChange}
                  className="input-field mt-1 w-full rounded-xl px-4 py-3"
                >
                  <option value="">Select option</option>
                  <option value="Job">Job / Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Apprenticeship">Apprenticeship / Attachment</option>
                  <option value="Remote">Remote / Freelance</option>
                  <option value="Training">Training / Upskilling</option>
                </select>
              </div>

              <div>
                <label htmlFor="cvLink" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Link to CV / Portfolio (optional)
                </label>
                <input
                  id="cvLink"
                  name="cvLink"
                  type="url"
                  value={formData.cvLink}
                  onChange={handleChange}
                  className="input-field mt-1 w-full rounded-xl px-4 py-3"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Briefly describe your skills
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="input-field mt-1 w-full rounded-xl px-4 py-3"
                  placeholder="Tell us about your skills and experience..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-secondary flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold"
                >
                  Next: Account Setup
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Account Setup */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Create Password
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field w-full rounded-xl py-3 pl-10 pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Minimum 6 characters. Use a mix of letters and numbers.
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Confirm Password
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field w-full rounded-xl py-3 pl-10 pr-4"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-[var(--border-color)] text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="agreeTerms" className="text-sm text-[var(--text-secondary)]">
                  I agree to NSAYƐ's{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Use</a>
                  {' '}and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-secondary flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <>
                      Create Account
                      <GraduationCap size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Login instead
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
