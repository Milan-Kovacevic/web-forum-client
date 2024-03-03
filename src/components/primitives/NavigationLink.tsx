import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavigationLinkProps = {
  text: string;
  navigateTo: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function NavigationLink(props: NavigationLinkProps) {
  return (
    <NavLink
      onClick={props.onClick}
      to={props.navigateTo}
      className={cn(
        props.className ?? "",
        props.isActive ? "text-foreground" : "text-foreground/60"
      )}
    >
      {props.text}
    </NavLink>
  );
}
