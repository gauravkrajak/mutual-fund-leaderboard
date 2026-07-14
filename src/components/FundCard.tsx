import { MutualFund } from '../types';

interface FundCardProps {
  fund: MutualFund;
  rank?: number;
}

export default function FundCard({ fund, rank }: FundCardProps) {
  const isPositive = (fund.change1D || 0) >= 0;
  
  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMomentumIndicator = (change: number) => {
    if (change > 5) return '🚀';
    if (change > 2) return '📈';
    if (change > 0) return '↗️';
    if (change > -2) return '↘️';
    if (change > -5) return '📉';
    return '⚠️';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {rank && (
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              rank === 1 ? 'bg-yellow-100 text-yellow-700' :
              rank === 2 ? 'bg-gray-100 text-gray-700' :
              rank === 3 ? 'bg-orange-100 text-orange-700' :
              'bg-blue-50 text-blue-600'
            }`}>
              #{rank}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {fund.schemeName.length > 45 ? fund.schemeName.substring(0, 45) + '...' : fund.schemeName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{fund.fundHouse}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {fund.category}
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs">
          {getMomentumIndicator(fund.change1D || 0)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">NAV</p>
          <p className="text-lg font-bold text-gray-900">₹{fund.nav.toFixed(2)}</p>
          <p className="text-xs text-gray-400">{fund.navDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-0.5">1D Change</p>
          <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{fund.change1D?.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 py-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500">1W</p>
          <p className={`text-sm font-semibold ${(fund.change1W || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {(fund.change1W || 0) >= 0 ? '+' : ''}{fund.change1W?.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">1M</p>
          <p className={`text-sm font-semibold ${(fund.change1M || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {(fund.change1M || 0) >= 0 ? '+' : ''}{fund.change1M?.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">1Y</p>
          <p className={`text-sm font-semibold ${(fund.change1Y || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {(fund.change1Y || 0) >= 0 ? '+' : ''}{fund.change1Y?.toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Risk</p>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${getRiskColor(fund.riskLevel)}`}>
            {fund.riskLevel}
          </span>
        </div>
      </div>

      {fund.expenseRatio && (
        <div className="pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-600">
          <span>Expense: {fund.expenseRatio.toFixed(2)}%</span>
          <span>Min: ₹{fund.minInvestment?.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
