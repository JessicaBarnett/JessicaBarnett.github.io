import { MediaT } from "@src/types/data-types";
import { RewindIcon } from "@src/icons/RewindIcon.tsx";
import { FastForwardIcon } from "@src/icons/FastForwardIcon.tsx";

type SliderComponentProps = {
    media: MediaT[]
};

const Slider = ({
  media
}: SliderComponentProps) => {
  return (
    <div className="faux-phone">
        {media.map((mediaItem: MediaT, i) => (
            <p className={`img-title ${i === 0 ? "visible" : null}`} key={`${mediaItem.id}-name`} >{mediaItem.name}</p>
        ))}

        <button className="slider-btn">
            <RewindIcon></RewindIcon>
        </button>
        <button className="slider-btn">
            <FastForwardIcon></FastForwardIcon>
        </button>

        <div className="buttons">
            {media.map((mediaItem) => (
                <button key={`${mediaItem.id}-dot-btn`} className="slider-dot-btn"></button>
            ))}
        </div>
        <div className="scrollable-image">
            {media.map((mediaItem: MediaT, i) => (
                <img
                    key={`${mediaItem.id}-img`}
                    className={`slider-img ${i === 0 ? "visible" : null}`}
                    src={mediaItem.url}
                    alt={mediaItem.alt}
                ></img>
            ))}
        </div>
    </div>
  );
};

export default Slider;
