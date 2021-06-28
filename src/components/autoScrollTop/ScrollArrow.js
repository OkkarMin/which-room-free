import { useState, useEffect } from "react";

import { Circle } from "@chakra-ui/react";
import { FaArrowCircleUp } from "react-icons/fa";

export const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  return (
    <Circle
      as="button"
      className="scrollTop"
      style={{ display: showScroll ? "flex" : "none" }}
      backgroundColor="white"
    >
      {/* need to find out why color='linkedinBlue' not working */}
      <FaArrowCircleUp onClick={scrollTop} size="50px" color="#01A0DC" />
    </Circle>
  );
};
