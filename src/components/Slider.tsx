import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';
import { MediaT } from "@src/types/data-types";
import { RewindIcon } from "@src/icons/RewindIcon.tsx";
import { FastForwardIcon } from "@src/icons/FastForwardIcon.tsx";
import Dialog from "./Dialog";

export type SliderOptions = {
    tall?: boolean,
    wide?: boolean,
    sliderClass?: string,
    fixHeights?: boolean,
};

export type SliderComponentProps = {
    media: MediaT[];
    options?: SliderOptions;
    name: string;
};

function useSlideWidthState(sliderName: string): [number, () => void] {
    const [slideWidth, setSlideWidth] = useState(0);

    const handleSetSlideWidth = (): void => {
        const sliderContentEl = document.querySelector(`#slider-${sliderName} .slider-contents`);
        if (sliderContentEl) {
            setSlideWidth(sliderContentEl.clientWidth);
        }
    }

    return [slideWidth, handleSetSlideWidth];
}

// Private Hooks
function useOffsetState(slideWidth: number): [number, (idx: number) => void] {
    const [offset, setOffset] = useState(0);

    const handleSetOffset = (idx: number): void => {
        setOffset(-1 * (idx * slideWidth));
    }

    return [offset, handleSetOffset];
}

// Component

const Slider = ({ media, options, name}: SliderComponentProps) => {
     // determines whether the expanded dialog is open
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // used for scrollToTop on slide change
    const sliderContentsRef = useRef<HTMLDivElement | null>(null);

    // used in offset Calculation
    const sliderTrackRef = useRef<HTMLDivElement | null>(null);
    const [selectedSlide, setSelectedSlide] = useState<MediaT>(media[0]);
    const [selectedSlideIdx, setSelectedSlideIdx] = useState<number>(0);
    const [selectedSlideHeight, setSelectedSlideHeight] = useState<number | null>(null);
    const [slideWidth, setSlideWidth] = useSlideWidthState(name);
    const [offset, setOffset] = useOffsetState(slideWidth); // determines which slide is shown (a translate-x px value)

    const calculateImageHeight = (imageEl: HTMLImageElement) => {
        if (sliderContentsRef && sliderContentsRef.current) {
            return imageEl.naturalHeight * sliderContentsRef.current.offsetWidth / imageEl.naturalWidth;
        } else {
            return null;
        }
    };

    const scrollToTop = () => {
        sliderContentsRef?.current?.scrollTo({ top: 0, behavior: "smooth" })
    }

    const moveForward = () => {
        const newIdx = selectedSlideIdx === media.length - 1 ? 0 : selectedSlideIdx + 1;
        setSelectedSlideIdx(newIdx);
        setSelectedSlide(media[newIdx])

        document.getElementById(`img-${selectedSlideIdx}`)
    };

    const moveBackward = () => {
        const newIdx = selectedSlideIdx === 0 ? media.length - 1 : selectedSlideIdx - 1;
        setSelectedSlideIdx(newIdx);
        setSelectedSlide(media[newIdx]);
    };

    const handleGoToBtnClick = (imageId: number) => {
        setSelectedSlideIdx(imageId);
        setSelectedSlide(media[imageId])
    }

    const handleExpandClick = () => {
        setIsExpanded(true);
    }

    // update selectedSlide when selectedSlideIdx changes
    useLayoutEffect(() => {
        requestAnimationFrame(() => {
            scrollToTop();
            setSlideWidth();
            setOffset(selectedSlideIdx);
            const img = sliderTrackRef.current?.children[selectedSlideIdx] as HTMLImageElement;
            setSelectedSlideHeight(calculateImageHeight(img));
        })
    }, [selectedSlideIdx, setOffset, setSlideWidth])

    const sliderClasses = [
        'slider',
        isExpanded ? 'slider-expanded' : '',
        options?.tall ? 'slider-tall' : '',
        options?.wide ? 'slider-wide' : '',
        options?.sliderClass
    ].join(' ');

    if (media.length < 0) {  return; }

    return (
        <>
            <div className={sliderClasses} id={`slider-${name}`}>
                {/* Buttons only get rendered if there's more than 1 image */}
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
                                    key={`${name}-${slide.name}-dot-btn`}
                                    className={`slider-dot-btn ${idx === selectedSlideIdx ? 'selected' : ''}`}
                                    onClick={() => handleGoToBtnClick(idx)}
                                ></button>
                            ))}
                        </div>
                    </>
                )}

                {/* Images */}
                <div className="slider-contents"
                    ref={sliderContentsRef}
                >
                    <div
                        className="slider-image-track"
                        ref={sliderTrackRef}
                        style={{
                            transform: `translateX(${offset}px)`
                        }}
                    >
                        {media.map((slide: MediaT) => (
                            <img
                                key={`${name}-${slide.name}-img`}
                                src={slide.url}
                                alt={slide.alt}
                                // style={{
                                //     height: options?.fixHeights && selectedSlideHeight ? `${selectedSlideHeight}px` : 'auto',
                                // }}
                            ></img>
                        ))}
                    </div>
                </div>
                <button className="btn-expand" onClick={handleExpandClick}>expand</button>
            </div>

            {/* Portal for the expanded-image Dialog */}
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
