import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Play,
  Pause,
  Plus,
  Target,
  TrendingUp,
  Users,
  MessageCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const statusColors = {
  active: "bg-green-500/10 text-green-600 border-green-200",
  paused: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  completed: "bg-blue-500/10 text-blue-600 border-blue-200", 
  draft: "bg-gray-500/10 text-gray-600 border-gray-200"
};

const statusIcons = {
  active: Play,
  paused: Pause,
  completed: Target,
  draft: Plus
};

// Mock data generator
const generateMockCampaigns = (count: number, startIndex = 0): Campaign[] => {
  const statuses: Campaign['status'][] = ["active", "paused", "completed", "draft"];
  const templates = [
    "LinkedIn Connection Request",
    "Follow-up Sequence", 
    "Cold Outreach",
    "Event Follow-up",
    "Product Demo Request",
    "Partnership Inquiry"
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const leads = Math.floor(Math.random() * 500) + 50;
    const contacted = Math.floor(leads * (Math.random() * 0.8 + 0.2));
    const replied = Math.floor(contacted * (Math.random() * 0.3 + 0.05));
    const interested = Math.floor(replied * (Math.random() * 0.4 + 0.1));
    
    return {
      id: `campaign-${startIndex + i}`,
      name: `Campaign ${startIndex + i + 1} - ${templates[i % templates.length]}`,
      status: statuses[i % statuses.length],
      leads,
      contacted,
      replied,
      interested,
      responseRate: contacted > 0 ? Math.round((replied / contacted) * 100) : 0,
      startDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
      progress: Math.floor(Math.random() * 100),
      template: templates[i % templates.length]
    };
  });
};

interface CampaignsTableProps {
  onCampaignSelect?: (campaign: Campaign) => void;
}

export const CampaignsTable = ({ onCampaignSelect }: CampaignsTableProps) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initialize with first batch
  useEffect(() => {
    setCampaigns(generateMockCampaigns(15));
  }, []);

  // Infinite scroll implementation
  const loadMoreCampaigns = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newCampaigns = generateMockCampaigns(15, campaigns.length);
      setCampaigns(prev => [...prev, ...newCampaigns]);
      setIsLoading(false);
      
      // Stop loading after 150 items for demo
      if (campaigns.length >= 135) {
        setHasMore(false);
      }
    }, 500);
  }, [campaigns.length, isLoading, hasMore]);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const { scrollTop, scrollHeight, clientHeight } = target;
      
      // Load more when scrolled to bottom 100px
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadMoreCampaigns();
      }
    };

    const tableContainer = document.querySelector('.campaigns-table-container');
    if (tableContainer) {
      tableContainer.addEventListener('scroll', handleScroll);
      return () => tableContainer.removeEventListener('scroll', handleScroll);
    }
  }, [loadMoreCampaigns]);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="flex flex-col h-full shadow-soft">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-secondary">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Campaigns</h2>
            <p className="text-muted-foreground">
              Manage and track your outreach campaigns
            </p>
          </div>
          <Button className="bg-gradient-primary hover:bg-primary-hover transition-smooth">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="transition-bounce hover:shadow-soft">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto campaigns-table-container">
        <Table>
          <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Leads</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((campaign) => {
              const StatusIcon = statusIcons[campaign.status];
              
              return (
                <TableRow 
                  key={campaign.id}
                  className="hover:bg-muted/50 transition-smooth cursor-pointer animate-fade-in"
                  onClick={() => onCampaignSelect?.(campaign)}
                >
                  <TableCell className="py-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{campaign.template}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${statusColors[campaign.status]} capitalize transition-bounce flex items-center gap-1`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{campaign.progress}%</span>
                        <span className="text-muted-foreground">{campaign.contacted}/{campaign.leads}</span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{campaign.leads.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <MessageCircle className="h-3 w-3 text-green-600" />
                        <span>{campaign.replied} replies</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-3 w-3 text-blue-600" />
                        <span>{campaign.responseRate}% response rate</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {campaign.interested} interested
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">Started: {campaign.startDate}</p>
                      {campaign.endDate && (
                        <p className="text-muted-foreground">Ends: {campaign.endDate}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 hover:bg-muted transition-smooth"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => onCampaignSelect?.(campaign)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {campaign.status === 'active' ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause Campaign
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Start Campaign
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Target className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
            
            {/* Loading indicator */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-muted-foreground">Loading more campaigns...</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            
            {/* End of data indicator */}
            {!hasMore && filteredCampaigns.length > 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                  You've reached the end of your campaigns list
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};