import * as React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function GlassCard({ className = "", ...props }: GlassCardProps) {
  return <div className={`glass-card ${className}`.trim()} {...props} />;
}
