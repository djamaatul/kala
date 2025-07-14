import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "../utils/cn";
import Link from "next/link";

interface Props {
  leading?: ReactNode;
  trailing?: ReactNode;
}

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props) {
  return (
    <button
      className={cn(
        "bg-[var(--foreground)]/90 text-[var(--background)] hover:bg-[var(--foreground)]/80 rounded-sm py-2 px-4 flex gap-2 items-center font-medium cursor-pointer",
        className,
        props.leading && !props.trailing && "justify-start",
        props.leading && props.trailing && "justify-between",
        !props.leading && props.trailing && "justify-between",
        !props.leading && !props.trailing && "justify-center"
      )}
      {...props}
    >
      {props.leading}
      {props.children}
      {props.trailing}
    </button>
  );
}

Button.outline = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props) => {
  return (
    <Button
      className={cn(
        "bg-transparent hover:bg-[var(--foreground)]/10 border border-[var(--foreground)]/10 text-[var(--foreground)]",
        className
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
};

Button.link = ({
  className,
  href,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Props & { href: string }) => {
  return (
    <Link href={href}>
      <Button
        className={cn(
          "bg-transparent border-none hover:bg-transparent p-0 text-primary",
          className
        )}
        {...props}
      >
        {props.children}
      </Button>
    </Link>
  );
};
