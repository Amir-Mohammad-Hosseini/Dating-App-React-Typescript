import { GoCommentDiscussion } from "react-icons/go";
import type { EmptyHistoryMessagesType } from "./types";

const EmptyHistoryMessages = ({
  anotherFirstname,
}: EmptyHistoryMessagesType) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-SecondaryDarkBgColor text-PrimaryColor">
        <GoCommentDiscussion className="size-7" aria-hidden="true" />
      </span>
      <div>
        <p className="font-ItalicFont text-2xl">No messages yet</p>
        <p className="mt-1 text-SecondaryColor">
          Say hello to {anotherFirstname} and start the conversation.
        </p>
      </div>
    </div>
  );
};

export default EmptyHistoryMessages;
