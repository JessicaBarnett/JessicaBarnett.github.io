import { RewindIcon } from "@src/icons/RewindIcon";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { refHeight } from "@src/utils/bg-line-utils";

export type DrawerComponentProps = {
    children: React.ReactNode,
    isOpen: boolean,
    onClose:  () => void;
};

const Drawer = ({  children, isOpen, onClose}: DrawerComponentProps) => {
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const handleDrawerClose = () => {
    // scroll back to where you were when you clicked "more info"
    window.scrollTo({ top: top, behavior: 'instant' })
    onClose();
  }

  const scrollLimiter = useCallback((top: number, bottom: number) => {
    if (!isOpen) { return; } // don't limit scroll if the drawer is closed!

    if (window.scrollY < top) { // if we've scrolled too far up, then limit
      window.scrollTo({ top: top, behavior: 'instant' })
    }

    const lowerLimit = bottom - window.screen.availHeight + 170; // TODO: fix this!  170 value is arbitrary.  Why is this calculation wrong?
    if (window.scrollY > lowerLimit) { // if we've scrolled too far down, then limit
      window.scrollTo({ top: lowerLimit, behavior: 'instant' })
    }
  }, [isOpen])

  useLayoutEffect(() => {
    // open drawer at current scroll position
    document.getElementById('page-frame')?.classList.toggle('covered');
    const boundingClientRect = document.getElementById('home-page')?.getBoundingClientRect();
    const y = Math.abs(boundingClientRect?.y ?? 0) + 44;// nav height
    setTop(y);
    setBottom((y + refHeight(drawerRef)));

    // limit scroll to height of the drawer
    const scrollLimiterWithParams = (e: Event) => scrollLimiter(top, bottom, e);
    window.addEventListener("scroll", scrollLimiterWithParams);
    return () => window.removeEventListener("scroll", scrollLimiterWithParams);
  }, [isOpen, top, bottom, scrollLimiter]);


  return (
    <>
      {/* this button is outside the drawer because the drawer has a translate applied, and
          fixed positioned things (like this button) don't stay fixed within translated containers */}
      <button className='back-btn' style={{opacity: isOpen ? 1 : 0}} onClick={handleDrawerClose}>
          <RewindIcon></RewindIcon>
      </button>
      <div ref={drawerRef} className={`drawer ${isOpen ? 'open' : 'closed'}`} style={{top: top}}>
        <div className='drawer-content'>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
