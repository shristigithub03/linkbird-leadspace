import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Mail,
  Linkedin,
  Building,
  Calendar,
  MessageCircle,
  UserPlus,
  ExternalLink,
  Phone,
  Globe
} from "lucide-react";

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

interface LeadDetailSheetProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors = {
  new: "bg-blue-500/10 text-blue-600",
  contacted: "bg-yellow-500/10 text-yellow-600", 
  replied: "bg-green-500/10 text-green-600",
  interested: "bg-purple-500/10 text-purple-600",
  not_interested: "bg-red-500/10 text-red-600"
};

// Mock additional data for the lead detail
const generateLeadDetails = (lead: Lead) => ({
  ...lead,
  phone: "+1 (555) 123-4567",
  website: "https://example.com",
  employees: "1,000-5,000",
  industry: "Technology",
  joinedDate: "2020-03-15",
  mutualConnections: 12,
  recentPosts: [
    {
      id: 1,
      content: "Excited to announce our latest product launch...",
      date: "2 days ago",
      engagement: "45 likes, 12 comments"
    },
    {
      id: 2, 
      content: "Great insights from the tech conference today...",
      date: "1 week ago",
      engagement: "23 likes, 8 comments"
    }
  ],
  conversationHistory: [
    {
      id: 1,
      type: "outbound",
      message: "Hi [Name], I came across your profile and was impressed by your work at [Company]...",
      date: "2024-01-15",
      status: "sent"
    },
    {
      id: 2,
      type: "inbound", 
      message: "Thanks for reaching out! I'd be interested to learn more about what you're working on.",
      date: "2024-01-16",
      status: "received"
    }
  ]
});

export const LeadDetailSheet = ({ lead, open, onOpenChange }: LeadDetailSheetProps) => {
  if (!lead) return null;

  const leadDetails = generateLeadDetails(lead);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto animate-slide-up">
        <SheetHeader className="pb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={lead.avatar} alt={lead.name} />
              <AvatarFallback className="text-lg">
                {lead.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-2xl">{lead.name}</SheetTitle>
              <SheetDescription className="text-base">{lead.title}</SheetDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={statusColors[lead.status]}>
                  {lead.status.replace('_', ' ')}
                </Badge>
                <Badge variant="outline">{lead.connectionDegree} connection</Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-gradient-primary hover:bg-primary-hover transition-smooth">
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1 transition-bounce hover:shadow-soft">
              <UserPlus className="mr-2 h-4 w-4" />
              Add to Campaign
            </Button>
          </div>

          {/* Contact Information */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{leadDetails.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{lead.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={lead.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    LinkedIn Profile
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{lead.company}</p>
                    <p className="text-xs text-muted-foreground">{leadDetails.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={leadDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    Company Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined LinkedIn: {leadDetails.joinedDate}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Company Size</p>
                  <p className="font-medium">{leadDetails.employees} employees</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Mutual Connections</p>
                  <p className="font-medium">{leadDetails.mutualConnections}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conversation History */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Conversation History</CardTitle>
              <CardDescription>Recent message exchanges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {leadDetails.conversationHistory.map((message) => (
                <div 
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.type === 'outbound' 
                      ? 'bg-primary/5 border-l-2 border-primary' 
                      : 'bg-muted/50 border-l-2 border-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={message.type === 'outbound' ? 'default' : 'secondary'} className="text-xs">
                      {message.type === 'outbound' ? 'You' : lead.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{message.date}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Recent LinkedIn Activity</CardTitle>
              <CardDescription>Latest posts and engagements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {leadDetails.recentPosts.map((post) => (
                <div key={post.id} className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm mb-2">{post.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.engagement}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};