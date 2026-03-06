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
      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
        <div className="bg-card border-t border-border px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold text-primary">{totalPrice} DT</span>
            <span className="text-muted-foreground text-xs">
              {activeAddons} option{activeAddons !== 1 ? "s" : ""} selected
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="rounded-full border-border text-foreground gap-1.5"
          >
            View Summary <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Drawer */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="bg-card border-border max-h-[85vh]">
          <div className="px-5 pt-2 pb-6 space-y-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-foreground">Your Session</h3>
              <DrawerClose asChild>
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <X className="w-5 h-5" />
                </button>
              </DrawerClose>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-foreground text-sm">{item.value}</p>
                  </div>
                  <span className="text-primary text-sm font-semibold whitespace-nowrap">
                    {item.price > 0 ? `${item.price} DT` : "—"}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-foreground">Estimated Total</span>
                <span className="font-display text-2xl font-bold text-primary">{totalPrice} DT</span>
              </div>
            </div>

            <Button
              onClick={() => {
                setOpen(false);
                onReserve();
              }}
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base py-6"
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
