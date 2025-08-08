import InputText from "@/common/components/input/InputText";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { usePosContext } from "@/common/context/PostContext";

const UpdatePos = () => {
  // route
  const router = useRouter();
  // ambil slug
  const { id } = router.query;
  // fungsi untuk update data ke global
  const { posData, updatePosItem } = usePosContext();

  // ambil data untuk di tampilkan berdasarkan id dari slug
  const selectedData = useMemo(() => {
    const numericId = Number(id);
    return posData.find((item: any) => item.id === numericId);
  }, [id, posData]);

  // use form bawaan next
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: "",
      creationDate: "",
      customer: "",
      salesperson: "",
      Activities: "",
      total: 0,
      status: "",
    },
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (selectedData) {
      reset(selectedData);
    }
  }, [selectedData, reset]);

  // fungsi submit data
  const onSubmit = (data: any) => {
    const updatedData = { ...data, id: Number(id), total: Number(data.total) };
    updatePosItem(updatedData);
    router.push("/point-of-sales");
  };

  return (
    <div className="w-full mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Update POS</h1>
      <form
        className="space-y-4 bg-white p-6 rounded-xl border border-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            label="Number"
            name="number"
            register={register}
            requiredMark
          />
          <InputText
            label="Creation Date"
            name="creationDate"
            register={register}
            requiredMark
          />
          <InputText
            label="Customer"
            name="customer"
            register={register}
            requiredMark
          />
          <InputText
            label="Salesperson"
            name="salesperson"
            register={register}
            requiredMark
          />
          <InputText
            label="Activities"
            name="Activities"
            register={register}
            requiredMark
          />
          <InputText
            label="Total"
            name="total"
            register={register}
            requiredMark
          />
          <InputText
            label="Status"
            name="status"
            register={register}
            requiredMark
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePos;
