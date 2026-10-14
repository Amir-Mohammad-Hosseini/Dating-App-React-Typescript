import { LuChevronRight } from "react-icons/lu";
import { groupClass, rowClass } from "../../utils/constants/settings";
import { Link } from "react-router";

const SettingSupportPanel = () => {
  return (
    <div>
      <h2 className="font-serif text-xl">Support</h2>
      <p className="mt-1 mb-4 text-sm text-SecondaryColor/70">
        Get help or review how Ember works.
      </p>

      <div className={groupClass}>
        {/* This routes haven't developed */}
        <Link to="/help" className={rowClass}>
          <span className="flex-1 text-sm font-medium">Help center</span>
          <LuChevronRight size={16} className="text-SecondaryColor/60" />
        </Link>
        <Link to="/terms" className={rowClass}>
          <span className="flex-1 text-sm font-medium">Terms of service</span>
          <LuChevronRight size={16} className="text-SecondaryColor/60" />
        </Link>
        <Link to="/privacy-policy" className={rowClass}>
          <span className="flex-1 text-sm font-medium">Privacy policy</span>
          <LuChevronRight size={16} className="text-SecondaryColor/60" />
        </Link>
      </div>

      <p className="mt-4 text-xs text-SecondaryColor/50">
        Ember · version 1.0.0
      </p>
    </div>
  );
};

export default SettingSupportPanel;
