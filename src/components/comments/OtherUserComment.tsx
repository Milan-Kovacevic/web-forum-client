import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ClockIcon, UserRoundIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Comment } from "@/types/models/comments";
import { RoleDictionary } from "@/utils/constants";
import { formatDateDistance } from "@/utils/utility";

type OtherUserCommentProps = {
  comment: Comment;
};

export default function OtherUserComment(props: OtherUserCommentProps) {
  const RoleType = RoleDictionary[props.comment.roleId].name;

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 items-start w-full">
        <div className="flex gap-2 xl:w-10/12 lg:w-full md:w-5/6 w-full">
          <Avatar className="sm:block hidden text-sm ml-1 mt-3.5 w-11 h-11 rounded-full border shadow-md border-border">
            <AvatarFallback className="dark:bg-muted/30 bg-background/80">
              <UserRoundIcon className="text-secondary-foreground h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div className="m-1 flex flex-wrap justify-between items-end self-start">
              <div className="flex items-center gap-1">
                <p className="ml-0.5 text-sm  text-secondary-foreground">
                  {props.comment.userDisplayName}
                </p>
                <span className="text-xs text-muted-foreground">|</span>
                <p className="text-accent-foreground text-xs">{RoleType}</p>
              </div>
              <div className="flex gap-1 items-center mr-2">
                <ClockIcon className="h-3 w-3" />
                <span className="text-xs">
                  {!props.comment.datePosted
                    ? "Unknown"
                    : formatDateDistance(props.comment.datePosted)}
                </span>
              </div>
            </div>

            <div className="relative self-start h-full w-full">
              <Card className="py-3 px-5 h-auto sm:min-w-64 min-h-20 w-full shadow-md dark:bg-muted/30">
                <p className="text-card-foreground/80 text-sm">
                  {props.comment.content}
                </p>
              </Card>
            </div>
          </div>
          <div className="flex flex-col self-end sm:mb-1 gap-1 w-11 -ml-0.5"></div>
        </div>
      </div>

      <div className="self-start sm:ml-16 ml-2">
        <span className="text-xs text-muted-foreground">Edited ~ </span>
        {props.comment.dateUpdated ? (
          <span className="text-xs font-medium">
            {formatDateDistance(props.comment.dateUpdated)}
          </span>
        ) : (
          <span className="text-xs font-medium text-accent-foreground/80">
            Never
          </span>
        )}
      </div>
    </div>
  );
}
