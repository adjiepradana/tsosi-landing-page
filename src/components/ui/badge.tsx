import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-burgundy text-white shadow-sm",
        secondary:
          "border-brand-border bg-brand-rose text-brand-burgundy",
        outline:
          "border-brand-border text-brand-charcoal bg-white/70",
        warning:
          "border-amber-200 bg-amber-50 text-amber-900",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-900",
        plum:
          "border-transparent bg-brand-plum text-white",
        muted:
          "border-transparent bg-brand-rose/60 text-brand-gray",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
