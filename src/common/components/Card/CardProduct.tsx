import { formatPrice } from "@/common/utils/formatPrice";
import Image from "next/image";

interface CardProductProps {
  title: string;
  price: number;
  quantity: number;
  onAdd: () => void; // tambah quantity
  onRemove: () => void; // kurang quantity
  disable?: boolean;
}

const CardProduct = ({
  price,
  title,
  quantity,
  disable,
  onAdd,
  onRemove,
}: CardProductProps) => {
  return (
    <div
      className={`flex h-[330px] w-full max-w-[180px] flex-col justify-between rounded-md shadow-md`}
    >
      <div>
        <Image
          src={"https://placehold.co/150x150/000000/FFFFFF/png"}
          width={180}
          height={180}
          alt=""
          className="rounded-t-md"
        />
        <div className="mt-1 flex w-full flex-col gap-4 px-2">
          <div>
            <p className="line-clamp-2 text-sm leading-4">{title}</p>
            <p className="mt-2 text-sm font-semibold">
              {formatPrice(price ?? 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end px-2 pb-2">
        {quantity > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onRemove}
              className={`h-[30px] w-[30px] cursor-pointer rounded-md border border-[#4e73df] hover:bg-[#4e73df] hover:text-white`}
            >
              -
            </button>
            <span className="min-w-[20px] text-center text-sm">{quantity}</span>
            <button
              disabled={disable}
              onClick={onAdd}
              className={`h-[30px] w-[30px] rounded-md ${disable ? "cursor-default opacity-50" : "cursor-pointer hover:bg-[#4e73df] hover:text-white"} border border-[#4e73df]`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={onAdd}
            disabled={disable}
            className={`flex h-[30px] w-[80px] ${disable ? "cursor-default opacity-50" : "cursor-pointer hover:bg-[#4e73df] hover:text-white"} items-center justify-center rounded-md border border-[#4e73df]`}
          >
            <p className="text-sm">Add</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
