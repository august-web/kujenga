import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Camera, Edit2, Save, X, Award, Briefcase, BookOpen, Wallet, Shield, Star, CheckCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, enrollments, applications, transactions } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    location: user?.location || '',
    skills: user?.skills?.join(', ') || ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userEnrollments = enrollments.filter(e => e.userId === user?.id);
  const userApplications = applications.filter(a => a.userId === user?.id);
  const userTransactions = transactions.filter(t => t.userId === user?.id);

  const completedCourses = userEnrollments.filter(e => e.completed).length;
  const completedJobs = userApplications.filter(a => a.status === 'completed').length;
  const totalEarned = userTransactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({
      fullName: editedProfile.fullName,
      phone: editedProfile.phone,
      location: editedProfile.location,
      skills: editedProfile.skills.split(',').map(s => s.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      location: user?.location || '',
      skills: user?.skills?.join(', ') || ''
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Courses Completed', value: completedCourses, icon: BookOpen, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { label: 'Jobs Completed', value: completedJobs, icon: Briefcase, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { label: 'Total Earned', value: `KES ${totalEarned.toLocaleString()}`, icon: Wallet, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    { label: 'Credit Score', value: `${user?.creditScore}/100`, icon: Star, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="card overflow-hidden rounded-2xl">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-primary-500 via-primary-600 to-earth-600 sm:h-40"></div>
        
        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-6 sm:-top-20">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-2xl border-4 border-[var(--card-bg)] bg-[var(--card-bg)] shadow-lg sm:h-32 sm:w-32">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600 text-4xl font-bold text-white">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white shadow-lg transition-colors hover:bg-primary-600"
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end pt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="btn-secondary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="mt-8 sm:mt-4">
            <div className="flex flex-wrap items-center gap-3">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.fullName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, fullName: e.target.value }))}
                  className="input-field rounded-lg px-3 py-1.5 text-xl font-bold"
                />
              ) : (
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">{user?.fullName}</h1>
              )}
              <div className="flex gap-2">
                <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 capitalize">
                  {user?.role}
                </span>
                {user?.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <Mail size={18} className="text-[var(--text-muted)]" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <Phone size={18} className="text-[var(--text-muted)]" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="input-field rounded-lg px-3 py-1.5"
                    placeholder="+254 7XX XXX XXX"
                  />
                ) : (
                  <span>{user?.phone || 'Not provided'}</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                <MapPin size={18} className="text-[var(--text-muted)]" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                    className="input-field rounded-lg px-3 py-1.5"
                    placeholder="City, Country"
                  />
                ) : (
                  <span>{user?.location || 'Not provided'}</span>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-[var(--text-muted)]">Skills</h3>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.skills}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, skills: e.target.value }))}
                  className="input-field mt-2 w-full rounded-lg px-3 py-2"
                  placeholder="Comma-separated skills (e.g., Web Development, Design)"
                />
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {user?.skills && user.skills.length > 0 ? (
                    user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-sm text-[var(--text-secondary)]"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[var(--text-muted)]">No skills added yet</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</p>
                  <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Credit Score Card */}
      <div className="mt-6 card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">NSAYƐ Credit Score</h2>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-primary-500" />
            <span className="text-2xl font-bold text-primary-600">{user?.creditScore}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 transition-all duration-500"
              style={{ width: `${user?.creditScore}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-[var(--text-muted)]">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-[var(--bg-secondary)] p-4">
          <h3 className="font-medium text-[var(--text-primary)]">How to improve your score:</h3>
          <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              Complete courses and earn certificates (+5 points)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              Successfully complete jobs (+10 points)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              Get 5-star ratings from employers (+3 points)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary-500">✓</span>
              Verify your identity (+15 points)
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 card rounded-2xl">
        <div className="border-b border-[var(--border-color)] p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Recent Certificates</h2>
        </div>
        <div className="p-6">
          {userEnrollments.filter(e => e.certificateEarned).length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {userEnrollments
                .filter(e => e.certificateEarned)
                .slice(0, 4)
                .map((enrollment) => {
                  const course = useStore.getState().courses.find(c => c.id === enrollment.courseId);
                  return (
                    <div key={enrollment.id} className="flex items-center gap-4 rounded-xl bg-[var(--bg-secondary)] p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-2xl dark:bg-primary-900/30">
                        {course?.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--text-primary)] truncate">{course?.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Award size={14} className="text-primary-500" />
                          <span className="text-xs text-primary-600 dark:text-primary-400">Certificate Earned</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award size={48} className="mx-auto text-[var(--text-muted)]" />
              <h3 className="mt-4 font-medium text-[var(--text-primary)]">No certificates yet</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Complete courses to earn certificates</p>
            </div>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div className="mt-6 card rounded-2xl">
        <div className="border-b border-[var(--border-color)] p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Account Settings</h2>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-[var(--text-primary)]">Email Notifications</p>
              <p className="text-sm text-[var(--text-muted)]">Receive updates about jobs and courses</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-[var(--bg-tertiary)] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-[var(--text-primary)]">SMS Notifications</p>
              <p className="text-sm text-[var(--text-muted)]">Get text alerts for urgent updates</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-[var(--bg-tertiary)] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-[var(--text-primary)]">Profile Visibility</p>
              <p className="text-sm text-[var(--text-muted)]">Allow employers to find you</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-[var(--bg-tertiary)] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
