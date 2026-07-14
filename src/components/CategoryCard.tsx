interface CategoryCardProps {
  name: string;
  count: number;
  avgReturn: number;
  icon: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function CategoryCard({ name, count, avgReturn, icon, onClick, isSelected }: CategoryCardProps) {
  const isPositive = avgReturn >= 0;
  
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left w-full hover:shadow-lg hover:-translate-y-1 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? '+' : ''}{avgReturn.toFixed(1)}%
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-gray-600">{count} Funds</p>
    </button>
  );
}
