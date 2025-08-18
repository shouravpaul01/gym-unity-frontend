import { Spinner } from "@heroui/spinner";
import React from "react";

export default function Loading({
  className = "h-screen",
}: {
  className?: string;
}) {
  return (
    <div className={`${className} flex justify-center items-center`}>
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="warning" />
    </div>
  );
}
