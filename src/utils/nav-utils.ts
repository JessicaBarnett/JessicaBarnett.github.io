const getLinkElFromClickEvt = (e: React.MouseEvent): HTMLAnchorElement | null => {
    const target = e.target as HTMLSpanElement;
    if (target instanceof HTMLAnchorElement && target.tagName === "A") {
      return target; // if clickEvt happens on an a tag, target will be the link
    } else if (target.parentElement instanceof HTMLAnchorElement && target.parentElement.tagName === "A") {
      return target.parentElement; // if clickEvt happens on a navLink element, the target's parent will be the link
    } else {
      return null;
    }
}

const getNavLinkId = (anchorEl: EventTarget & HTMLElement): string | null => {
    const href = anchorEl.getAttribute('href') || '';
    return href.slice(href.lastIndexOf('#')+1);
}

export const getIdFromClickEvt = (e: React.MouseEvent): string | null => {
    const linkEl = getLinkElFromClickEvt(e);
    const navLinkId = linkEl ? getNavLinkId(linkEl) : null;
    return navLinkId;
}


export const scrollToId = (id: string, e?: React.MouseEvent) => {
    if (e) {
        e.preventDefault();
    }

    let scrollToElement = id ? document.getElementById(id) : null;

    if (scrollToElement !== null) {
        window.scrollTo({
            top: scrollToElement.offsetTop - 55,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        setTimeout(() => {
            scrollToElement = document.getElementById(id);
            if (scrollToElement !== null) {
                window.scrollTo({
                    top: scrollToElement.offsetTop - 55,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }, 50)
    }
  }