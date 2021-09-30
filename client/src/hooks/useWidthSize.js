import { useState, useEffect } from 'react';

const useWidthSize = (breakpoint) => {
  const [widthSize, setWidthSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (widthSize <= breakpoint && window.innerWidth > breakpoint)
        setWidthSize(breakpoint + 1);
      else if (widthSize > breakpoint && window.innerWidth <= breakpoint)
        setWidthSize(breakpoint);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [widthSize]);

  return widthSize;
};

export default useWidthSize;
