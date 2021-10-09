import React, { useState, useCallback } from "react";
import styled from "styled-components";
import "pro-gallery/dist/statics/main.css";
import Carousel, { Modal, ModalGateway } from "react-images";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as SlideShowGallery } from "react-responsive-carousel";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { theme } from "../../model/data";
React.useLayoutEffect = React.useEffect;

export default function PhotoGallery(props) {
  let photos = [];
  photos = props.images.map((img, index) => ({
    src: img.url,
    width: img.width,
    height: img.height,
    key: img.id,
    alt: `flat_photo${index}`,
  }));

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const handleSwipe = (idx) => {
    setCurrentImage(idx);
  };

  const PreviousArrow = (onClickHandler, hasPrevious, label) => {
    return hasPrevious ? (
      <ArrowWrapper onClick={onClickHandler} className="left">
        <ChevronLeft fontSize="large" />
      </ArrowWrapper>
    ) : (
      <></>
    );
  };

  const NextArrow = (onClickHandler, hasNext, label) => {
    return hasNext ? (
      <ArrowWrapper onClick={onClickHandler} className="right">
        <ChevronRight fontSize="large" />
      </ArrowWrapper>
    ) : (
      <></>
    );
  };

  const Dots = (onClickHandler, isSeleceted, index, label) => {
    return <DotsIndicator selected={isSeleceted} onClick={onClickHandler}></DotsIndicator>;
  };

  return (
    <Wrapper>
      <SlideShowGallery
        onClickItem={openLightbox}
        centerMode={false}
        emulateTouch={false}
        useKeyboardArrows={true}
        swipeable={true}
        onChange={handleSwipe}
        renderArrowNext={NextArrow}
        renderArrowPrev={PreviousArrow}
        renderIndicator={Dots}
        showIndicators={false}
      >
        {photos.map((img, idx) => (
          <ImageContainer key={idx}>
            <img src={img.src} height={"100%"} className="cover" />
          </ImageContainer>
        ))}
      </SlideShowGallery>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  & .left {
    left: 2%;
  }
  & .right {
    right: 2%;
  }

  & .cover {
    object-fit: contain;
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  height: 600px;
  object-fit: cover;
  position: relative;

  @media (max-width: 800px) {
    height: 350px;
  }
`;

const ArrowWrapper = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  top: 50%;
  cursor: pointer;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 4;
  transition: 0.3s ease-in-out;
  :hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const DotsIndicator = styled.li`
  display: inline-block;
  margin: 2px;
  width: 10px;
  height: 10px;
  color: white;
  border-radius: 50%;
  background-color: ${(props) => (props.selected ? theme.light.primaryColor : "white")};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: 0.3s ease-in-out;
  :hover {
    background-color: ${theme.light.secondaryColor};
  }
`;
