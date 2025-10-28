import Uploader from '@/data/Uploader';
import MainNav from './MainNav';

export default function Sidebar() {
  return (
    <aside className="bg-gray-0 row-span-full flex flex-col gap-8 border-r border-r-gray-100 px-6 py-8">
      <MainNav />
      <Uploader />
    </aside>
  );
}
