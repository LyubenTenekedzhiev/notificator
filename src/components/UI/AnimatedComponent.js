import React, { useEffect, useState } from "react";
import { Animated } from 'react-animated-css';

function AnimatedVisibility({ visible, children, animationOut, animationIn }) {
  const [noDisplay, setNoDisplay] = useState(!visible);

  useEffect(() => {
    if (!visible) setTimeout(() => setNoDisplay(true), 300);
    else setNoDisplay(false);
  }, [visible]);

  const style = noDisplay ? { display: "none" } : { paddingBottom: "1.5rem"};
  return (
    <Animated animationOut={animationOut} animationIn={animationIn} isVisible={visible} style={style}>
      {children}
    </Animated>
  );
}

export default AnimatedVisibility;
