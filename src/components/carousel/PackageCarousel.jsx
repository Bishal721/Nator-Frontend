import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { responsive } from "./data";
const PackageCarousel = ({packages} ) => {
  return (
    <div>
      <Carousel
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        customTransition="all 500ms ease"
        transitionDuration={500}
        className="w-[90%] mx-28"
      >
        {packages}
      </Carousel>
    </div>
  );
};

export default PackageCarousel;
