import { NavLink } from 'react-router-dom';
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';

export default function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/dashboard"
            className="group flex items-center gap-3 rounded-lg px-6 py-3 text-base font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 [&.active]:bg-gray-50 [&.active]:text-gray-800"
          >
            <HiOutlineHome className="group-hover:text-brand-600 group-[.active]:text-brand-600 h-6 w-6 text-gray-400 transition-colors" />
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/bookings"
            className="group flex items-center gap-3 rounded-lg px-6 py-3 text-base font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 [&.active]:bg-gray-50 [&.active]:text-gray-800"
          >
            <HiOutlineCalendarDays className="group-hover:text-brand-600 group-[.active]:text-brand-600 h-6 w-6 text-gray-400 transition-colors" />
            Bookings
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cabins"
            className="group flex items-center gap-3 rounded-lg px-6 py-3 text-base font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 [&.active]:bg-gray-50 [&.active]:text-gray-800"
          >
            <HiOutlineHomeModern className="group-hover:text-brand-600 group-[.active]:text-brand-600 h-6 w-6 text-gray-400 transition-colors" />
            Cabins
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users"
            className="group flex items-center gap-3 rounded-lg px-6 py-3 text-base font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 [&.active]:bg-gray-50 [&.active]:text-gray-800"
          >
            <HiOutlineUsers className="group-hover:text-brand-600 group-[.active]:text-brand-600 h-6 w-6 text-gray-400 transition-colors" />
            Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className="group flex items-center gap-3 rounded-lg px-6 py-3 text-base font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 [&.active]:bg-gray-50 [&.active]:text-gray-800"
          >
            <HiOutlineCog6Tooth className="group-hover:text-brand-600 group-[.active]:text-brand-600 h-6 w-6 text-gray-400 transition-colors" />
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
