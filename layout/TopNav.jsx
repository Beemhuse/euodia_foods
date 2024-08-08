import PropTypes from "prop-types";
import Typography from "@/components/reusables/typography/Typography";
import { IoNotifications } from "react-icons/io5";
import Image from "next/image";

const NotificationIcon = ({ notifications }) => {
  return (
    <div className="relative">
      <IoNotifications className="text-xl" />
      {notifications > 0 && (
        <span className="absolute top-0 right-2 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2 text-white">
          {notifications}
        </span>
      )}
    </div>
  );
};

NotificationIcon.propTypes = {
  notifications: PropTypes.number.isRequired,
};

export default function TopNav({ ...props }) {
  const notifications = 4;

  return (
    <menu className="flex bg-white dark:text-white dark:bg-black items-center justify-between px-4 py-6 md:px-12" {...props}>
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" width={60} height={60} alt="logo" />
        <Typography variant="h1" size="md" className="text-green-500 font-bold">
          Euodia WholeFoods
        </Typography>
      </div>
      <aside className="hidden md:flex items-center gap-10 relative">
        <NotificationIcon notifications={notifications} />
        <div className="block space-y-2">
          <Typography variant="h3" className="flex items-center gap-2">
            Admin
          </Typography>
          <Typography className="flex items-center gap-2 -mt-2">
            Admin
          </Typography>
        </div>
      </aside>
      <button className="md:hidden">
        {/* <Icon icon="clarity:menu-line" width={24} /> */}
      </button>
    </menu>
  );
}

TopNav.propTypes = {
  title: PropTypes.string.isRequired,
  openSideBar: PropTypes.func.isRequired,
};
