import { TabType } from "@/types";
import { Home, LineChart, Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="h-5 w-5 mr-2" />,
    },
    {
      id: "interests",
      label: "Career Interests",
      icon: <LineChart className="h-5 w-5 mr-2" />,
    },
    {
      id: "networking",
      label: "Networking",
      icon: <Users className="h-5 w-5 mr-2" />,
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: <Briefcase className="h-5 w-5 mr-2" />,
    },
  ];

  return (
    <nav className="bg-white dark:bg-[#283E4A] border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
        <div className="flex space-x-1 sm:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-4 px-2 sm:px-6 font-medium border-b-2 transition-colors duration-200 focus:outline-none",
                activeTab === tab.id
                  ? "text-[#0A66C2] border-[#0A66C2]"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border-transparent"
              )}
            >
              <div className="flex items-center">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
