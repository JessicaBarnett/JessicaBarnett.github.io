import { CloseIcon } from "@src/icons/CloseIcon.tsx";

type DialogComponentProps = {
    children: React.ReactNode,
    isOpen: boolean,
    onClose:  (e: React.MouseEvent) => void;
};

const Dialog = ({  children, isOpen, onClose }: DialogComponentProps) => {
  if (!isOpen) {
    return;
  }

  return (
    <div className="dialog">
        <button className="btn-close" onClick={onClose}>
            <CloseIcon></CloseIcon>
        </button>
        <div className="dialog-content">
            {children}
        </div>
    </div>
  );
};

export default Dialog;
