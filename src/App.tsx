import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AuthDialog } from "@/components/auth/auth-dialog";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Campaigns from "./pages/Campaigns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated (simulate checking localStorage/session)
    const savedUser = localStorage.getItem('linkbird_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Show auth dialog after a brief delay for better UX
      setTimeout(() => setShowAuthDialog(true), 1000);
    }
  }, []);

  const handleAuthenticated = (authenticatedUser: any) => {
    setUser(authenticatedUser);
    localStorage.setItem('linkbird_user', JSON.stringify(authenticatedUser));
    setShowAuthDialog(false);
  };

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading LinkBird...</p>
            </div>
          </div>
          <AuthDialog 
            open={showAuthDialog}
            onOpenChange={setShowAuthDialog}
            onAuthenticated={handleAuthenticated}
          />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex h-screen w-full bg-background">
            <AppSidebar />
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/messages" element={<Dashboard />} />
                <Route path="/analytics" element={<Dashboard />} />
                <Route path="/settings" element={<Dashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
