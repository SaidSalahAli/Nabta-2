import React, { useEffect, useRef, useState } from 'react';
import { Box, Fade } from '@mui/material';

const AnimatedSection = ({
  children,
  customPropName = 'shouldAnimate',
  fade = false,
  timeout = 600,
  deferMount = false,
  minHeight = '120px',
  rootMargin = '300px 0px'
}) => {
  const [isVisible, setIsVisible] = useState(!deferMount);
  const [shouldAnimate, setShouldAnimate] = useState(!deferMount);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      setShouldAnimate(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  if (!isVisible) {
    return <Box ref={ref} sx={{ minHeight, width: '100%' }} />;
  }

  const content = fade ? (
    <Fade in={shouldAnimate} timeout={timeout}>
      {children}
    </Fade>
  ) : React.isValidElement(children) ? (
    React.cloneElement(children, { [customPropName]: shouldAnimate })
  ) : (
    children
  );

  return (
    <Box ref={ref} sx={{ width: '100%' }}>
      {content}
    </Box>
  );
};

export default AnimatedSection;

