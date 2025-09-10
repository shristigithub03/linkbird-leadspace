import { useState } from "react";
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadDetailSheet } from "@/components/leads/lead-detail-sheet";

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  linkedinUrl: string;
  status: "new" | "contacted" | "replied" | "interested" | "not_interested";
  avatar: string;
  location: string;
  connectionDegree: "1st" | "2nd" | "3rd";
  lastActivity: string;
}

const Leads = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  };

  return (
    <div className="h-full p-6">
      <LeadsTable onLeadSelect={handleLeadSelect} />
      <LeadDetailSheet 
        lead={selectedLead}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
};

export default Leads;