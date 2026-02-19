import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "inverse" | "outline";
type ButtonSize = "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | React.ButtonHTMLAttributes<HTMLButtonElement>
);

const baseClasses =
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-black)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-white)]";

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-6 py-3 text-base sm:text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--color-black)] text-[color:var(--color-white)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:bg-[color:var(--color-black-muted)]",
  secondary:
    "border border-[color:var(--color-black)] bg-transparent text-[color:var(--color-black)] hover:bg-[color:var(--color-gray-100)]",
  inverse:
    "bg-[color:var(--color-white)] text-[color:var(--color-black)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:bg-[color:var(--color-gray-100)]",
  outline:
    "border border-[color:var(--color-white-40)] bg-transparent text-[color:var(--color-white)] hover:bg-[color:var(--color-white-10)] focus-visible:ring-[color:var(--color-white)] focus-visible:ring-offset-[color:var(--color-black)]",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...rest } =
    props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
