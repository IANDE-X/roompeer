import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@material-ui/core";
import { FullscreenRounded, ArrowForwardIosRounded, ArrowBackIosRounded, CloseRounded } from "@material-ui/icons";
import { ProGallery } from "pro-gallery";
import styled from "styled-components";
import "pro-gallery/dist/statics/main.css";

export default function GalleryPro(props) {
  const [picture, setPicture] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = (event) => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  let items = [];
  items = props.images.map((img) => ({
    itemId: img.id,
    mediaUrl: img.url,
    metaData: {
      type: "image",
      height: img.height,
      width: img.width,
      focalPoint: [0, 0],
      link: {
        url: img.url,
        target: "_blank",
      },
    },
  }));

  // The options of the gallery (from the playground current state)
  const options = {
    galleryLayout: 3,
    scrollAnimation: "SLIDE_UP",
    itemClick: "clickToExpand",
    clickToExpand: "SITE",
    hoveringBehaviour: "NEVER_SHOW",
    slideshowLoop: true,
  };

  // The size of the gallery container. The images will fit themselves in it
  const container = {
    width: 800,
    height: 800,
  };

  // The eventsListener will notify you anytime something has happened in the gallery.
  const eventsListener = (eventName, eventData) => {
    // if (eventName === "ITEM_CLICKED") {
    //   console.log(eventData);
    //   console.log(eventData.createUrl().boundThis);
    //   setPicture(eventData.url);
    //   handleToggle();
    // }
  };

  // The scrollingElement is usually the window, if you are scrolling inside another element, suplly it here
  const scrollingElement = <Wrapper></Wrapper>;
  const hoverRenderer = (itemProps) => {
    return (
      <TextWrapper>
        <FullscreenRounded fontSize="large" />
      </TextWrapper>
    );
  };

  const arrowRenderer = (direction) => {
    return direction === "left" ? (
      <ButtonWrapper>
        <ArrowBackIosRounded fontSize="large" />
      </ButtonWrapper>
    ) : (
      <ButtonWrapper>
        <ArrowForwardIosRounded fontSize="large" />
      </ButtonWrapper>
    );
  };

  return (
    <Wrapper>
      <ProGallery items={items} options={options} container={container} eventsListener={eventsListener} scrollingElement={scrollingElement} customNavArrowsRenderer={arrowRenderer} />
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent dividers style={{ backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>
          <Image src={picture} width={800} height={800} />
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 100%;
  font-size: 30px;
`;

const ButtonWrapper = styled.div`
  color: white;
  transition: 0.2s ease-in;
  text-shadow: rgba(0, 0, 0, 0.3) 0px 20px 40px;
  :hover {
    color: black;
  }
`;
