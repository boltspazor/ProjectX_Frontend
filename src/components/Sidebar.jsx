// Normal icons
import homeIcon from "../assets/home.svg";
import exploreIcon from "../assets/explore.svg";
import messageIcon from "../assets/message.svg";
import profileIcon from "../assets/profile.svg";
import logoutIcon from "../assets/logout.svg";

// Highlighted icons
import homeIconActive from "../assets/home-active.svg";
import exploreIconActive from "../assets/explore-active.svg";
import messageIconActive from "../assets/message-active.svg";
import profileIconActive from "../assets/profile-active.svg";
import logoutIconActive from "../assets/logout-active.svg";

// Profile photo
import profilePhoto from "../assets/profile-photo.jpg";

export default function Sidebar({ activeView, setActiveView }) {
  const items = [
    { label: "Home", value: "home", icon: homeIcon, iconActive: homeIconActive },
    { label: "Explore", value: "explore", icon: exploreIcon, iconActive: exploreIconActive },
    { label: "Messages", value: "messages", icon: messageIcon, iconActive: messageIconActive },
    { label: "Profile", value: "profile", icon: profileIcon, iconActive: profileIconActive },
  ];

  function handleClick(value) {
    setActiveView(value);
  }

  return (
    <aside className="hidden md:flex flex-col w-80 bg-[#0f0f0f] border-r border-gray-800 p-8 fixed left-0 top-24 h-[calc(100vh-6rem)] text-white overflow-y-auto">

      {/* Profile Image */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full blur-lg opacity-90"></div>
          <img src={profilePhoto} className="relative w-28 h-28 rounded-full object-cover border-2 border-gray-900" alt="Profile" />
        </div>

        <h2 className="text-lg font-semibold text-center">idkwhoisrahul_04</h2>
        <p className="text-sm text-gray-400 text-center mb-8">Rahul Chauhan</p>

        {/* Stats */}
        <div className="flex justify-center text-center mb-10 text-sm">
          <div className="px-3">
            <p className="font-bold">21</p>
            <p className="text-gray-400 text-xs">Posts</p>
          </div>

          <div className="border-l border-gray-700 mx-2 h-5"></div>

          <div className="px-3">
            <p className="font-bold">738</p>
            <p className="text-gray-400 text-xs">Followers</p>
          </div>

          <div className="border-l border-gray-700 mx-2 h-5"></div>

          <div className="px-3">
            <p className="font-bold">512</p>
            <p className="text-gray-400 text-xs">Following</p>
          </div>
        </div>

        {/* Buttons */}
      <nav className="space-y-4 text-[15px] font-medium">
        {items.map((item, i) => {
          const active = activeView === item.value;
          return (
            <button
              key={i}
              onClick={() => handleClick(item.value)}
              aria-pressed={active}
              className={`relative w-full rounded-xl p-[2px] border ${active ? "border-transparent" : "border-gray-600"} ${active ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" : "hover:border-transparent hover:bg-gradient-to-r hover:from-orange-400 hover:via-orange-500 hover:to-orange-600"} transition`}
            >
              <span className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#0f0f0f]">
                <img src={active ? item.icon : item.icon} className="h-5 w-5" />
                <span className={`${active ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" : ""}`}>
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}

        {/* Logout */}
        <button
          className="group relative w-full rounded-xl p-[1px] border border-orange-500 hover:border-transparent hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 transition mt-10"
          onClick={() => {
            // Handle logout logic here
            console.log("Logout clicked");
          }}
        >
          <span className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#0f0f0f]">
            <img src={logoutIcon} className="h-5 w-5 opacity-90 group-hover:hidden" />
            <img src={logoutIcon} className="h-5 w-5 hidden group-hover:block" />
            <span className="text-orange-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-orange-600 transition-none">
              Logout
            </span>
          </span>
        </button>
      </nav>
    </aside>
  );
}