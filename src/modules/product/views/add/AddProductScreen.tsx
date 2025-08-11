import InputText from "@/common/components/input/InputText";
import { useProductContext } from "@/common/context/ProdukContext";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface FormValues {
  title: string;
  price: number;
  quantity: number;
}

const AddProductScreen = () => {
  const router = useRouter();
  const { addProduct } = useProductContext();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "",
      price: 0,
      quantity: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    addProduct({
      title: data.title, // ganti name → title
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
    router.push("/product");
  };

  return (
    <div className="mx-auto w-full space-y-6 px-4 py-6">
      <h1 className="text-2xl font-semibold text-black">Add New Product</h1>
      <form
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputText
            label="Nama Barang"
            name="title"
            placeholder="Masukkan Nama Barang"
            register={register}
            requiredMark
          />
          <InputText
            label="Harga"
            name="price"
            type="number"
            placeholder="Masukkan Harga"
            register={register}
            requiredMark
          />
          <InputText
            label="Jumlah Produk"
            type="number"
            name="quantity"
            placeholder="Masukkan Jumlah Produk"
            register={register}
            requiredMark
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg bg-gray-200 px-4 py-2 text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductScreen;
