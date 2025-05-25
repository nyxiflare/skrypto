
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
import DashboardProfile from "./pages/DashboardProfile";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import Notifications from "./pages/Notifications";
import AuthenticatedHome from "./pages/AuthenticatedHome";
import PostJob from "./pages/PostJob";
import PostJobSuccess from "./pages/PostJobSuccess";
import Connect from "./pages/Connect";
import Membership from "./pages/Membership";
import ProtectedRoute from "./components/ProtectedRoute";
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
                <Route path="/home" element={
                  <ProtectedRoute requiresProfile>
                    <AuthenticatedHome />
                  </ProtectedRoute>
                } />
                <Route path="/explore" element={<ExploreTalent />} />
                <Route path="/offer-skill" element={
                  <ProtectedRoute guestRestricted>
                    <OfferSkill />
                  </ProtectedRoute>
                } />
                <Route path="/post-job" element={
                  <ProtectedRoute requiresProfile guestRestricted>
                    <PostJob />
                  </ProtectedRoute>
                } />
                <Route path="/post-job-success" element={
                  <ProtectedRoute requiresProfile>
                    <PostJobSuccess />
                  </ProtectedRoute>
                } />
                <Route path="/membership" element={
                  <ProtectedRoute requiresProfile>
                    <Membership />
                  </ProtectedRoute>
                } />
                <Route path="/profile/:username" element={<UserProfile />} />
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute requiresProfile>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/profile" element={
                  <ProtectedRoute requiresProfile>
                    <DashboardProfile />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/analytics" element={
                  <ProtectedRoute requiresProfile freelancerOnly>
                    <DashboardAnalytics />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute requiresProfile>
                    <Analytics />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute requiresProfile>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/inbox" element={
                  <ProtectedRoute requiresProfile>
                    <Inbox />
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute requiresProfile>
                    <Notifications />
                  </ProtectedRoute>
                } />
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
