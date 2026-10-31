import { IoImageOutline, IoSend } from "react-icons/io5";
import type { SendMessageFormType } from "./types";

const SendMessageForm = ({
  draft,
  onSubmitMessage,
  onWriteMessage,
  onSendImage,
  isUploadImagePending
}: SendMessageFormType) => {
  return (
    <form
      onSubmit={onSubmitMessage}
      className="flex shrink-0 items-center gap-2 border-t border-SecondaryColor/20 px-4 py-3 sm:px-6"
    >
      <label
        htmlFor="image-file"
        className={`border border-SecondaryColor/30 rounded-full size-10 cursor-pointer flex items-center justify-center text-SecondaryColor transition hover:border-PrimaryColor hover:text-PrimaryColor ${
          isUploadImagePending
            ? "pointer-events-none animate-pulse opacity-60"
            : ""
        }`}
      >
        <input
          id="image-file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          aria-label="Attach a photo"
          onChange={onSendImage}
          disabled={isUploadImagePending}
          className="sr-only"
        />
        <IoImageOutline className="size-4" aria-hidden="true" />
      </label>
      <input
        type="text"
        value={draft}
        onChange={onWriteMessage}
        placeholder="Write a message…"
        autoComplete="off"
        className="h-11 flex-1 rounded-full border border-SecondaryColor/20 bg-InputBg px-4 text-PrimaryColor outline-none transition placeholder:text-SecondaryColor focus:border-TertiaryColor"
      />
      <button
        type="submit"
        disabled={!draft.trim()}
        aria-label="Send message"
        className="grid size-11 shrink-0 place-items-center rounded-full bg-TertiaryColor text-white transition enabled:cursor-pointer enabled:hover:bg-HoverBtnBg disabled:opacity-50"
      >
        <IoSend className="size-4" aria-hidden="true" />
      </button>
    </form>
  );
};

export default SendMessageForm;
