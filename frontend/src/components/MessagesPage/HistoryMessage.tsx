import useAppStore from "../../lib/zustand/store";
import {
  formatChatImageUrl,
  formatMessageTime,
} from "../../utils/conversation";
import type HistoryMessageType from "./types";

const HistoryMessage = ({
  text,
  sender_id,
  time_stamp,
  image_url,
  onImageLoad,
}: HistoryMessageType) => {
  const myId = useAppStore((state) => state.user)?.id;
  const fromWho = myId === sender_id ? "me" : "other";
  return (
    <div
      className={`flex ${fromWho === "me" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-2xl sm:max-w-sm ${
          image_url ? "p-1.5" : "px-4 py-2.5"
        } ${
          fromWho === "me"
            ? "rounded-br-sm bg-TertiaryColor text-white"
            : "rounded-bl-sm bg-InputBg text-PrimaryColor"
        }`}
      >
        {image_url && (
          <img
            src={formatChatImageUrl(image_url)}
            alt="Sent photo"
            onLoad={onImageLoad}
            className="max-h-80 w-full rounded-xl object-cover"
          />
        )}
        {text && <p className={image_url ? "px-2.5 pt-1.5" : ""}>{text}</p>}
        <p
          className={`mt-1 text-right text-[11px] ${
            image_url ? "px-2.5 pb-1" : ""
          } ${fromWho === "me" ? "text-white/70" : "text-SecondaryColor"}`}
        >
          {formatMessageTime(time_stamp)}
        </p>
      </div>
    </div>
  );
};

export default HistoryMessage;
