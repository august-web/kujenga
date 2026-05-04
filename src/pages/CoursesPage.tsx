import React, { useState } from 'react';
import { BookOpen, Clock, Award, CheckCircle, Play, ChevronRight, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CoursesPage: React.FC = () => {
  const { courses, enrollments, user, enrollInCourse, updateProgress, completeCourse } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const categories = ['all', 'Technology', 'Green Economy', 'Digital Services', 'Business Skills', 'Agriculture'];

  const userEnrollments = enrollments.filter(e => e.userId === user?.id);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getEnrollment = (courseId: string) => {
    return userEnrollments.find(e => e.courseId === courseId);
  };

  const handleEnroll = (courseId: string) => {
    enrollInCourse(courseId);
  };

  const handleContinue = (enrollmentId: string, currentProgress: number) => {
    const newProgress = Math.min(currentProgress + 20, 100);
    if (newProgress === 100) {
      completeCourse(enrollmentId);
    } else {
      updateProgress(enrollmentId, newProgress);
    }
  };

  const courseDetails = selectedCourse ? courses.find(c => c.id === selectedCourse) : null;
  const courseEnrollment = selectedCourse ? getEnrollment(selectedCourse) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">Learn & Earn</h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Develop new skills and earn rewards upon completion
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full rounded-xl py-2.5 pl-10 pr-4"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {category === 'all' ? 'All Courses' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const enrollment = getEnrollment(course.id);
          const isEnrolled = !!enrollment;
          const isCompleted = enrollment?.completed;

          return (
            <div
              key={course.id}
              className="card group overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
            >
              {/* Course Image/Icon */}
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30">
                <span className="text-6xl">{course.image}</span>
                {isCompleted && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
                    <Award size={14} />
                    Certified
                  </div>
                )}
                {isEnrolled && !isCompleted && (
                  <div className="absolute right-3 top-3 rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                    In Progress
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--bg-tertiary)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                    {course.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Clock size={12} />
                    {course.duration}
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-primary-600">
                  {course.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
                  {course.description}
                </p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">{course.modules} modules</p>

                {/* Progress Bar (if enrolled) */}
                {isEnrolled && !isCompleted && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-muted)]">Progress</span>
                      <span className="font-medium text-[var(--text-primary)]">{enrollment.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                      <div 
                        className="h-full rounded-full bg-primary-500 transition-all duration-500"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedCourse(course.id)}
                    className="btn-secondary flex-1 rounded-lg px-4 py-2 text-sm font-medium"
                  >
                    View Details
                  </button>
                  {!isEnrolled ? (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="btn-primary flex-1 rounded-lg px-4 py-2 text-sm font-medium"
                    >
                      Enroll Free
                    </button>
                  ) : isCompleted ? (
                    <button className="flex-1 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle size={16} className="mr-1 inline" />
                      Completed
                    </button>
                  ) : (
                    <button
                      onClick={() => handleContinue(enrollment.id, enrollment.progress)}
                      className="btn-primary flex-1 rounded-lg px-4 py-2 text-sm font-medium"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="card rounded-2xl p-12 text-center">
          <BookOpen size={48} className="mx-auto text-[var(--text-muted)]" />
          <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">No courses found</h3>
          <p className="mt-2 text-[var(--text-secondary)]">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Course Detail Modal */}
      {courseDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl">
            {/* Modal Header */}
            <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30">
              <span className="text-8xl">{courseDetails.image}</span>
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[var(--text-primary)] hover:bg-white"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[var(--bg-tertiary)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                  {courseDetails.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Clock size={12} />
                  {courseDetails.duration}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <BookOpen size={12} />
                  {courseDetails.modules} modules
                </span>
              </div>

              <h2 className="mt-4 text-xl font-bold text-[var(--text-primary)]">{courseDetails.title}</h2>
              <p className="mt-2 text-[var(--text-secondary)]">{courseDetails.description}</p>

              {/* Course Modules */}
              <div className="mt-6">
                <h3 className="font-semibold text-[var(--text-primary)]">Course Content</h3>
                <div className="mt-3 space-y-2">
                  {[...Array(courseDetails.modules)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg bg-[var(--bg-secondary)] p-3"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        courseEnrollment && (courseEnrollment.progress / 100) * courseDetails.modules > index
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                      }`}>
                        {courseEnrollment && (courseEnrollment.progress / 100) * courseDetails.modules > index ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Play size={16} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[var(--text-primary)]">Module {index + 1}</p>
                        <p className="text-xs text-[var(--text-muted)]">10-15 minutes</p>
                      </div>
                      <ChevronRight size={16} className="text-[var(--text-muted)]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              <div className="mt-6 rounded-xl bg-primary-50 p-4 dark:bg-primary-900/20">
                <h3 className="font-semibold text-primary-700 dark:text-primary-400">Completion Rewards</h3>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award size={20} className="text-primary-600" />
                    <span className="text-sm text-primary-700 dark:text-primary-400">Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    <span className="text-sm text-primary-700 dark:text-primary-400">KES 500 Bonus</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="btn-secondary flex-1 rounded-lg px-4 py-3 font-medium"
                >
                  Close
                </button>
                {!courseEnrollment ? (
                  <button
                    onClick={() => {
                      handleEnroll(courseDetails.id);
                      setSelectedCourse(null);
                    }}
                    className="btn-primary flex-1 rounded-lg px-4 py-3 font-medium"
                  >
                    Enroll Now - Free
                  </button>
                ) : courseEnrollment.completed ? (
                  <button className="flex-1 rounded-lg bg-green-100 px-4 py-3 font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <Award size={16} className="mr-2 inline" />
                    View Certificate
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleContinue(courseEnrollment.id, courseEnrollment.progress);
                      setSelectedCourse(null);
                    }}
                    className="btn-primary flex-1 rounded-lg px-4 py-3 font-medium"
                  >
                    Continue Learning
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
