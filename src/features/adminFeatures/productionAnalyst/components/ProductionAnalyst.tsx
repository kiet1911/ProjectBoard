import { useQuery } from "@tanstack/react-query";
import { LoadingBox } from "../../../../components/LoadingBox";

export default function ProductionAnalyst({
  title,
  icons,
  fn,
}: {
  title: string;
  icons: React.ReactNode;
  fn: () => Promise<any>;
}) {
  const { data, isFetching } = useQuery({
    queryKey: [title],
    queryFn: fn,
    staleTime: 4 * 1000,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  return (
    <>
      <div className="w-full min-h-10 bg-white mt-0 border-2 border-mist-400/30 p-2 px-5 flex flex-col items-start gap-2 relative">
        <h6 className="flex flex-row gap-2 items-center">
          {title ?? "NaN"} {icons}{" "}
        </h6>
        <div className="w-full flex flex-col justify-between items-center">
          {isFetching && <LoadingBox></LoadingBox>}
          {data && data.data && data.data.length > 0 ? (
            <>
              {data.data.map(
                (data: {
                  name: string;
                  quantity: number;
                  images?: Array<any>;
                }) => {
                  // console.log(data.images)
                  return (
                    <div key={data.name+data.quantity} className="w-full flex flex-row justify-between items-center">
                      <div className=" flex flex-row justify-center items-center gap-2">
                        <div className=" aspect-square w-15 flex justify-center items-center">
                          <img
                            src={
                              data.images &&
                              data.images.length > 0 &&
                              data.images[0].img_Url
                                ? data.images[0].img_Url
                                : "../../../../../public/Suspense/404NotFoundImage.png"
                            }
                            alt={data.name}
                          />
                        </div>
                        <span className="font-normal">{data.name}</span>
                      </div>
                      <span className="text-xs">{data.quantity}</span>
                    </div>
                  );
                },
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
