import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-burgundy/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-brand-burgundy text-white shadow-soft hover:bg-brand-burgundy/90 hover:shadow-card",
        secondary:
          "bg-brand-rose text-brand-burgundy hover:bg-brand-rose/80 border border-brand-border/60",
        outline:
          "border border-brand-border bg-white text-brand-charcoal hover:bg-brand-rose/40 hover:border-brand-burgundy/40",
        ghost:
          "text-brand-charcoal hover:bg-brand-rose/50 hover:text-brand-burgundy",
        link: "text-brand-burgundy underline-offset-4 hover:underline",
        primaryPlum:
          "bg-brand-plum text-white shadow-soft hover:bg-brand-plum/90",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-13 rounded-xl px-8 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
