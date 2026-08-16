import ProfileCard from "./ProfileCard";
import RecommendedSkillsCard from "./RecommendedSkillsCard";
import RecentActivityCard from "./RecentActivityCard";
import AdsCard from "./AdsCard";

const SidePanel = () => {
  return (
    <div className="space-y-5">
      <AdsCard />

      <ProfileCard />

      <RecommendedSkillsCard />

      <RecentActivityCard />
    </div>
  );
};

export default SidePanel;