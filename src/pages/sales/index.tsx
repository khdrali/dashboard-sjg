import StatisticsChart from "@/common/components/ChartTab/StaticsChart";
import { formatPrice } from "@/common/utils/formatPrice";
import { FaCalendar } from "react-icons/fa";

const DashboardSales = () => {
  return (
    <div className="w-full flex flex-col gap-7 overflow-hidden">
      <div className="flex w-full justify-between items-center">
        <div className="flex justify-between items-center w-full max-w-[250px] rounded-md border-l-4 border-[#4E73DE] bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-start flex-col justify-center">
            <p className="text-sm text-[#4E73DE]">Total</p>
            <p className="text-xl text-[#5a5c69] font-bold">
              {formatPrice(10000000)}
            </p>
          </div>
          <FaCalendar className="text-[#dddfeb] w-8 h-8" />
        </div>
      </div>
      <StatisticsChart />
    </div>
  );
};

export default DashboardSales;
