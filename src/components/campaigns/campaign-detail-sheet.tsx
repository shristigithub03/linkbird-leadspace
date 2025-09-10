import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  Target,
  Plus,
  Calendar,
  Users,
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Edit
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface CampaignDetailSheetProps {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors = {
  active: "bg-green-500/10 text-green-600",
  paused: "bg-yellow-500/10 text-yellow-600",
  completed: "bg-blue-500/10 text-blue-600", 
  draft: "bg-gray-500/10 text-gray-600"
};

const statusIcons = {
  active: Play,
  paused: Pause,
  completed: Target,
  draft: Plus
};

// Mock performance data
const generatePerformanceData = () => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      contacted: Math.floor(Math.random() * 20) + 5,
      replied: Math.floor(Math.random() * 8) + 1,
      interested: Math.floor(Math.random() * 4) + 1
    });
  }
  
  return data;
};

// Mock campaign details
const generateCampaignDetails = (campaign: Campaign) => ({
  ...campaign,
  description: "Automated LinkedIn outreach campaign targeting software engineers and product managers in the technology sector.",
  targetAudience: "Software Engineers, Product Managers, CTOs",
  messageSequence: [
    {
      step: 1,
      type: "Connection Request",
      delay: "0 days",
      message: "Hi [First Name], I came across your profile and was impressed by your work at [Company]. I'd love to connect and share some insights about [Industry Trend].",
      sent: 245,
      accepted: 156
    },
    {
      step: 2,
      type: "Follow-up Message",
      delay: "3 days",
      message: "Thanks for connecting, [First Name]! I noticed you're working on [Project/Initiative]. I have some resources that might be helpful for your team.",
      sent: 156,
      accepted: 89
    },
    {
      step: 3,
      type: "Value-add Message", 
      delay: "7 days",
      message: "Hope you found the previous resources useful! I'd love to schedule a brief call to discuss how we can help [Company] achieve [Specific Goal].",
      sent: 89,
      accepted: 34
    }
  ],
  performanceData: generatePerformanceData(),
  insights: [
    "Best performing day: Tuesday",
    "Optimal send time: 10-11 AM",
    "Higher response rate from Product Managers",
    "Connection requests perform 23% better on weekdays"
  ]
});

export const CampaignDetailSheet = ({ campaign, open, onOpenChange }: CampaignDetailSheetProps) => {
  if (!campaign) return null;

  const campaignDetails = generateCampaignDetails(campaign);
  const StatusIcon = statusIcons[campaign.status];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl overflow-y-auto animate-slide-up">
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-2xl pr-4">{campaign.name}</SheetTitle>
              <SheetDescription className="text-base">{campaignDetails.description}</SheetDescription>
              <div className="flex items-center gap-2 mt-3">
                <Badge className={`${statusColors[campaign.status]} flex items-center gap-1`}>
                  <StatusIcon className="h-3 w-3" />
                  {campaign.status}
                </Badge>
                <Badge variant="outline">{campaign.template}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-primary hover:bg-primary-hover transition-smooth"
              >
                {campaign.status === 'active' ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Total Leads</span>
                </div>
                <p className="text-2xl font-bold">{campaign.leads.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Contacted</span>
                </div>
                <p className="text-2xl font-bold">{campaign.contacted.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round((campaign.contacted / campaign.leads) * 100)}% of leads
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Replied</span>
                </div>
                <p className="text-2xl font-bold">{campaign.replied}</p>
                <p className="text-xs text-muted-foreground">
                  {campaign.responseRate}% response rate
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Interested</span>
                </div>
                <p className="text-2xl font-bold">{campaign.interested}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round((campaign.interested / campaign.replied) * 100)}% of replies
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Progress & Timeline */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Campaign Progress</CardTitle>
              <CardDescription>Current execution status and timeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-3" />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-muted-foreground">{campaign.startDate}</p>
                  </div>
                </div>
                {campaign.endDate && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">End Date</p>
                      <p className="text-muted-foreground">{campaign.endDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Over Time
              </CardTitle>
              <CardDescription>Daily outreach activity and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={campaignDetails.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="contacted" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Contacted"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="replied" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2}
                      name="Replied"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="interested" 
                      stroke="#9333ea" 
                      strokeWidth={2}
                      name="Interested"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Message Sequence */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Message Sequence</CardTitle>
              <CardDescription>Automated follow-up sequence and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaignDetails.messageSequence.map((step, index) => (
                <div key={step.step} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Step {step.step}</Badge>
                      <span className="font-medium">{step.type}</span>
                      <Badge variant="secondary" className="text-xs">
                        {step.delay}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {step.sent} sent • {step.accepted} accepted
                    </div>
                  </div>
                  <p className="text-sm bg-muted/30 p-3 rounded italic">
                    "{step.message}"
                  </p>
                  <div className="mt-2">
                    <Progress 
                      value={(step.accepted / step.sent) * 100} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((step.accepted / step.sent) * 100)}% success rate
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Campaign Insights
              </CardTitle>
              <CardDescription>AI-powered recommendations to improve performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {campaignDetails.insights.map((insight, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                    <span className="text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};