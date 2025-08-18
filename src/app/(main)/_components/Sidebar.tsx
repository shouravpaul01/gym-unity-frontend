"use client";

import { CalenderClockIcon, GroupPeoleIcon, HomeIcon } from "@/src/components/icons";
import { Button } from "@heroui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAccessGranted } from "../../utils";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}) {
  const pathName = usePathname();
  return (
    <aside
      className={`h-full  w-64 md:flex md:flex-col  bg-white md:shadow-md ${isOpen ? "block relative z-30" : "hidden"}`}
    >
      <div>
        <div className="px-4 py-[16px] border-b border-dashed border-success">
          <h2 className="text-2xl font-bold text-center text-gray-700">GymUnity</h2>
          {isOpen && (
            <Button
              isIconOnly
              radius="full"
              size="sm"
              onPress={() => setIsOpen?.(false)}
              className="text-md absolute top-2 -right-3"
            >
              ✖
            </Button>
          )}
        </div>
        <nav className="mt-6 flex flex-col gap-2 p-3">
          <Button
            variant={pathName === "/" ? "solid" : "light"}
            color="success"
            className="justify-start gap-3 text-black"
            as={Link}
            href="/"
            startContent={<HomeIcon />}
          >
           Home
          </Button>
          {
            isAccessGranted(["admin"]) && <Button
            variant={pathName === "/manage-users" ? "solid" : "light"}
            color="success"
            className="justify-start gap-3 text-black"
            as={Link}
            href="/manage-users"
            startContent={<GroupPeoleIcon />}
          >
            Manage users
          </Button>
          }
         { isAccessGranted(["admin","trainer"]) && <Button
            variant={pathName === "/manage-class-schedules" ? "solid" : "light"}
            color="success"
            className="justify-start gap-3 text-black"
            as={Link}
            href="/manage-class-schedules"
            startContent={<CalenderClockIcon />}
          >
            Manage Class Schedules
          </Button>}
        </nav>
      </div>
    </aside>
  );
}
