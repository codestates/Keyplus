import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleWidthSize } from '../reducers/windowSlice';

import _debounce from 'lodash.debounce';

const useScreenResize = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = _debounce(
      () => dispatch(handleWidthSize(window.innerWidth)),
      1000
    );

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useScreenResize;
