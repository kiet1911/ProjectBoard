export default function LoadingSpin({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <>
          <div className=" w-full h-full left-0 top-0 absolute bg-mist-300/90 flex flex-col justify-center items-center">
            <div className=" h-20 w-20 border-2 border-mist-600 border-t-2 border-t-mist-100 rounded-full animate-spin"></div>
          </div>
        </>
      )}
    </>
  );
}
