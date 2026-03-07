import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import PacksPage from "./pages/PacksPage";
import Devis from "./pages/Devis";
import BookingWizard from "./pages/BookingWizard";
import VipRequest from "./pages/VipRequest";
import RentYourSpace from "./pages/RentYourSpace";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/packs" element={<PacksPage />} />
            <Route path="/creator-packs" element={<Navigate to="/packs" replace />} />
            <Route path="/corporate-packs" element={<Navigate to="/packs?tab=business" replace />} />
            <Route path="/build-session" element={<Navigate to="/packs?tab=custom" replace />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/book" element={<BookingWizard />} />
            <Route path="/vip" element={<VipRequest />} />
            <Route path="/rent-your-space" element={<RentYourSpace />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
