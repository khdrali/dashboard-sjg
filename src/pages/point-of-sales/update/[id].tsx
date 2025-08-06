import InputText from "@/common/components/input/InputText";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";

// Dummy data
const rawData = [
  {
    id: 1,
    number: "500001",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 2,
    number: "500002",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Khaidar Ali",
    Activities: "Active",
    total: 200000,
    status: "Quotation",
  },
  // dst...
];

const UpdatePos = () => {
  const router = useRouter();
  const { id } = router.query;

  const selectedData = useMemo(() => {
    const numericId = Number(id);
    return rawData.find((item) => item.id === numericId);
  }, [id]);

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

  const onSubmit = (data: any) => {
    console.log("Updated Data:", data);
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
            placeholder="Masukkan Number"
            register={register}
            requiredMark
          />
          <InputText
            label="Creation Date"
            name="creationDate"
            placeholder="Masukkan Creation Date"
            register={register}
            requiredMark
          />
          <InputText
            label="Customer"
            name="customer"
            placeholder="Masukkan Customer"
            register={register}
            requiredMark
          />
          <InputText
            label="Salesperson"
            name="salesperson"
            placeholder="Masukkan Salesperson"
            register={register}
            requiredMark
          />
          <InputText
            label="Activities"
            name="Activities"
            placeholder="Masukkan Activities"
            register={register}
            requiredMark
          />
          <InputText
            label="Total"
            name="total"
            placeholder="Masukkan Total"
            register={register}
            requiredMark
          />
          <InputText
            label="Status"
            name="status"
            placeholder="Masukkan Status"
            register={register}
            requiredMark
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePos;
