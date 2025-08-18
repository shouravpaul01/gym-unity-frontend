"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Button } from "@heroui/button";
import { BarIcon } from "@/src/components/icons";

export default function SidebarToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      <Button isIconOnly color="success" variant="light" onPress={() => setIsOpen(true)} className="me-2">
        <BarIcon />
      </Button>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="h-screen fixed inset-0 z-20 ">
          {/* Overlay */}
          <div
            className="h-screen fixed inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
        
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      )}
    </>
  );
}
