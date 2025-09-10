import { useState } from "react";
import { CampaignsTable } from "@/components/campaigns/campaigns-table";
import { CampaignDetailSheet } from "@/components/campaigns/campaign-detail-sheet";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  leads: number;
  contacted: number;
  replied: number;
  interested: number;
  responseRate: number;
  startDate: string;
  endDate?: string;
  progress: number;
  template: string;
}

const Campaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCampaignSelect = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsSheetOpen(true);
  };

  return (
    <div className="h-full p-6">
      <CampaignsTable onCampaignSelect={handleCampaignSelect} />
      <CampaignDetailSheet 
        campaign={selectedCampaign}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
};

export default Campaigns;