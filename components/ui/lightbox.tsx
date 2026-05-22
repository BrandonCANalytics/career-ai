"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type LightboxProps = {
  children: React.ReactNode;
  description?: string;
  onClose: () => void;
  open: boolean;
  title: string;
};

export function Lightbox({ children, description, onClose, open, title }: LightboxProps) {
  if (!open) return null;

  return (
    <div
      aria-describedby={description ? "lightbox-description" : undefined}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
    >
      <button aria-label="Close dialog" className="absolute inset-0 cursor-default" onClick={onClose} type="button" />
      <div className="relative w-full max-w-lg rounded-lg border bg-card p-5 shadow-soft-border">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-muted-foreground" id="lightbox-description">
                {description}
              </p>
            ) : null}
          </div>
          <Button aria-label="Close dialog" onClick={onClose} size="icon" type="button" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3 text-sm leading-6 text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
