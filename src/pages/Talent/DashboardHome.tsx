// import DashboardHeader from "../../components/talent/dashboard/DashboardHeader";
import JobSearch from "../../components/talent/dashboard/JobSearch";
import JobFilters from "../../components/talent/dashboard/JobFilters";
import FeaturedJobs from "../../components/talent/dashboard/FeaturedJobs";
import PolicyAlerts from "../../components/talent/dashboard/PolicyAlerts";
import JobFeed from "../../components/talent/dashboard/JobFeed";

import SidePanel from "../../components/talent/dashboard/SidePanel";

const TalentDashboardHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-6 lg:px-8 xl:px-10">
        {/* Top dashboard header */}

        {/* Search */}
        <div className="mt-6">
          <JobSearch />
        </div>

        {/* Filters */}
        <div className="mt-4">
          <JobFilters />
        </div>

        {/* Dashboard content */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <main className="min-w-0 space-y-6">
            {/* Featured / promoted jobs slider */}
            <FeaturedJobs />

            {/* Platform / policy notifications */}
            <PolicyAlerts />

            {/* Job feed */}
            <JobFeed />
          </main>

          {/* Right dashboard islands */}
          <aside className="min-w-0">
            <SidePanel />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TalentDashboardHome;