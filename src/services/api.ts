import { MutualFund } from '../types';

const API_BASE = 'https://api.mfapi.in/mf';

// Popular fund scheme codes for demo
const POPULAR_SCHEMES = [
  119551, // Axis Bluechip Fund
  118989, // ICICI Pru Bluechip Fund
  120503, // SBI Bluechip Fund
  119597, // Axis Midcap Fund
  120608, // SBI Small Cap Fund
  118825, // HDFC Flexi Cap Fund
  120594, // Parag Parikh Flexi Cap Fund
  122639, // Quant Small Cap Fund
  100127, // UTI Nifty Index Fund
  120716, // ICICI Pru Technology Fund
  119551, // Axis Bluechip
  148974, // Nippon India Small Cap
  112090, // HDFC Mid-Cap Opportunities
  125497, // Kotak Equity Opportunities
  101206, // SBI Magnum Mid Cap
  120829, // Mirae Asset Large Cap
  118989, // ICICI Pru Bluechip
  149109, // Nippon India Multi Cap
  119900, // Axis Small Cap Fund
  102885, // DSP Equity Opportunities Fund
];

// Cache for fund data
const fundCache: Map<number, { data: any; timestamp: number }> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Categorize funds based on name keywords
function categorizeFund(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('small cap')) return 'Small Cap';
  if (lowerName.includes('mid cap') || lowerName.includes('midcap')) return 'Mid Cap';
  if (lowerName.includes('large cap') || lowerName.includes('bluechip') || lowerName.includes('blue chip')) return 'Large Cap';
  if (lowerName.includes('flexi cap') || lowerName.includes('flexicap')) return 'Flexi Cap';
  if (lowerName.includes('multi cap') || lowerName.includes('multicap')) return 'Multi Cap';
  if (lowerName.includes('elss') || lowerName.includes('tax saver')) return 'ELSS';
  if (lowerName.includes('index') || lowerName.includes('nifty') || lowerName.includes('sensex')) return 'Index';
  if (lowerName.includes('hybrid') || lowerName.includes('balanced')) return 'Hybrid';
  if (lowerName.includes('debt') || lowerName.includes('bond') || lowerName.includes('gilt')) return 'Debt';
  if (lowerName.includes('technology') || lowerName.includes('pharma') || lowerName.includes('banking')) return 'Sectoral';
  return 'Equity';
}

function getRiskLevel(category: string): 'Low' | 'Moderate' | 'High' {
  switch (category) {
    case 'Small Cap':
    case 'Sectoral':
      return 'High';
    case 'Mid Cap':
    case 'Flexi Cap':
    case 'Multi Cap':
      return 'Moderate';
    default:
      return 'Low';
  }
}

function extractFundHouse(name: string): string {
  const houses = [
    'HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'UTI', 'Aditya Birla', 'Nippon',
    'Mirae Asset', 'DSP', 'Franklin', 'Tata', 'L&T', 'Invesco', 'IDFC',
    'Edelweiss', 'Motilal Oswal', 'Parag Parikh', 'Quant', 'PGIM', 'Sundaram'
  ];
  
  for (const house of houses) {
    if (name.includes(house)) return house;
  }
  
  return name.split(' ')[0];
}

// Calculate percentage change from NAV history
function calculateChange(navHistory: any[]): { change1D: number; change1W: number; change1M: number; change1Y: number } {
  if (!navHistory || navHistory.length < 2) {
    return { change1D: 0, change1W: 0, change1M: 0, change1Y: 0 };
  }

  const latest = parseFloat(navHistory[0].nav);
  const oneDayAgo = navHistory[1] ? parseFloat(navHistory[1].nav) : latest;
  const oneWeekAgo = navHistory[5] ? parseFloat(navHistory[5].nav) : latest;
  const oneMonthAgo = navHistory[20] ? parseFloat(navHistory[20].nav) : latest;
  const oneYearAgo = navHistory[250] ? parseFloat(navHistory[250].nav) : latest;

  return {
    change1D: ((latest - oneDayAgo) / oneDayAgo) * 100,
    change1W: ((latest - oneWeekAgo) / oneWeekAgo) * 100,
    change1M: ((latest - oneMonthAgo) / oneMonthAgo) * 100,
    change1Y: ((latest - oneYearAgo) / oneYearAgo) * 100,
  };
}

export async function fetchFundData(schemeCode: number): Promise<any> {
  // Check cache
  const cached = fundCache.get(schemeCode);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(`${API_BASE}/${schemeCode}`);
  if (!response.ok) throw new Error('Failed to fetch fund data');
  
  const data = await response.json();
  
  // Cache the data
  fundCache.set(schemeCode, { data, timestamp: Date.now() });
  
  return data;
}

export async function fetchAllFunds(): Promise<MutualFund[]> {
  try {
    const promises = POPULAR_SCHEMES.map(async (code) => {
      try {
        const data = await fetchFundData(code);
        if (data.status === 'SUCCESS' && data.data && data.data.length > 0) {
          const meta = data.meta;
          const navHistory = data.data;
          const category = categorizeFund(meta.scheme_name);
          const changes = calculateChange(navHistory);
          
          return {
            schemeCode: parseInt(meta.scheme_code),
            schemeName: meta.scheme_name,
            nav: parseFloat(navHistory[0].nav),
            navDate: navHistory[0].date,
            category,
            fundHouse: extractFundHouse(meta.scheme_name),
            ...changes,
            returns1Y: changes.change1Y,
            returns3Y: changes.change1Y * 2.8, // Approximation
            returns5Y: changes.change1Y * 4.5, // Approximation
            aum: Math.random() * 10000 + 500, // Mock data
            expenseRatio: Math.random() * 1.5 + 0.5,
            minInvestment: category === 'Small Cap' || category === 'Mid Cap' ? 5000 : 1000,
            riskLevel: getRiskLevel(category),
          } as MutualFund;
        }
        return null;
      } catch (error) {
        console.error(`Error fetching scheme ${code}:`, error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    return results.filter((fund): fund is MutualFund => fund !== null);
  } catch (error) {
    console.error('Error fetching funds:', error);
    return [];
  }
}

export async function searchFunds(query: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    return await response.json();
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}
