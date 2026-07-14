export interface MutualFund {
  schemeCode: number;
  schemeName: string;
  nav: number;
  navDate: string;
  category?: string;
  fundHouse?: string;
  change1D?: number;
  change1W?: number;
  change1M?: number;
  change1Y?: number;
  returns1Y?: number;
  returns3Y?: number;
  returns5Y?: number;
  aum?: number;
  expenseRatio?: number;
  minInvestment?: number;
  riskLevel?: 'Low' | 'Moderate' | 'High';
}

export interface FundStats {
  totalFunds: number;
  positiveFunds: number;
  negativeFunds: number;
  lastUpdate: string;
}

export interface CategoryData {
  name: string;
  count: number;
  avgReturn: number;
  icon: string;
}
