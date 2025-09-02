import React from "react";

export default function Loading({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-20">
      <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600 mr-3"></span>
      <span className="text-lg text-muted-foreground">{`Loading ${message}...`}</span>
    </div>
  );
}