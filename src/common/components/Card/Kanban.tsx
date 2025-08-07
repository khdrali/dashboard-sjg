import { formatPrice } from "@/common/utils/formatPrice";
import { IoMdTime } from "react-icons/io";

interface KanbanProps {
  customer: string;
  total: number;
  number: string;
  creationDate: string;
  status: string;
}

const KanbanCard = ({
  customer,
  creationDate,
  number,
  status,
  total,
}: KanbanProps) => {
  return (
    <div className="bg-white shadow-md rounded-md w-full max-w-[350px] p-4 flex flex-col justify-between gap-6">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">{customer}</p>
        <p className="text-lg font-bold">{formatPrice(total)}</p>
      </div>
      <div className="flex gap-3 justify-between items-center">
        <div className="flex items-center gap-1">
          <p className="text-gray-400 text-sm">{number}</p>
          <p className="text-gray-400 text-sm">{creationDate}</p>
          {/* <IoMdTime className="text-gray-400 text-xs" /> */}
        </div>
        <div className="px-4 py-1 bg-[#17a2b8] rounded-md text-white text-sm">
          {status}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
