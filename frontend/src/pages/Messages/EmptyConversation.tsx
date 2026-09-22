import { GoCommentDiscussion } from "react-icons/go";

const EmptyConversation = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-SecondaryDarkBgColor text-PrimaryColor">
        <GoCommentDiscussion className="size-7" aria-hidden="true" />
      </span>
      <div>
        <p className="font-ItalicFont text-2xl">Pick a conversation</p>
        <p className="mt-1 text-SecondaryColor">
          Select someone from the list to see the chat here.
        </p>
      </div>
    </div>
  );
};

export default EmptyConversation;
