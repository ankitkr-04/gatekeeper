const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-block size-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
