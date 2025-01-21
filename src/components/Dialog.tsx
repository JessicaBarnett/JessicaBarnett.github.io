import { CloseIcon } from "@src/icons/CloseIcon.tsx";
import { CSSProperties } from "react";

export type DialogComponentProps = {
    children: React.ReactNode,
    isOpen: boolean,
    onClose:  (e: React.MouseEvent) => void;
    scroll?: 'x' | 'y' | 'all' | 'none'
};

const Dialog = ({  children, isOpen, onClose , scroll = 'none'}: DialogComponentProps) => {
  if (!isOpen) {
    return;
  }

  const overflowRule = (): CSSProperties => {
    if (scroll === 'none') {
      return { overflow: 'hidden' };
    }
    else if (scroll === 'x') {
      return { overflowX: 'scroll'};
    }
    else if (scroll === 'y') {
      return { overflowY: 'scroll'};
    }

    return { overflow: 'scroll' };
  }

  return (
    <div className="dialog">
        <button className="btn-close" onClick={onClose}>
            <CloseIcon></CloseIcon>
        </button>
        <div className="dialog-content" style={{...overflowRule()}}>
            {children}
        </div>
    </div>
  );
};

export default Dialog;
