"use client";

import * as React from "react";
import { track } from "@vercel/analytics";

import Button from "@/components/ui/Button";

type TrackedButtonProps = {
  eventName: string;
  eventData?: Record<string, string | number | boolean>;
} & React.ComponentProps<typeof Button>;

export default function TrackedButton({
  eventName,
  eventData,
  onClick,
  ...props
}: TrackedButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick?.(event as never);
    track(eventName, eventData);
  };

  return <Button {...props} onClick={handleClick} />;
}
