import cn from "../utils/cn";

interface Props {
  vertical?: boolean;
}

export default function Divider(props: Props) {
  return (
    <div
      className={cn("bg-[var(--foreground)]/50", {
        "w-px h-full": props.vertical,
        "w-full h-px": !props.vertical,
      })}
    ></div>
  );
}
