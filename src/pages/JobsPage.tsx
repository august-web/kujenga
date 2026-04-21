import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Search, CheckCircle, Star, Building, Plus, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const JobsPage: React.FC = () => {
  const { jobs, applications, user, applyForJob, completeJob, createJob } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    category: 'instant' as 'instant' | 'formal' | 'bid',
    location: '',
    payment: 0
  });

  const categories = [
    { value: 'all', label: 'All Jobs' },
    { value: 'instant', label: 'Instant Gigs' },
    { value: 'formal', label: 'Formal Jobs' },
    { value: 'bid', label: 'Project Bids' }
  ];

  const userApplications = applications.filter(a => a.userId === user?.id);

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && job.status === 'open';
  });

  const getApplication = (jobId: string) => {
    return userApplications.find(a => a.jobId === jobId);
  };

  const handleApply = (jobId: string) => {
    applyForJob(jobId);
  };

  const handleCompleteJob = (applicationId: string) => {
    setShowRatingModal(applicationId);
  };

  const submitRating = () => {
    if (showRatingModal) {
      completeJob(showRatingModal, rating, review);
      setShowRatingModal(null);
      setRating(5);
      setReview('');
    }
  };

  const handleCreateJob = () => {
    if (user) {
      createJob({
        ...newJob,
        employerId: user.id,
        employerName: user.fullName,
        employerVerified: user.verified
      });
      setShowCreateModal(false);
      setNewJob({ title: '', description: '', category: 'instant', location: '', payment: 0 });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'instant': return '⚡';
      case 'formal': return '💼';
      case 'bid': return '📋';
      default: return '📌';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'instant': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'formal': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'bid': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Jobs & Gigs</h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Find opportunities that match your skills
          </p>
        </div>
        {(user?.role === 'employer' || user?.verified) && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2 rounded-xl px-4 py-2.5"
          >
            <Plus size={20} />
            Post a Job
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full rounded-xl py-2.5 pl-10 pr-4"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Job Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
              ⚡
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {jobs.filter(j => j.category === 'instant' && j.status === 'open').length}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Instant Gigs</p>
            </div>
          </div>
        </div>
        <div className="card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              💼
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {jobs.filter(j => j.category === 'formal' && j.status === 'open').length}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Formal Jobs</p>
            </div>
          </div>
        </div>
        <div className="card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              📋
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {jobs.filter(j => j.category === 'bid' && j.status === 'open').length}
              </p>
              <p className="text-sm text-[var(--text-muted)]">Project Bids</p>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const application = getApplication(job.id);
          const hasApplied = !!application;

          return (
            <div key={job.id} className="card rounded-2xl p-6 transition-all hover:-translate-y-0.5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(job.category)}`}>
                      {getCategoryIcon(job.category)} {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                    </span>
                    {job.employerVerified && (
                      <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <CheckCircle size={12} />
                        Verified Employer
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">{job.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{job.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
                    <span className="flex items-center gap-1">
                      <Building size={16} />
                      {job.employerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      Posted today
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <p className="text-sm text-[var(--text-muted)]">
                      {job.category === 'formal' ? 'Monthly Salary' : 'Payment'}
                    </p>
                    <p className="text-2xl font-bold text-primary-600">KES {job.payment.toLocaleString()}</p>
                  </div>

                  {!hasApplied ? (
                    <button
                      onClick={() => handleApply(job.id)}
                      className="btn-primary rounded-lg px-6 py-2.5 font-medium"
                    >
                      Apply Now
                    </button>
                  ) : application.status === 'pending' ? (
                    <button className="rounded-lg bg-yellow-100 px-6 py-2.5 font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                      <Clock size={16} className="mr-1 inline" />
                      Pending Review
                    </button>
                  ) : application.status === 'accepted' ? (
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-green-100 px-4 py-2.5 font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle size={16} className="mr-1 inline" />
                        Accepted
                      </button>
                      <button
                        onClick={() => handleCompleteJob(application.id)}
                        className="btn-primary rounded-lg px-4 py-2.5 font-medium"
                      >
                        Mark Complete
                      </button>
                    </div>
                  ) : application.status === 'completed' ? (
                    <div className="text-right">
                      <button className="rounded-lg bg-green-100 px-4 py-2.5 font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle size={16} className="mr-1 inline" />
                        Completed
                      </button>
                      {application.rating && (
                        <div className="mt-2 flex items-center justify-end gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < application.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="card rounded-2xl p-12 text-center">
          <Briefcase size={48} className="mx-auto text-[var(--text-muted)]" />
          <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">No jobs found</h3>
          <p className="mt-2 text-[var(--text-secondary)]">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card w-full max-w-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Post a New Job</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-1 hover:bg-[var(--bg-secondary)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)]">Job Title</label>
                <input
                  type="text"
                  value={newJob.title}
                  onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                  className="input-field mt-1 w-full rounded-xl py-2.5 px-4"
                  placeholder="e.g., Website Developer Needed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)]">Description</label>
                <textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field mt-1 w-full rounded-xl py-2.5 px-4"
                  rows={3}
                  placeholder="Describe the job requirements..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">Category</label>
                  <select
                    value={newJob.category}
                    onChange={(e) => setNewJob(prev => ({ ...prev, category: e.target.value as any }))}
                    className="input-field mt-1 w-full rounded-xl py-2.5 px-4"
                  >
                    <option value="instant">Instant Gig</option>
                    <option value="formal">Formal Job</option>
                    <option value="bid">Project Bid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)]">Payment (KES)</label>
                  <input
                    type="number"
                    value={newJob.payment || ''}
                    onChange={(e) => setNewJob(prev => ({ ...prev, payment: Number(e.target.value) }))}
                    className="input-field mt-1 w-full rounded-xl py-2.5 px-4"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)]">Location</label>
                <input
                  type="text"
                  value={newJob.location}
                  onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  className="input-field mt-1 w-full rounded-xl py-2.5 px-4"
                  placeholder="e.g., Nairobi, Remote"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn-secondary flex-1 rounded-lg px-4 py-3 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateJob}
                className="btn-primary flex-1 rounded-lg px-4 py-3 font-medium"
              >
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card w-full max-w-md rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Rate this Job</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">How was your experience?</p>

            <div className="mt-6">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Rating</label>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star
                      size={32}
                      className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Review (optional)</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="input-field mt-1 w-full rounded-xl py-2.5 px-4"
                rows={3}
                placeholder="Share your experience..."
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowRatingModal(null)}
                className="btn-secondary flex-1 rounded-lg px-4 py-3 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                className="btn-primary flex-1 rounded-lg px-4 py-3 font-medium"
              >
                Submit & Get Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
