import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  MessageCircle,
  UserPlus,
  Linkedin
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const statusColors = {
  new: "bg-blue-500/10 text-blue-600 border-blue-200",
  contacted: "bg-yellow-500/10 text-yellow-600 border-yellow-200", 
  replied: "bg-green-500/10 text-green-600 border-green-200",
  interested: "bg-purple-500/10 text-purple-600 border-purple-200",
  not_interested: "bg-red-500/10 text-red-600 border-red-200"
};

// Mock data generator
const generateMockLeads = (count: number, startIndex = 0): Lead[] => {
  const statuses: Lead['status'][] = ["new", "contacted", "replied", "interested", "not_interested"];
  const degrees: Lead['connectionDegree'][] = ["1st", "2nd", "3rd"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `lead-${startIndex + i}`,
    name: `Lead ${startIndex + i + 1}`,
    title: [
      "Software Engineer", "Product Manager", "Marketing Director", 
      "Sales Manager", "CEO", "CTO", "VP Sales", "Head of Marketing"
    ][i % 8],
    company: [
      "TechCorp", "InnovateLabs", "DataDriven Inc", "ScaleUp Co", 
      "FutureWorks", "CloudTech", "AI Solutions", "NextGen Systems"
    ][i % 8],
    email: `lead${startIndex + i + 1}@example.com`,
    linkedinUrl: `https://linkedin.com/in/lead${startIndex + i + 1}`,
    status: statuses[i % statuses.length],
    avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${(startIndex + i) % 99}.jpg`,
    location: ["San Francisco, CA", "New York, NY", "London, UK", "Berlin, DE"][i % 4],
    connectionDegree: degrees[i % degrees.length],
    lastActivity: `${Math.floor(Math.random() * 7) + 1} days ago`
  }));
};

interface LeadsTableProps {
  onLeadSelect?: (lead: Lead) => void;
}

export const LeadsTable = ({ onLeadSelect }: LeadsTableProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initialize with first batch
  useEffect(() => {
    setLeads(generateMockLeads(20));
  }, []);

  // Infinite scroll implementation
  const loadMoreLeads = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newLeads = generateMockLeads(20, leads.length);
      setLeads(prev => [...prev, ...newLeads]);
      setIsLoading(false);
      
      // Stop loading after 200 items for demo
      if (leads.length >= 180) {
        setHasMore(false);
      }
    }, 500);
  }, [leads.length, isLoading, hasMore]);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const { scrollTop, scrollHeight, clientHeight } = target;
      
      // Load more when scrolled to bottom 100px
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        loadMoreLeads();
      }
    };

    const tableContainer = document.querySelector('.leads-table-container');
    if (tableContainer) {
      tableContainer.addEventListener('scroll', handleScroll);
      return () => tableContainer.removeEventListener('scroll', handleScroll);
    }
  }, [loadMoreLeads]);

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="flex flex-col h-full shadow-soft">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-secondary">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Leads</h2>
            <p className="text-muted-foreground">
              Manage and track your LinkedIn prospects
            </p>
          </div>
          <Button className="bg-gradient-primary hover:bg-primary-hover transition-smooth">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
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
      <div className="flex-1 overflow-auto leads-table-container">
        <Table>
          <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Connection</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow 
                key={lead.id}
                className="hover:bg-muted/50 transition-smooth cursor-pointer animate-fade-in"
                onClick={() => onLeadSelect?.(lead)}
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={lead.avatar} alt={lead.name} />
                      <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">{lead.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{lead.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{lead.location}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{lead.company}</p>
                    <a 
                      href={lead.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="h-3 w-3" />
                      LinkedIn Profile
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${statusColors[lead.status]} capitalize transition-bounce`}
                  >
                    {lead.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{lead.connectionDegree}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {lead.lastActivity}
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
                      <DropdownMenuItem onClick={() => onLeadSelect?.(lead)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add to Campaign
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-muted-foreground">Loading more leads...</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            
            {/* End of data indicator */}
            {!hasMore && filteredLeads.length > 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  You've reached the end of your leads list
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};