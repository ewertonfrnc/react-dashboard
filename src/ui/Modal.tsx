import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';

import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

type ModalContextType = {
  open: (name: string) => void;
  close: VoidFunction;
  openName: string;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProps = { children: ReactNode };
function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState('');

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName('');

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

type ModalOpenProps = {
  children: ReactElement<{ onClick?: VoidFunction }>;
  opens: string;
};
function Open({ children, opens: opensWindowName }: ModalOpenProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Open must be used within a Modal');
  }

  const { open } = context;

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

type WindowProps = {
  children: ReactElement<{ onCloseModal?: VoidFunction }>;
  name: string;
};
function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Window must be used within a Modal');
  }

  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="bg-gray-0/10 fixed top-0 left-0 z-[1000] h-screen w-full backdrop-blur-xs transition">
      <div
        ref={ref}
        className="bg-gray-0 fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transform rounded-lg px-10 py-8 shadow-2xl transition"
      >
        <button
          className="absolute top-3 right-5 translate-x-2 rounded-sm border-none bg-none p-1 transition hover:bg-gray-100"
          onClick={close}
        >
          <HiXMark className="h-6 w-6 text-gray-500" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
