import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import Header from "./components/layout/Header";
import TabNavigation from "./components/layout/TabNavigation";
import { TabType } from "./types";
import HomeTab from "./pages/HomeTab";
import InterestsTab from "./pages/InterestsTab";
import NetworkingTab from "./pages/NetworkingTab";
import JobsTab from "./pages/JobsTab";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onProceed={() => setActiveTab("interests")} />;
      case "interests":
        return (
          <InterestsTab 
            onBack={() => setActiveTab("home")} 
            onNext={() => setActiveTab("networking")} 
          />
        );
      case "networking":
        return (
          <NetworkingTab 
            onBack={() => setActiveTab("interests")} 
            onNext={() => setActiveTab("jobs")} 
          />
        );
      case "jobs":
        return (
          <JobsTab 
            onBack={() => setActiveTab("networking")} 
            onHome={() => setActiveTab("home")} 
          />
        );
      default:
        return <HomeTab onProceed={() => setActiveTab("interests")} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#F3F2EF] dark:bg-gray-900">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="container mx-auto py-6 px-4 pb-16">
          {renderActiveTab()}
        </main>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
