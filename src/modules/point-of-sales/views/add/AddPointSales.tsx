import InputText from "@/common/components/input/InputText";
import { usePosContext, PosItem } from "@/common/context/PostContext";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const AddPointSales = () => {
  // route
  const router = useRouter();
  // fungsi untuk menambahkan data dummy ke global
  const { addPosItem } = usePosContext(); // ✅ ambil dari context

  // use form bawaan next
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<PosItem, "id">>({
    defaultValues: {
      number: "",
      creationDate: "",
      customer: "",
      salesperson: "",
      Activities: "",
      total: "" as any,
      status: "",
    },
    reValidateMode: "onBlur",
  });

  // fungsi submit data baru
  const onSubmit = (data: Omit<PosItem, "id">) => {
    const newItem: PosItem = {
      id: Date.now(),
      ...data,
      total: Number(data.total),
    };
    addPosItem(newItem);
    router.push("/point-of-sales");
  };

  return (
    <div className="mx-auto w-full space-y-6 px-4 py-6">
      <h1 className="text-2xl font-semibold">Add New POS</h1>
      <form
        onSubmit={handleSubmit(onSubmit)} // ✅ jangan lupa!
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            requiredMark
            register={register}
          />
          <InputText
            label="Customer"
            placeholder="Masukkan Customer"
            name="customer"
            requiredMark
            register={register}
          />
          <InputText
            label="SalesPerson"
            placeholder="Masukkan SalesPerson"
            name="salesperson"
            requiredMark
            register={register}
          />
          <InputText
            label="Activities"
            placeholder="Masukkan Activities"
            name="Activities"
            requiredMark
            register={register}
          />
          <InputText
            label="Total"
            placeholder="Masukkan Total"
            name="total"
            requiredMark
            register={register}
          />
          <InputText
            label="Status"
            placeholder="Masukkan Status"
            name="status"
            requiredMark
            register={register}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPointSales;
