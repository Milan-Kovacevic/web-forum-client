import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ClockIcon, UserRoundIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Comment } from "@/types/models/comments";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { RoleDictionary } from "@/utils/constants";

type OtherUserCommentProps = {
  comment: Comment;
};

export default function OtherUserComment(props: OtherUserCommentProps) {
  const RoleType = RoleDictionary[props.comment.roleId].name;

  return (
    <div className="flex gap-3 items-start w-full">
      <div className="flex gap-2 xl:w-10/12 lg:w-11/12 md:w-5/6 w-full">
        <Avatar className="sm:block hidden text-sm ml-1 mt-3.5 w-11 h-11 rounded-full border shadow-md border-border dark:border-none">
          <AvatarFallback className="dark:bg-muted/50 bg-background/80">
            <UserRoundIcon className="text-secondary-foreground h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <div className="m-1 flex flex-wrap justify-between items-end self-start">
            <p className="ml-0.5 text-sm font-medium text-secondary-foreground">
              {props.comment.userDisplayName} | {RoleType}
            </p>
            <div className="flex gap-1 items-center mr-2">
              <ClockIcon className="h-3 w-3" />
              <span className="text-xs">
                {!props.comment.datePosted
                  ? "Unknown"
                  : formatDistanceToNow(new Date(props.comment.datePosted), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
              </span>
            </div>
          </div>

          <div className="relative self-start h-full w-full">
            <Card className="py-3 px-5 h-auto sm:min-w-64 min-h-20 w-full shadow-md dark:bg-muted/30 border-border">
              <p className="text-card-foreground/80 text-sm">
                {props.comment.content}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
