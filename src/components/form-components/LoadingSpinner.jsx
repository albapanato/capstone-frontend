const LoadingSpinner = ({ fullView }) => {
  return (
    <div
      className={`${
        fullView
          ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          : ""
      }`}
    >
      <div
        className={`spinner-border animate-spin inline-block ${
          fullView ? "w-20 h-20" : "w-4 h-4"
        } border-4 rounded-full border-t-transparent border-black`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
