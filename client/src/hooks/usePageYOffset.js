import { useState, useEffect } from 'react';

const usePageYOffset = () => {
  const [pageYOffset, setPageYOffset] = useState(null);

  useEffect(() => {
    const handleChangeYOffset = () => {
      if (pageYOffset === 0 && window.pageYOffset > 0) setPageYOffset(1);
      else if (window.pageYOffset === 0) setPageYOffset(0);
    };
    window.addEventListener('scroll', handleChangeYOffset);
    handleChangeYOffset();
    return () => window.removeEventListener('scroll', handleChangeYOffset);
  }, [pageYOffset]);
  return pageYOffset;
};

export default usePageYOffset;
