import StatisticsChart from "@/common/components/ChartTab/StaticsChart";
import { formatPrice } from "@/common/utils/formatPrice";

const DashboardSales = () => {
  return (
    <div className="w-full flex flex-col gap-7 overflow-hidden">
      <div className="flex w-full justify-between items-center">
        <div className=" rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <p className="text-lg font-semibold text-gray-800 mb-4">Total</p>

          <div className="flex items-center gap-6 justify-between">
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(10000000)}
            </p>
            <p className="text-sm font-medium text-green-500 bg-green-100 px-2 py-1 rounded-full">
              +20%
            </p>
          </div>
        </div>
      </div>
      <StatisticsChart />
    </div>
  );
};

export default DashboardSales;
