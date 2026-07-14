# 📊 MF Leaderboard - Real-time Mutual Fund Tracker

Real-time mutual fund tracking application with live NAV updates, performance analytics, and smart comparison tools.

## ✨ Features

### 🔴 **LIVE DATA UPDATES** 
- ✅ **Auto-refresh every 30 seconds** - Data automatically updates
- ✅ **Real-time NAV** - Latest NAV from MFAPI
- ✅ **Live statistics** - Positive/negative fund counts update in real-time
- ✅ **Performance tracking** - 1D, 1W, 1M, 1Y returns

### 📈 Performance Analytics
- Top Gainers & Losers (real-time)
- Category-wise performance breakdown
- Momentum indicators (🚀 📈 ↗️ ↘️ 📉)
- Multi-period returns (1 day, 1 week, 1 month, 1 year)

### 🔍 Smart Features
- **Search**: Search by fund name, AMC, or category
- **Filters**: Category-wise filtering (Small Cap, Mid Cap, Large Cap, etc.)
- **Sorting**: Sort by 1D, 1W, 1M, 1Y performance
- **Risk Indicators**: Low, Moderate, High risk classification

### 📱 User Experience
- Responsive design (mobile, tablet, desktop)
- Beautiful gradient UI
- Live status indicator
- Manual refresh button
- Loading states and animations

## 🚀 Live Updates

The app automatically:
1. **Fetches data** from MFAPI every 30 seconds
2. **Updates NAV** values in real-time
3. **Recalculates** statistics and rankings
4. **Shows timestamp** of last update
5. **Displays live indicator** (green pulsing dot)

## 🎯 Categories Covered

- 📊 All Funds
- 🚀 Small Cap
- 📈 Mid Cap  
- 🏢 Large Cap
- 🔄 Flexi Cap
- 🎯 Multi Cap
- 💰 ELSS
- 📉 Index Funds
- ⚖️ Hybrid
- 🏭 Sectoral

## 🔧 Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **MFAPI** - Mutual fund data API

## 📊 Data Source

Data is sourced from [MFAPI.in](https://www.mfapi.in) - India's free mutual fund API:
- Updated 6x daily
- No authentication required
- Complete historical NAV data
- 18,000+ schemes covered

## 🎨 UI Highlights

- **Live Status Indicator** - Green pulsing dot shows real-time updates
- **Color-coded Performance** - Green for positive, red for negative returns
- **Rank Badges** - Gold, silver, bronze for top 3 performers
- **Risk Labels** - Color-coded risk indicators
- **Responsive Grid** - Adaptive layout for all screen sizes

## 💡 How to Use

1. **Browse**: View all funds or filter by category
2. **Search**: Type fund name, AMC, or category
3. **Sort**: Click 1D/1W/1M/1Y to sort by different periods
4. **Refresh**: Manual refresh anytime or wait 30s for auto-update
5. **Compare**: View top gainers and losers side by side

## ⚙️ Auto-Refresh Settings

- **Interval**: 30 seconds
- **Cache Duration**: 5 minutes per fund
- **Concurrent Requests**: Optimized batch fetching
- **Error Handling**: Graceful degradation on API failures

## 🔄 Update Cycle

```
Initial Load → Display Data → Wait 30s → Auto Refresh → Update UI → Repeat
```

## 📝 Notes

- Data is cached for 5 minutes to reduce API calls
- NAV updates happen multiple times daily from AMFI
- Past performance is not indicative of future results
- Always consult a financial advisor before investing

## 🌟 Key Improvements

### Fixed Issues:
✅ **Live data now updates automatically every 30 seconds**  
✅ Real-time NAV fetching from API  
✅ Auto-refresh without page reload  
✅ Live statistics calculation  
✅ Performance tracking across multiple time periods  
✅ Responsive and modern UI  

---

**Built with ❤️ for Indian investors**
