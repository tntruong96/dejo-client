import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CarouselContainer, ImageContainer, ImageWrapper } from "./style";

interface CarouselImageProps {
  imagesPaths: string[];
  slug: string;
}

const CarouselProductImage: React.FC<CarouselImageProps> = ({
  imagesPaths,
  slug,
}) => {
  const [visibleSlide, setVisibleSlide] = useState(1);
  const [slides, setSlides] = useState(imagesPaths);
  const [haveTransition, setHaveTransition] = useState(true);
  const [disableSlideButton, setDisableSlideButton] = useState(false);
  const route = useRouter();

  /* Create clone first item at the last and last item at the start */
  useEffect(() => {
    const cloneSlides = [...imagesPaths];
    cloneSlides.unshift(imagesPaths[imagesPaths.length - 1]);
    cloneSlides.push(imagesPaths[0]);
    setSlides(cloneSlides);
  }, []);

  /* handle position of first and last item */
  useEffect(() => {
    if (visibleSlide === slides.length - 1) {
      setDisableSlideButton(true);
      setTimeout(() => {
        setHaveTransition(false);
        setVisibleSlide(1);
      }, 500);
    }

    if (visibleSlide === 1) {
      setTimeout(() => {
        setHaveTransition(true);
      }, 500);
    }

    if (visibleSlide === 0) {
      setDisableSlideButton(true);
      setTimeout(() => {
        setHaveTransition(false);
        setVisibleSlide(slides.length - 2);
      }, 500);
    }

    if (visibleSlide === slides.length - 2) {
      setTimeout(() => {
        setHaveTransition(true);
      }, 500);
    }
  }, [visibleSlide]);


  /* Disable slide button to prevent the spammer */
  useEffect(() => {
    if (disableSlideButton) {
      setTimeout(() => {
        setDisableSlideButton(false);
      }, 500 * 2);
    }
  }, [disableSlideButton]);

  const handleRouting = (slug: string) => {
    route.push(`/product-detail/${slug}`);
  };

  const slideLeft = () => {
    setVisibleSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideRight = () => {
    setVisibleSlide((prev) => (prev + 1) % slides.length);
  };

  const calculateLeftMargin = () => {
    return "-" + visibleSlide * 100 + "%";
  };

  const renderImages = (
    <ImageWrapper
      style={{ transform: `translateX(${calculateLeftMargin()})` }}
      className={`${haveTransition ? "transition" : ""} cursor-pointer`}
      onClick={() => handleRouting(slug)}
    >
      {slides.length &&
        slides.map((imagePath: string, index: number) => (
          <ImageContainer
            key={index}
            style={{
              position: "absolute",
              left: `${index * 100}%`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                key={index}
                layout="fill"
                objectFit="cover"
                // objectPosition={"top"}
                src={`${process.env.NEXT_PUBLIC_URL_WEB}/${imagePath}`}
                alt={""}
              />
            </div>
          </ImageContainer>
        ))}
    </ImageWrapper>
  );

  return (
    <CarouselContainer>
      <button
        onClick={slideLeft}
        disabled={disableSlideButton}
        className="chevron"
      >
        <FontAwesomeIcon icon={faChevronLeft as IconProp} />
      </button>
      {renderImages}
      <button
        onClick={slideRight}
        className="chevron"
        disabled={disableSlideButton}
      >
        <FontAwesomeIcon className="text-wh" icon={faChevronRight as IconProp}  />
      </button>
    </CarouselContainer>
  );
};

export default CarouselProductImage;
