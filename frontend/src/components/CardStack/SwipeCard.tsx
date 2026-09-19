import { animate, motion, useMotionValue, useTransform } from "motion/react";
import type { PanInfo } from "motion/react";
import type SwipeCardType from "./types";

const THRESHOLD = 120;
const VELOCITY = 500;

const SwipeCard = ({ text, isTop, index, onSwipe }: SwipeCardType) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const passed =
      Math.abs(info.offset.x) > THRESHOLD ||
      Math.abs(info.velocity.x) > VELOCITY;

    if (!passed) {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      return;
    }

    const dir = info.offset.x > 0 ? 1 : -1;
    animate(x, dir * window.innerWidth, {
      duration: 0.25,
      onComplete: () => onSwipe(dir > 0 ? "like" : "nope"),
    });
  };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{ x, rotate: isTop ? rotate : 0 }}
      animate={{ scale: 1 - index * 0.05, y: index * 14 }}
      className="absolute inset-0 select-none overflow-hidden rounded-3xl border border-SecondaryColor bg-SecondaryDarkBgColor"
    >
      <motion.span
        style={{ opacity: likeOpacity }}
        className="absolute top-6 left-6 z-10 -rotate-12 rounded-full border border-TertiaryColor px-4 py-2 text-TertiaryColor"
      >
        LIKE
      </motion.span>

      <motion.span
        style={{ opacity: nopeOpacity }}
        className="absolute top-6 right-6 z-10 rotate-12 rounded-full border border-SecondaryColor px-4 py-2 text-SecondaryColor"
      >
        NOPE
      </motion.span>

      <h1 className="pointer-events-none absolute inset-0 flex items-center justify-center font-TitleFont text-9xl text-SecondaryColor">
        {text}
      </h1>

      <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl bg-PrimaryDarkBgColor p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-x-2 font-TitleFont">
            <h3 className="text-3xl font-bold">Mike</h3>
            <h4 className="text-lg text-SecondaryColor">23</h4>
          </div>
          <p className="font-PrimaryFont text-sm text-SecondaryColor">2km away</p>
        </div>
        <p className="py-2 font-PrimaryFont text-sm text-SecondaryColor">
          Backend Engineer
        </p>
        <p className="text-sm">
          Building something with too many microservices. Ask me about my cat
          instead.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-2xl border border-SecondaryColor px-4 py-1 text-SecondaryColor">
            Badge
          </span>
          <span className="rounded-2xl border border-SecondaryColor px-4 py-1 text-SecondaryColor">
            Badge
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;