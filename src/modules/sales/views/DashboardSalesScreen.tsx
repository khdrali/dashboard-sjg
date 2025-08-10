import StatisticsChart from "@/common/components/ChartTab/StaticsChart";
import { formatPrice } from "@/common/utils/formatPrice";
import { FaCalendar } from "react-icons/fa";

const DashboardSalesScreen = () => {
  return (
    <div className="flex w-full flex-col gap-7 overflow-hidden">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full max-w-[250px] items-center justify-between rounded-md border-l-4 border-[#4E73DE] bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex flex-col items-start justify-center">
            <p className="text-sm text-[#4E73DE]">Total</p>
            <p className="text-xl font-bold text-[#5a5c69]">
              {formatPrice(10000000)}
            </p>
          </div>
          <FaCalendar className="h-8 w-8 text-[#dddfeb]" />
        </div>
      </div>
      <StatisticsChart />
    </div>
  );
};

export default DashboardSalesScreen;
