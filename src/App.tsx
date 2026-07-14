import { useState, useEffect, useMemo } from 'react';
import { MutualFund, CategoryData } from './types';
import { fetchAllFunds } from './services/api';
import StatCard from './components/StatCard';
import FundCard from './components/FundCard';
import CategoryCard from './components/CategoryCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';

const CATEGORIES: CategoryData[] = [
  { name: 'All Funds', count: 0, avgReturn: 0, icon: '📊' },
  { name: 'Small Cap', count: 0, avgReturn: 0, icon: '🚀' },
  { name: 'Mid Cap', count: 0, avgReturn: 0, icon: '📈' },
  { name: 'Large Cap', count: 0, avgReturn: 0, icon: '🏢' },
  { name: 'Flexi Cap', count: 0, avgReturn: 0, icon: '🔄' },
  { name: 'Multi Cap', count: 0, avgReturn: 0, icon: '🎯' },
  { name: 'ELSS', count: 0, avgReturn: 0, icon: '💰' },
  { name: 'Index', count: 0, avgReturn: 0, icon: '📉' },
  { name: 'Hybrid', count: 0, avgReturn: 0, icon: '⚖️' },
  { name: 'Sectoral', count: 0, avgReturn: 0, icon: '🏭' },
];

export default function App() {
  const [funds, setFunds] = useState<MutualFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Funds');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [sortBy, setSortBy] = useState<'1d' | '1w' | '1m' | '1y'>('1d');
  const [autoRefreshCountdown, setAutoRefreshCountdown] = useState(30);

  // Load funds data
  const loadFunds = async () => {
    try {
      setLoading(true);
      const data = await fetchAllFunds();
      setFunds(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading funds:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFunds();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadFunds();
      setAutoRefreshCountdown(30);
    }, 30000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setAutoRefreshCountdown(prev => prev > 0 ? prev - 1 : 30);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalFunds = funds.length;
    const positiveFunds = funds.filter(f => (f.change1D || 0) > 0).length;
    const negativeFunds = funds.filter(f => (f.change1D || 0) < 0).length;
    
    return {
      totalFunds,
      positiveFunds,
      negativeFunds,
      lastUpdate: getTimeAgo(lastUpdate),
    };
  }, [funds, lastUpdate]);

  // Update category data
  const categories = useMemo(() => {
    return CATEGORIES.map(cat => {
      if (cat.name === 'All Funds') {
        const avgReturn = funds.reduce((sum, f) => sum + (f.change1D || 0), 0) / (funds.length || 1);
        return { ...cat, count: funds.length, avgReturn };
      }
      
      const categoryFunds = funds.filter(f => f.category === cat.name);
      const avgReturn = categoryFunds.length > 0
        ? categoryFunds.reduce((sum, f) => sum + (f.change1D || 0), 0) / categoryFunds.length
        : 0;
      
      return { ...cat, count: categoryFunds.length, avgReturn };
    });
  }, [funds]);

  // Filter and sort funds
  const filteredFunds = useMemo(() => {
    let filtered = funds;

    // Filter by category
    if (selectedCategory !== 'All Funds') {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.schemeName.toLowerCase().includes(query) ||
        f.fundHouse?.toLowerCase().includes(query) ||
        f.category?.toLowerCase().includes(query)
      );
    }

    // Sort by selected metric
    filtered.sort((a, b) => {
      const aValue = sortBy === '1d' ? (a.change1D || 0) :
                     sortBy === '1w' ? (a.change1W || 0) :
                     sortBy === '1m' ? (a.change1M || 0) :
                     (a.change1Y || 0);
      const bValue = sortBy === '1d' ? (b.change1D || 0) :
                     sortBy === '1w' ? (b.change1W || 0) :
                     sortBy === '1m' ? (b.change1M || 0) :
                     (b.change1Y || 0);
      return bValue - aValue;
    });

    return filtered;
  }, [funds, selectedCategory, searchQuery, sortBy]);

  // Get top gainers and losers
  const topGainers = useMemo(() => {
    return [...funds].sort((a, b) => (b.change1D || 0) - (a.change1D || 0)).slice(0, 5);
  }, [funds]);

  const topLosers = useMemo(() => {
    return [...funds].sort((a, b) => (a.change1D || 0) - (b.change1D || 0)).slice(0, 5);
  }, [funds]);

  function getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MF Leaderboard</h1>
                <p className="text-sm text-gray-600">Real-time Mutual Fund Tracker</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Live</span>
                <span className="text-xs text-green-600 ml-1">({autoRefreshCountdown}s)</span>
              </div>
              <button
                onClick={() => {
                  loadFunds();
                  setAutoRefreshCountdown(30);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                disabled={loading}
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Funds"
            value={stats.totalFunds}
            icon={<span>📊</span>}
          />
          <StatCard
            title="Positive Today"
            value={stats.positiveFunds}
            trend="up"
            icon={<span>📈</span>}
          />
          <StatCard
            title="Negative Today"
            value={stats.negativeFunds}
            trend="down"
            icon={<span>📉</span>}
          />
          <StatCard
            title="Last Updated"
            value={stats.lastUpdate}
            icon={<span>🕐</span>}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search by fund name, AMC, or category..."
          />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
              <CategoryCard
                key={cat.name}
                {...cat}
                onClick={() => setSelectedCategory(cat.name)}
                isSelected={selectedCategory === cat.name}
              />
            ))}
          </div>
        </div>

        {/* Top Gainers & Losers */}
        {!searchQuery && selectedCategory === 'All Funds' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏆</span>
                <h2 className="text-xl font-bold text-gray-900">Top Gainers</h2>
              </div>
              <div className="space-y-3">
                {topGainers.map((fund, idx) => (
                  <FundCard key={fund.schemeCode} fund={fund} rank={idx + 1} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚠️</span>
                <h2 className="text-xl font-bold text-gray-900">Top Losers</h2>
              </div>
              <div className="space-y-3">
                {topLosers.map((fund, idx) => (
                  <FundCard key={fund.schemeCode} fund={fund} rank={idx + 1} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory} Leaderboard
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredFunds.length} funds)
              </span>
            </h2>
            <div className="flex gap-2">
              {(['1d', '1w', '1m', '1y'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSortBy(period)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : filteredFunds.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No funds found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredFunds.map((fund, idx) => (
                <FundCard key={fund.schemeCode} fund={fund} rank={idx + 1} />
              ))}
            </div>
          )}
        </div>

        {/* Market Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Real-time Updates</h3>
              <p className="text-sm text-blue-700">
                Data is automatically refreshed every 30 seconds. NAV data is sourced from MFAPI and updated multiple times daily.
                Past performance is not indicative of future results. Please consult with a financial advisor before investing.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 MF Leaderboard. Data powered by MFAPI.</p>
            <p className="mt-1">Real-time mutual fund tracking for informed investment decisions.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
