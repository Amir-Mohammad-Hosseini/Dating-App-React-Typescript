import useAppStore from "../../lib/zustand/store";
import { formatMessageTime } from "../../utils/conversation";
import type HistoryMessageType from "./types";

const HistoryMessage = ({
  text,
  sender_id,
  time_stamp,
}: HistoryMessageType) => {
  const myId = useAppStore((state) => state.user)?.id;
  const fromWho = myId === sender_id ? "me" : "other";
  return (
    <div
      className={`flex ${fromWho === "me" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 sm:max-w-sm ${
          fromWho === "me"
            ? "rounded-br-sm bg-TertiaryColor text-white"
            : "rounded-bl-sm bg-InputBg text-PrimaryColor"
        }`}
      >
        <p>{text}</p>
        <p
          className={`mt-1 text-right text-[11px] ${
            fromWho === "me" ? "text-white/70" : "text-SecondaryColor"
          }`}
        >
          {formatMessageTime(time_stamp)}
        </p>
      </div>
    </div>
  );
};

export default HistoryMessage;
