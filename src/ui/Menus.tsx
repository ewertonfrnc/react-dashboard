// import styled from "styled-components";

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';

// const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

type Position = {
  x: number;
  y: number;
};

type MenusContextType = {
  openId: string;
  setOpenId: (id: string) => void;
  open: (id: string) => void;
  close: VoidFunction;
  position: Position;
  setPosition: (position: Position) => void;
};
const MenusContext = createContext<MenusContextType | undefined>(undefined);

type ToggleProps = {
  id: string;
};
function Toggle({ id }: ToggleProps) {
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error('Toggle must be used within a Menus');
  }

  const { openId, close, open, setPosition } = context;

  function handleClick(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    const button = target.closest('button');

    if (!button) return;
    const rect = button.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + window.scrollY + 8,
    });

    if (openId === '' || openId !== id) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-sm border-none bg-none p-1 transition hover:bg-gray-100"
    >
      <HiEllipsisVertical />
    </button>
  );
}

type ListProps = {
  children: ReactNode;
  id: string;
};
function List({ children, id }: ListProps) {
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error('Toggle must be used within a Menus');
  }

  const {
    openId,
    close,
    position: { x, y },
  } = context;
  const ref = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ref}
      className="bg-gray-0 absolute rounded-md shadow-md"
      style={{ top: `${y}px`, right: `${x}px` }}
    >
      {children}
    </ul>,
    document.body
  );
}

type ButtonProps = {
  children: ReactNode;
  icon: ReactNode;
  onClick?: VoidFunction;
};
function Button({ children, icon, onClick }: ButtonProps) {
  const context = useContext(MenusContext);

  if (!context) {
    throw new Error('Toggle must be used within a Menus');
  }

  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="flex w-full items-center gap-4 border-none bg-none px-6 py-3 text-center text-sm transition hover:bg-gray-50"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

type MenuProps = { children?: ReactNode };
export default function Menus({ children }: MenuProps) {
  const [openId, setOpenId] = useState<string>('');
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const close = () => setOpenId('');
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, position, setOpenId, close, open, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
