
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ExploreTalent from "./pages/ExploreTalent";
import OfferSkill from "./pages/OfferSkill";
import UserProfile from "./pages/UserProfile";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import Notifications from "./pages/Notifications";
import AuthenticatedHome from "./pages/AuthenticatedHome";
import PostJob from "./pages/PostJob";
import PostJobSuccess from "./pages/PostJobSuccess";
import Connect from "./pages/Connect";
import { WalletProvider } from "./contexts/WalletContext";
import { ProfileProvider } from "./contexts/ProfileContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WalletProvider>
        <ProfileProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/connect" element={<Connect />} />
                <Route path="/home" element={<AuthenticatedHome />} />
                <Route path="/explore" element={<ExploreTalent />} />
                <Route path="/offer-skill" element={<OfferSkill />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/post-job-success" element={<PostJobSuccess />} />
                <Route path="/profile/:username" element={<UserProfile />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/notifications" element={<Notifications />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ProfileProvider>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
