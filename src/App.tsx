import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import CreatorPacksPage from "./pages/CreatorPacksPage";
import CorporatePacksPage from "./pages/CorporatePacksPage";
import Devis from "./pages/Devis";
import BuildSession from "./pages/BuildSession";
import RentYourSpace from "./pages/RentYourSpace";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/creator-packs" element={<CreatorPacksPage />} />
            <Route path="/corporate-packs" element={<CorporatePacksPage />} />
            <Route path="/devis" element={<Devis />} />
            <Route path="/build-session" element={<BuildSession />} />
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
