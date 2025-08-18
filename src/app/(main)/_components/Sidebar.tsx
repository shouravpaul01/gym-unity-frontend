"use client";

import { GroupPeoleIcon } from "@/src/components/icons";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}) {
  return (
    <aside
      className={`h-full  w-64 md:flex md:flex-col  bg-white md:shadow-md ${isOpen ? "block relative z-30" : "hidden"}`}
    >
      <div>
        <div className="px-4 py-3 border-b">
          <h2 className="text-xl font-bold text-gray-700">Dashboard</h2>
          <button onClick={() => setIsOpen?.(false)} className="text-xl">
            ✖
          </button>
        </div>
        <nav className="mt-6 flex flex-col gap-2 p-2">
          <Button
            
            variant="light"
            color="success"
            as={Link}
            href="/manage-users"
            startContent={<GroupPeoleIcon/>}
          >
            Manage users
          </Button>
          <Button fullWidth variant="light" as={Link} href="/dashboard/users">
            Users
          </Button>
          <Button
            fullWidth
            variant="light"
            as={Link}
            href="/dashboard/settings"
          >
            Settings
          </Button>
        </nav>
      </div>
    </aside>
  );
}
