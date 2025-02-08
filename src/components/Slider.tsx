import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';
import { MediaT } from "@src/types/data-types";
import { RewindIcon } from "@src/icons/RewindIcon.tsx";
import { FastForwardIcon } from "@src/icons/FastForwardIcon.tsx";
import Dialog from "./Dialog";

export type SliderOptions = {
    mobile?: boolean,
    wide?: boolean
};

export type SliderComponentProps = {
    media: MediaT[];
    options?: SliderOptions;
};

// Private Hooks
function useOffsetState(sliderTrackRef: React.MutableRefObject<HTMLDivElement | null>): [number, (idx: number) => void] {
    const [offset, setOffset] = useState(0);
    const getSlideWidth = (): number =>
        sliderTrackRef &&
            sliderTrackRef.current &&
            sliderTrackRef.current.children.length
            ? sliderTrackRef.current.children[0].clientWidth
            : 0;

    const handleSetOffset = (idx: number): void => {
        setOffset(-1 * (idx * getSlideWidth()));
    }

    return [offset, handleSetOffset];
}


// Component

const Slider = ({ media, options = {} }: SliderComponentProps) => {
    const sliderContentsRef = useRef<HTMLDivElement | null>(null);
    const sliderTrackRef = useRef<HTMLDivElement | null>(null);
    const [offset, setOffset] = useOffsetState(sliderTrackRef);
    const [selectedSlide, setSelectedSlide] = useState<MediaT>(media[0]);
    const [selectedSlideIdx, setSelectedSlideIdx] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const scrollToTop = () => {
        sliderContentsRef?.current?.scrollTo({ top: 0, behavior: "smooth" })
    }

    const moveForward = () => {
        if (selectedSlideIdx === media.length - 1) {
            setSelectedSlideIdx(0);
        } else {
            setSelectedSlideIdx(selectedSlideIdx + 1);
        }
    };

    const moveBackward = () => {
        if (selectedSlideIdx === 0) {
            setSelectedSlideIdx(media.length - 1);
        } else {
            setSelectedSlideIdx(selectedSlideIdx - 1);
        }
    };

    const handleGoToBtnClick = (imageId: number) => {
        setSelectedSlideIdx(imageId);
    }

    const handleExpandClick = () => {
        setIsExpanded(true);
    }

    // slide change handler
    useLayoutEffect(() => {
        scrollToTop();
        setSelectedSlide(media[selectedSlideIdx]);
        setOffset(selectedSlideIdx);
    }, [selectedSlideIdx, media, setOffset, setSelectedSlide]);

    const sliderClasses = [
        'slider',
        isExpanded ? 'slider-expanded' : '',
        options.mobile ? 'slider-mobile' : '',
        options.wide ? 'slider-wide' : ''
    ].join(' ');

    if (media.length < 0) {  return; }

    return (
        <>
            <div className={sliderClasses}>
                {media.length > 1 && (
                    <>
                        <p className="slider-title">{selectedSlide?.name ?? ''}</p>
                        <button className="slider-arrow-btn-backward" onClick={() => moveBackward()}>
                            <RewindIcon></RewindIcon>
                        </button>
                        <button className="slider-arrow-btn-forward" onClick={() => moveForward()}>
                            <FastForwardIcon></FastForwardIcon>
                        </button>

                        <div className="slider-dot-btns">
                            {media.map((slide, idx) => (
                                <button
                                    key={`${slide.id}-dot-btn`}
                                    className={`slider-dot-btn ${idx === selectedSlideIdx ? 'selected' : ''}`}
                                    onClick={() => handleGoToBtnClick(idx)}
                                ></button>
                            ))}
                        </div>
                    </>
                )}


                <div className="slider-contents" ref={sliderContentsRef}>
                    <div
                        className="slider-image-track"
                        ref={sliderTrackRef}
                        style={{ transform: `translateX(${offset}px)` }}
                    >
                        {media.map((slide: MediaT) => (
                            <img
                                key={`${slide.id}-img`}
                                className='slider-image'
                                src={slide.url}
                                alt={slide.alt}
                            ></img>
                        ))}
                    </div>
                </div>
                <button className="btn-expand" onClick={handleExpandClick}>expand</button>
            </div>
            {createPortal(
                <Dialog
                    isOpen={isExpanded}
                    onClose={() => { setIsExpanded(false) }}
                    scroll={'all'}
                    >
                        <img className='img-expanded' src={selectedSlide?.url} />
                </Dialog>,
                document.body
            )}
        </>
    );
};

export default Slider;
