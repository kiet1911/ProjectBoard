import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ImagesBoardGameDTO,
} from "../../stores/serivcesType";
import { imageBoardgames_service_dashboard } from "../../services/imageBoardgame.service";
import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
import { ImageThumbnailStatus } from "../../stores/enum.service.store";
import {
  useConfirmContent,
  useToastNotification,
} from "../../../../../store/notification/notification";
import { useShallow } from "zustand/shallow";

export default function UpdateForm({
  params,
  gridApi,
}: {
  params: { id: string; name: string };
  gridApi: () => void;
}) {
  const query = useQueryClient();
  const notification = useToastNotification(useShallow((state) => state.add));
  const confirmAction = useConfirmContent(useShallow((state) => state.active));
  const [arrayImages, setArrayImages] = useState<ImagesBoardGameDTO[]>();
  const [imageInput, setImageInput] = useState<ImagesBoardGameDTO>({
    id: "",
    img_Url: "",
    alt: "",
    is_Thumbnail: true,
  });
  const { data, isPending } = useQuery({
    queryKey: ["data_boardGame_image", params],
    queryFn: async () => {
      const res = await imageBoardgames_service_dashboard.getImageBoardgames(
        params.id,
      );
      return res.data;
    },
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 60 * 10 * 1000,
  });
  const mutation = useMutation({
    mutationFn: async (type: "add" | "update" | "delete") => {
      if (imageInput) {
        const id_interceptor =
          imageInput.id.trim() == ""
            ? window.crypto.randomUUID()
            : imageInput.id;
        const res =
          await imageBoardgames_service_dashboard.modifyImageBoardgames({
            id: params.id,
            status: type,
            imageDTO: {
              imageId: id_interceptor,
              alt: imageInput.alt,
              url: imageInput.img_Url,
              isThumbnail: imageInput.is_Thumbnail,
            },
          });
        return res;
      }
      return Promise.reject("Image Input is missing some input");
    },
    onSuccess: (config) => {
      // console.log("success");
      handleOnClear();
      query.invalidateQueries({ queryKey: ["data_boardGame_image", params] });
      notification({
        text: config.data.message ?? "replace notification: success",
        type: "success",
      });
      gridApi();
    },
    onError: (error) => {
      handleOnClear();
      notification({
        text: error.message ?? "replace notification: error api",
        type: "error",
      });
    },
  });
  const submitPending = mutation.isPending;
  const handleOnUpdate = useCallback(async () => {
    const confirm = await confirmAction(
      "Are you sure you want to update this Image BoardGame",
    );
    if (!submitPending && imageInput && confirm) {
      mutation.mutate("update");
    }
  }, [imageInput]);
  const handleOnAdd = useCallback(async () => {
    const confirm = await confirmAction(
      "Are you sure you want to add this Image BoardGame",
    );
    if (!submitPending && imageInput && confirm) {
      mutation.mutate("add");
    }
  }, [imageInput]);
  const handleOnDelete = useCallback(async () => {
    const confirm = await confirmAction(
      "Are you sure you want to delete this Image BoardGame",
    );
    if (!submitPending && imageInput && confirm) {
      mutation.mutate("delete");
    }
  }, [imageInput]);
  const handleOnChoose = useCallback(
    (params: ImagesBoardGameDTO) => {
      if (params) {
        setImageInput(params);
        // console.log(params);
      }
    },
    [arrayImages],
  );
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      // console.log();
      if (
        e.target.name &&
        Object.getOwnPropertyDescriptor(imageInput, e.target.name) != undefined
      ) {
        // console.log(e.target.value);
        setImageInput((state) => ({
          ...state,
          [e.target.name]: e.target.value,
        }));
      }
    },
    [imageInput],
  );
  const handleOnClear = useCallback(() => {
    setImageInput({
      id: "",
      img_Url: "",
      alt: "",
      is_Thumbnail: true,
    });
  }, [imageInput]);
  useEffect(() => {
    // console.log("run")
    if (data && data.data && data.data.images) {
      const items: ImagesBoardGameDTO[] = data.data.images;
      setArrayImages(items);
    }
  }, [data]);
  return (
    <>
      <div key={params.id} className={`w-full`}>
        <fieldset className="w-full flex flex-col gap-2 px-1 items-start justify-center font-medium">
          <legend className="text-xl font-medium ">
            Update Image BoardGame information
          </legend>
          <div className=" space-x-2 mt-2 w-full flex flex-row">
            <label className="shrink-0" htmlFor="Id">
              Id :
            </label>
            <input
              className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
              type="text"
              name="Id"
              id="Id"
              defaultValue={params.id.toString() ?? " "}
              disabled={true}
            />
          </div>
          <div className=" space-x-2 mt-2 w-full flex flex-row">
            <label className="shrink-0" htmlFor="Name_BoardGame">
              Name BoardGame :
            </label>
            <input
              className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
              type="text"
              name="Name_BoardGame"
              id="Name_BoardGame"
              defaultValue={params.name.toString() ?? " "}
              disabled={true}
            />
          </div>
          {/* images */}
          <div className="max-h-100 overflow-y-auto mt-0 w-full flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="" className="text-left shrink-0">
                Images :
              </label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const submitter = e.nativeEvent as unknown as any;
                  // console.log(submitter);
                  if (submitter) {
                    const buttonValue = submitter.submitter.value;
                    if (buttonValue == "update") {
                      handleOnUpdate();
                    }
                    if (buttonValue == "add") {
                      handleOnAdd();
                    }
                    if (buttonValue == "delete") {
                      handleOnDelete();
                    }
                  }
                }}
                className="flex flex-row"
              >
                <fieldset className="border flex-1 flex flex-col justify-center items-center w-1/2 gap-2 p-2">
                  <legend>Image input</legend>
                  <div className="w-full">
                    <label htmlFor="Image_id">Image id : </label>
                    <input
                      type="text"
                      required={true}
                      className="w-1/2 border px-0.5 rounded focus:border-(--main-color) font-normal"
                      id="Image_id"
                      name="id"
                      disabled={true}
                      placeholder="ABCD..."
                      defaultValue={imageInput?.id ?? ""}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="Image_Url">Image Url : </label>
                    <input
                      type="url"
                      required={true}
                      id="Image_Url"
                      name="img_Url"
                      className="border w-1/2 px-0.5 rounded focus:border-(--main-color) font-normal"
                      value={imageInput?.img_Url}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="Image_Alt">Image Alt : </label>
                    <input
                      type="text"
                      required={true}
                      minLength={1}
                      maxLength={256}
                      id="Image_Alt"
                      name="alt"
                      className="border w-1/2 px-0.5 rounded focus:border-(--main-color) font-normal"
                      value={imageInput?.alt}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="Image_isThumbnail">
                      Image isThumbnail :{" "}
                    </label>
                    <select
                      name="is_Thumbnail"
                      id="Image_isThumbnail"
                      required
                      value={imageInput?.is_Thumbnail ? 0 : 1}
                      onChange={(e) => {
                        if(e.target.value != undefined ){
                          setImageInput(state=>({...state,
                            is_Thumbnail: e.target.value == "0" ? true : false
                          }))
                          // console.log(e.target.value);
                        }
                      }}
                    >
                      {ImageThumbnailStatus.map((data, index) => {
                        return (
                          <option key={data} value={index}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </fieldset>
                <div className=" grid grid-cols-1 p-2 justify-items-center gap-2">
                  {["update", "add", "delete"].map((data, index) => {
                    return (
                      <button
                        key={index + data}
                        type="submit"
                        name="action"
                        value={data}
                        className="navbar-link w-full hover:bg-(--main-color) hover:cursor-pointer hover:text-white"
                      >
                        <span className=" capitalize"> {data}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={handleOnClear}
                    className="navbar-link w-full"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
            <table className="border border-red-400 w-full table-fixed">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-1/12">id</th>
                  <th className="w-2/12">image</th>
                  <th className="w-4/12">url</th>
                  <th className="w-2/12">alt</th>
                  <th className="w-2/12">is thumbnail</th>
                </tr>
              </thead>
              <tbody className="">
                {!isPending &&
                  data &&
                  arrayImages &&
                  Array.isArray(arrayImages) && (
                    <>
                      {arrayImages.map((data) => {
                        // console.log(data);
                        return (
                          <tr
                            key={data.id}
                            onClick={() => handleOnChoose(data)}
                            className="max-h-5 border"
                          >
                            <td className="text-left p-2 font-medium">
                              {data.id}
                            </td>
                            <td className="max-w-2/12 p-2 object-contain ">
                              <img src={data.img_Url} alt={data.alt || "-"} />
                            </td>
                            <td
                              className="text-left p-2 break-all"
                              title={data.img_Url}
                            >
                              {data.img_Url}
                            </td>
                            <td className="text-center p-2">
                              {data.alt || "-"}
                            </td>
                            <td className="text-center p-2">
                              {data.is_Thumbnail ? "Yes" : "No"}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
    </>
  );
}
