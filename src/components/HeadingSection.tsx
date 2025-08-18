import { Button } from "@heroui/button";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowLeftIcon } from "./icons";

export default function HeadingSection({
  title,
  linkUrl,
  children,
}: {
  title: string;
  linkUrl?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex border-b border-gray-200 pb-2">
      <div className="flex-1 flex items-center gap-2">
        {linkUrl && (
          <Button
            as={Link}
            href={linkUrl}
            isIconOnly
            radius="full"
            size="sm"
            color="success"
          >
            <ArrowLeftIcon className="fill-white" />
          </Button>
        )}
        <p className="text-lg font-bold flex-1">{title}</p>
      </div>
      <>{children}</>
    </div>
  );
}
