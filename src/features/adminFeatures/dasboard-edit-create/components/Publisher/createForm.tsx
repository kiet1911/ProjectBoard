import { useCallback, useState } from "react";
import type { PublisherDTO } from "../../stores/serivcesType";
import {
  useConfirmContent,
  useToastNotification,
} from "../../../../../store/notification/notification";
import { useShallow } from "zustand/shallow";
import { useUpdateContainer } from "../../stores/updateContainer";
import {
  PublisherStatus,
  PublisherType,
} from "../../stores/enum.service.store";
import { useMutation } from "@tanstack/react-query";
import { publisher_service_dashboard } from "../../services/publisher.service";
import { useCreateContainer } from "../../stores/createContainer";

export default function CreateForm({
  data,
  gridApi,
}: {
  data: Required<PublisherDTO>;
  gridApi: () => void;
}) {
  const [form, setForm] = useState<Required<PublisherDTO>>(data);
  const confirm = useConfirmContent(useShallow((state) => state.active));
  const closeForm = useCreateContainer(useShallow((state) => state.close));
  const notification = useToastNotification(useShallow((state) => state.add));
  const mutation = useMutation({
    mutationKey: ["data_create_publisher", form],
    mutationFn: async () => {
      const res = await publisher_service_dashboard.createPublisher(form);
      return res;
    },
    onError: (error) => {
      if (error.message.includes("404")) {
        notification({ text: "Api not found!", type: "error" });
        return null;
      }
      notification({ text: error.message, type: "error" });
    },
    onSuccess: (config) => {
      if (config.data && config.data.message) {
        notification({ text: config.data.message, type: "success" });
        gridApi();
        closeForm();
      }
    },
  });
  const { isPending } = mutation;
  const handleConfirm = useCallback(async () => {
    const confirmValue = await confirm(
      "Are your sure to create this Publisher",
    );
    //  console.log(form);
    if (confirmValue) {
      // console.log("success");
      await mutation.mutateAsync();
    } else {
    }
  }, [form]);
  return (
    <>
      <form
        key={data.id}
        className="w-full h-full"
        action=""
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleConfirm();
        }}
      >
        <fieldset className="w-full flex flex-col gap-2 px-1 items-start justify-center font-medium">
          <legend className="text-xl font-medium ">
            Create Publisher information
          </legend>
          {/* <div className=" space-x-2 mt-2 w-full flex flex-row">
            <label className="shrink-0" htmlFor="Id">
              Id :
            </label>
            <input
              className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
              type="text"
              name="Id"
              id="Id"
              defaultValue={form.id.toString() ?? " "}
              disabled={true}
            />
          </div> */}
          <div className=" space-x-2 mt-0 w-full flex flex-row">
            <label className="shrink-0" htmlFor="Name">
              Name :
            </label>
            <input
              className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
              placeholder="ABCDEFG"
              type="text"
              name="Name"
              id="Name"
              maxLength={256}
              minLength={1}
              defaultValue={form.name.toString() ?? " "}
              required
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
              }}
            />
          </div>
          <div className=" space-x-2 w-full flex flex-row ">
            <label className=" shrink-0" htmlFor="Bio">
              Description :
            </label>
            <textarea
              className="w-full border px-0.5 rounded focus:border-(--main-color) font-normal"
              placeholder="ABCDEFG"
              rows={5}
              maxLength={256}
              minLength={1}
              name="Bio"
              id="Bio"
              defaultValue={form.bio.toString().trim() ?? " "}
              required
              onChange={(e) => {
                setForm({ ...form, bio: e.target.value });
              }}
            />
          </div>
          <div className=" space-x-2">
            <label htmlFor="Status">Status :</label>
            <select
              className="border px-0.5 rounded font-normal"
              name="Status"
              id="Status"
              required
              defaultValue={form.status ?? 0}
              onChange={(e) => {
                setForm({ ...form, status: Number(e.target.value) });
              }}
            >
              {PublisherStatus.map((data, index) => {
                return (
                  <option key={index + data + index} value={index}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className=" space-x-2">
            <label htmlFor="Type">Type :</label>
            <select
              className="border px-0.5 rounded font-normal"
              name="Type"
              id="Type"
              required
              defaultValue={form.type ?? 0}
              onChange={(e) => {
                setForm({ ...form, type: Number(e.target.value) });
              }}
            >
              {PublisherType.map((data, index) => {
                return (
                  <option key={index + data + index} value={index}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        <button
          disabled={isPending}
          type="submit"
          className="navbar-link hover:bg-(--main-color) hover:text-white my-2 mx-2 relative float-right"
        >
          <span>Save change</span>
        </button>
      </form>
    </>
  );
}
