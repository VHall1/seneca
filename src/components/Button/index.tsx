import { cn } from "../../utils";

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "h-10 px-4 py-2",
        "bg-white hover:bg-white/90",
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

type ButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
