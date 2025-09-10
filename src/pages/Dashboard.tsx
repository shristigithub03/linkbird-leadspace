import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Target,
  MessageCircle,
  TrendingUp,
  Plus,
  Eye,
  BarChart3,
  Calendar,
  Activity
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for charts
const activityData = [
  { date: '2024-01-01', leads: 45, messages: 23, replies: 8 },
  { date: '2024-01-02', leads: 52, messages: 31, replies: 12 },
  { date: '2024-01-03', leads: 38, messages: 28, replies: 9 },
  { date: '2024-01-04', leads: 61, messages: 35, replies: 14 },
  { date: '2024-01-05', leads: 47, messages: 29, replies: 11 },
  { date: '2024-01-06', leads: 58, messages: 33, replies: 13 },
  { date: '2024-01-07', leads: 44, messages: 26, replies: 10 },
];

const campaignData = [
  { name: 'Tech Outreach', active: 234, replied: 45, interested: 12 },
  { name: 'Product Demo', active: 189, replied: 38, interested: 15 },
  { name: 'Partnership', active: 156, replied: 32, interested: 8 },
  { name: 'Follow-up', active: 198, replied: 41, interested: 18 },
];

const Dashboard = () => {
  return (
    <div className="h-full overflow-auto p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your LinkedIn outreach overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="transition-bounce hover:shadow-soft">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button className="bg-gradient-primary hover:bg-primary-hover transition-smooth">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft hover:shadow-medium transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-3xl font-bold text-foreground">2,847</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                <p className="text-3xl font-bold text-foreground">24</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  <Target className="h-3 w-3" />
                  8 launching this week
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-500 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages Sent</p>
                <p className="text-3xl font-bold text-foreground">1,256</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  <MessageCircle className="h-3 w-3" />
                  +8% from last week
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-smooth">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-3xl font-bold text-foreground">28.5%</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +3.2% improvement
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-500 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Overview
            </CardTitle>
            <CardDescription>Daily outreach activity for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="leads" 
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.3)"
                    name="Leads Added"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stackId="1"
                    stroke="hsl(var(--success))" 
                    fill="hsl(var(--success) / 0.3)"
                    name="Messages Sent"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="replies" 
                    stackId="1"
                    stroke="#9333ea" 
                    fill="rgba(147, 51, 234, 0.3)"
                    name="Replies Received"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Campaign Performance
            </CardTitle>
            <CardDescription>Top performing campaigns this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="active" fill="hsl(var(--primary))" name="Active Leads" />
                  <Bar dataKey="replied" fill="hsl(var(--success))" name="Replies" />
                  <Bar dataKey="interested" fill="#9333ea" name="Interested" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Your latest outreach campaigns</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Tech Leader Outreach Q1",
                status: "active",
                progress: 75,
                leads: 234,
                replies: 45
              },
              {
                name: "Product Demo Campaign", 
                status: "paused",
                progress: 45,
                leads: 189,
                replies: 38
              },
              {
                name: "Partnership Inquiry Follow-up",
                status: "completed",
                progress: 100,
                leads: 156,
                replies: 32
              }
            ].map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium text-foreground truncate">{campaign.name}</p>
                    <Badge 
                      variant={campaign.status === 'active' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{campaign.progress}% complete</span>
                      <span className="text-muted-foreground">{campaign.leads} leads • {campaign.replies} replies</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-primary hover:bg-primary-hover transition-smooth">
              <Plus className="mr-2 h-4 w-4" />
              Create New Campaign
            </Button>
            <Button variant="outline" className="w-full justify-start transition-bounce hover:shadow-soft">
              <Users className="mr-2 h-4 w-4" />
              Import Leads
            </Button>
            <Button variant="outline" className="w-full justify-start transition-bounce hover:shadow-soft">
              <MessageCircle className="mr-2 h-4 w-4" />
              View Messages
            </Button>
            <Button variant="outline" className="w-full justify-start transition-bounce hover:shadow-soft">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;