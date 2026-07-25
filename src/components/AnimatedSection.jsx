import React, { useEffect, useRef, useState } from 'react';
import { Box, Fade } from '@mui/material';

const AnimatedSection = ({ children, customPropName = 'shouldAnimate', fade = false, timeout = 800 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const content = fade
    ? <Fade in={isVisible} timeout={timeout}>{children}</Fade>
    : React.cloneElement(children, { [customPropName]: isVisible });

  return <Box ref={ref}>{content}</Box>;
};

export default AnimatedSection;
