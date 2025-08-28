"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ShoppingCart } from "lucide-react";
import { useServiceStore } from "../store/service-store";
import ServiceItem from "./service-item";


export function Sidebar() {
//   const { card } = useCardStore();
//   const totalItems = card.length;
//   console.log(card);

const {service} = useServiceStore()
const totalItems = service.length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col bg-black text-white">
        <SheetHeader >
          <SheetTitle className="text-white">Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 px-4">
          {service.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center space-y-4">
              <div className="rounded-full border border-white/20 p-6">
                <ShoppingCart className="h-8 w-8 text-white/50" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-white">
                  Your cart is empty
                </p>
                <p className="text-sm text-white/60">
                  Add items to your cart to checkout
                </p>
              </div>
            </div>
          ) : (
            service.map((item) => <ServiceItem key={item.id} data={item} />)
          )}
        </div>
        
      </SheetContent>
    </Sheet>
  );
}
