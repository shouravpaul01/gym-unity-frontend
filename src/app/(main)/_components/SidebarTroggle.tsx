"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button onClick={() => setOpen(true)} className="text-2xl">
        ☰
      </button>

      {/* Mobile sidebar */}
      {open && (
        <div className="h-screen fixed inset-0 z-20 ">
          {/* Overlay */}
          <div
            className="h-screen fixed inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar */}
        
          <Sidebar isOpen={open} setIsOpen={setOpen} />
        </div>
      )}
    </>
  );
}
