import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[15rem_1fr] grid-rows-[auto_1fr]">
      <Sidebar />
      <Header />

      <main className="overflow-scroll bg-gray-50 px-12 pt-10 pb-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
