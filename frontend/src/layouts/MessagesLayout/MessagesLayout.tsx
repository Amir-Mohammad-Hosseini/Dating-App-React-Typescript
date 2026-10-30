import { Outlet, useParams } from "react-router";
import { Navbar } from "../../components/Navbar";
import { ConversationList } from "../../components/Messages";

const MessagesLayout = () => {
  const { matchId } = useParams();
  const isChatOpen = Boolean(matchId);

  return (
    <div className="min-h-dvh bg-PrimaryDarkBgColor md:flex">
      <Navbar />

      <div className="flex min-w-0 flex-1 h-dvh overflow-hidden">
        <div
          className={`w-full overflow-y-auto pb-24 md:pb-0 lg:w-96 lg:shrink-0 lg:border-r lg:border-SecondaryColor/20 ${
            isChatOpen ? "hidden lg:block" : "block"
          }`}
        >
          <ConversationList />
        </div>
        <div
          className={`min-w-0 flex-1 overflow-hidden pb-24 md:pb-0 ${
            isChatOpen ? "block" : "hidden lg:block"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MessagesLayout;
