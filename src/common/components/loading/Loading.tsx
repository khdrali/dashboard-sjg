const Loading = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className="border-blue-500 mx-auto h-10 w-10 animate-spin rounded-full border-b-2"></div>
        <p className="mt-2 text-sm text-gray-500">Loading</p>
      </div>
    </div>
  );
};

export default Loading;
