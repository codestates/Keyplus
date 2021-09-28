import { useState, useEffect } from 'react';

const useWidthSize = () => {
  const [widthSize, setWidthSize] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (widthSize <= 768 && window.innerWidth > 768) setWidthSize(769);
      else if (widthSize > 768 && window.innerWidth <= 768) setWidthSize(768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [widthSize]);

  return widthSize;
};

export default useWidthSize;
