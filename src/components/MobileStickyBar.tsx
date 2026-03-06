import { useState } from "react";
import { ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";

interface SummaryItem {
  label: string;
  value: string;
  price: number;
}

interface MobileStickyBarProps {
  totalPrice: number;
  items: SummaryItem[];
  onReserve: () => void;
}

const MobileStickyBar = ({ totalPrice, items, onReserve }: MobileStickyBarProps) => {
  const [open, setOpen] = useState(false);

  const activeAddons = items.filter((i) => i.price > 0).length;

  return (
    <>
      {/* Compact sticky bottom bar — 56px max */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
        <div className="bg-card/95 backdrop-blur-sm border-t border-border px-4 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-base font-bold text-primary">{totalPrice} DT</span>
            <span className="text-muted-foreground text-[11px]">
              • {activeAddons} option{activeAddons !== 1 ? "s" : ""}
            </span>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-foreground text-xs font-medium bg-secondary/80 border border-border rounded-full px-3 py-1.5 hover:bg-secondary transition-colors"
          >
            Summary <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="bg-card border-border max-h-[80vh]">
          <div className="px-5 pt-2 pb-6 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-foreground">Your Session</h3>
              <DrawerClose asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <X className="w-4 h-4" />
                </button>
              </DrawerClose>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-foreground text-xs truncate">{item.value}</p>
                  </div>
                  <span className="text-primary text-xs font-semibold whitespace-nowrap shrink-0">
                    {item.price > 0 ? `${item.price} DT` : "—"}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-foreground">Estimated Total</span>
                <span className="font-display text-xl font-bold text-primary">{totalPrice} DT</span>
              </div>
            </div>

            <Button
              variant="cta"
              onClick={() => {
                setOpen(false);
                onReserve();
              }}
              className="w-full rounded-full font-medium text-sm py-5"
            >
              Reserve This Session
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileStickyBar;
