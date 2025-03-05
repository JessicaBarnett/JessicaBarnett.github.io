import { RewindIcon } from "@src/icons/RewindIcon";
import { RefObject, useLayoutEffect, useRef, useState } from "react";
import { refHeight } from "@src/utils/bg-line-utils";

export type DrawerComponentProps = {
    children: React.ReactNode,
    isOpen: boolean,
    onClose:  () => void,
    navRef: RefObject<HTMLElement>
};

const enum DrawerStatus {
  open,
  closed,
  transitioningIn,
  transitioningOut,
}

const Drawer = ({  children, isOpen, onClose, navRef}: DrawerComponentProps) => {
  const [mainPageScrollPos, setMainPageScrollPos] = useState<number>(0);
  const [drawerTop, setDrawerTop] = useState<number>(0);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<DrawerStatus>( isOpen ? DrawerStatus.open : DrawerStatus.closed)

  useLayoutEffect(() => {
    const navHeight = refHeight(navRef) ?? 0;
    const frame = document.getElementById('page-frame');
    const boundingClientRect = document.getElementById('home-page')?.getBoundingClientRect();

    if (frame) {
      if (status === DrawerStatus.open) {


        // while transitioning
        // position drawer at the scroll pos of the main page
        frame.classList.add('transitioning-in');




        setMainPageScrollPos(Math.abs(boundingClientRect?.y ?? 0));
        setDrawerTop(mainPageScrollPos);

        // after transition
        setTimeout(() => {

          requestAnimationFrame(() => {
            // shrink page's height to that of the drawer
            const drawerHeight = refHeight(drawerRef) ?? 0;
            frame.style.height = `${drawerHeight}px`;
            // position drawer at the top instead of the main page scroll position
            setDrawerTop(0 - navHeight);
            // scroll there
            window.scrollTo({ top: -(navHeight), behavior: 'instant' });
            // shuffle classes
            frame.classList.remove('transitioning-in');
            frame.classList.add('drawer-open');
          })
        }, 400);
      } else {
          frame.classList.remove('drawer-open');
          frame.classList.add('transitioning-out');

          const drawerScrollPos = boundingClientRect?.y ?? 0;
          setDrawerTop(mainPageScrollPos + drawerScrollPos - navHeight);
          frame.style.height = `auto`;
          window.scrollTo({ top: mainPageScrollPos, behavior: 'instant' });

        setTimeout(() => {
          frame.classList.remove('transitioning-out');

        }, 300);
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* this button is outside the drawer because the drawer has a translate applied, and
          fixed positioned things (like this button) don't stay fixed within translated containers */}
      <button className='back-btn' style={{opacity: isOpen ? 1 : 0}} onClick={onClose}>
          <RewindIcon></RewindIcon>
      </button>
      <div ref={drawerRef} className={`drawer ${isOpen ? 'open' : 'closed'}`} style={{top: drawerTop}}>
        <div className='drawer-content'>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
