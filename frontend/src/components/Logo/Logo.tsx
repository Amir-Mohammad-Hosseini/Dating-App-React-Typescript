import type LogoType from "./types";

export default function Logo({isShowText , className=""} : LogoType) {
  return (
    <div
    className={`flex items-center ${className}`}>
      <svg
        width={64}
        height={40}
        viewBox="0 0 64 40"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="14" stroke="#DCE0E4" strokeWidth="3" />
        <circle cx="34" cy="20" r="14" stroke="#F5435A" strokeWidth="3" />
      </svg>

      {isShowText && <span
      className="font-ItalicFont text-3xl"
      >
        Ember
      </span>}
    </div>
  );
}