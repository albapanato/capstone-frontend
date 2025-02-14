const LoadingSpinner = ({ fullView }) => {
  return (
    <div
      className={`${
        fullView && "flex justify-center items-center w-full h-full"
      }`}
    >
      <div
        className={`spinner-border animate-spin inline-block ${
          fullView ? "w-20 h-20" : "w-4 h-4"
        } border-4 rounded-full border-t-transparent border-white`}
      ></div>
    </div>
  );
};
export default LoadingSpinner;
