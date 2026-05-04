import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, BookOpen, Briefcase, Gift, CreditCard, Download } from 'lucide-react';
import { useStore } from '../store/useStore';

export const WalletPage: React.FC = () => {
  const { user, transactions } = useStore();
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

  const userTransactions = transactions.filter(t => t.userId === user?.id);
  const filteredTransactions = filter === 'all' 
    ? userTransactions 
    : userTransactions.filter(t => t.type === filter);

  const totalEarned = userTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = userTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'job': return <Briefcase size={20} className="text-purple-500" />;
      case 'course': return <BookOpen size={20} className="text-blue-500" />;
      case 'bonus': return <Gift size={20} className="text-yellow-500" />;
      case 'transfer': return <CreditCard size={20} className="text-green-500" />;
      default: return <Wallet size={20} className="text-gray-500" />;
    }
  };

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'job': return 'Job Payment';
      case 'course': return 'Course Reward';
      case 'bonus': return 'Bonus';
      case 'transfer': return 'Transfer';
      default: return source;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">My Wallet</h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Manage your earnings and transactions
        </p>
      </div>

      {/* Balance Cards */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Main Balance */}
        <div className="card col-span-full rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white lg:col-span-1">
          <div className="flex items-center justify-between">
            <Wallet size={24} className="opacity-80" />
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm">KES</span>
          </div>
          <div className="mt-6">
            <p className="text-sm text-white/80">Available Balance</p>
            <p className="mt-1 text-4xl font-bold">KES {user?.walletBalance?.toLocaleString() || '0'}</p>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded-lg bg-white/20 px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-white/30">
              <Download size={16} className="mr-2 inline" />
              Withdraw
            </button>
            <button className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-primary-700 transition-colors hover:bg-white/90">
              <ArrowUpRight size={16} className="mr-2 inline" />
              Transfer
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
              <ArrowDownLeft size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Total Earned</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">KES {totalEarned.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>+KES {totalEarned > 0 ? totalEarned.toLocaleString() : '0'} this month</span>
          </div>
        </div>

        <div className="card rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-muted)]">Credit Score</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{user?.creditScore || 0}/100</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ width: `${user?.creditScore || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Briefcase size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                KES {userTransactions.filter(t => t.source === 'job' && t.type === 'credit').reduce((s, t) => s + t.amount, 0).toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-muted)]">From Jobs</p>
            </div>
          </div>
        </div>
        <div className="card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                KES {userTransactions.filter(t => t.source === 'course' && t.type === 'credit').reduce((s, t) => s + t.amount, 0).toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-muted)]">From Courses</p>
            </div>
          </div>
        </div>
        <div className="card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
              <Gift size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                KES {userTransactions.filter(t => t.source === 'bonus' && t.type === 'credit').reduce((s, t) => s + t.amount, 0).toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-muted)]">From Bonuses</p>
            </div>
          </div>
        </div>
        <div className="card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <ArrowUpRight size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                KES {totalSpent.toLocaleString()}
              </p>
              <p className="text-xs text-[var(--text-muted)]">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card rounded-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Transaction History</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('credit')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === 'credit'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)]'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilter('debit')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === 'debit'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'text-[var(--text-primary)] font-medium hover:bg-[var(--bg-secondary)]'
              }`}
            >
              Expenses
            </button>
          </div>
        </div>

        <div className="divide-y divide-[var(--border-color)]">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center gap-4 p-4 hover:bg-[var(--bg-secondary)] transition-colors">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  txn.type === 'credit' 
                    ? 'bg-green-100 dark:bg-green-900/30' 
                    : 'bg-red-100 dark:bg-red-900/30'
                }`}>
                  {txn.type === 'credit' ? (
                    <ArrowDownLeft size={20} className="text-green-600" />
                  ) : (
                    <ArrowUpRight size={20} className="text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text-primary)] truncate">{txn.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getSourceIcon(txn.source)}
                    <span className="text-sm text-[var(--text-muted)]">{getSourceLabel(txn.source)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.type === 'credit' ? '+' : '-'}KES {txn.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {formatDate(txn.createdAt)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Wallet size={48} className="mx-auto text-[var(--text-muted)]" />
              <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">No transactions yet</h3>
              <p className="mt-2 text-[var(--text-secondary)]">
                Complete courses or jobs to start earning
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Card */}
      <div className="mt-8 card rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 p-6 dark:from-primary-900/20 dark:to-primary-800/20">
        <h3 className="font-semibold text-primary-800 dark:text-primary-300">💡 Tips to Earn More</h3>
        <ul className="mt-4 space-y-2 text-sm text-primary-700 dark:text-primary-400">
          <li className="flex items-start gap-2">
            <span className="text-primary-500">•</span>
            Complete courses to earn KES 500 per certification
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500">•</span>
            Apply for instant gigs for quick daily earnings
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500">•</span>
            Maintain a high credit score to unlock premium jobs
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-500">•</span>
            Refer friends and earn bonuses when they complete courses
          </li>
        </ul>
      </div>
    </div>
  );
};
