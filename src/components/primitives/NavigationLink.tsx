import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LockIcon } from "lucide-react";

type NavigationLinkProps = {
  text: string;
  navigateTo: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function NavigationLink(props: NavigationLinkProps) {
  return (
    <div className="flex items-center">
      {props.disabled && <LockIcon className="z-10 h-4 text-foreground/80" />}
      <NavLink
        onClick={props.onClick}
        to={props.navigateTo}
        className={cn(
          props.className ?? "",
          props.isActive ? "text-foreground" : "text-foreground/60",
          props.disabled && "text-muted-foreground pointer-events-none"
        )}
      >
        {props.text}
      </NavLink>
    </div>
  );
}
