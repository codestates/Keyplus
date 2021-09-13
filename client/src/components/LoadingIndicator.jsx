import React from 'react';

const LoadingIndicator = ({ isLoading }) => {
  // const { loading } = useSelector((state: RootState) => state.global);

  return (
    <>
      {isLoading === false ? (
        ''
      ) : (
        <>
          {/* <CircularProgress /> */}
          Loading...
        </>
      )}
    </>
  );
};

export default LoadingIndicator;
