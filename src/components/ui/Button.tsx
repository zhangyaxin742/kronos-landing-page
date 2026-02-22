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
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-semibold transition-all duration-150";

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-3 text-[15px] sm:text-base",
  lg: "px-7 py-3.5 text-base sm:text-[17px]",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  inverse: "btn-secondary",
  outline: "btn-ghost",
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
