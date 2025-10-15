'use client';

interface TaskTabsProps {
  activeTab: 'all' | 'active' | 'completed';
  onTabChange: (tab: 'all' | 'active' | 'completed') => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function TaskTabs({ activeTab, onTabChange, counts }: TaskTabsProps) {
  const tabs = [
    { id: 'all' as const, label: 'All Tasks', count: counts.all },
    { id: 'active' as const, label: 'Active', count: counts.active },
    { id: 'completed' as const, label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
            activeTab === tab.id
              ? 'border-pink-500 text-pink-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}

