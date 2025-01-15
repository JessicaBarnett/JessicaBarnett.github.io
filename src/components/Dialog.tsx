import { CloseIcon } from "@src/icons/CloseIcon.tsx";

type DialogComponentProps = {
    children: React.ReactNode,
};

const Dialog = ({  children }: DialogComponentProps) => {
  return (
    <div className="dialog">
        <button className="btn-close">
            <CloseIcon></CloseIcon>
        </button>
        <div className="dialog-content">
            {children}
        </div>
    </div>
  );
};

export default Dialog;
