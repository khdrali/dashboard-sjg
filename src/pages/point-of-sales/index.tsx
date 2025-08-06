import { useState } from "react";
import { useRouter } from "next/router";
import FlexibleTable from "@/common/components/table/TableComponent";
import { formatPrice } from "@/common/utils/formatPrice";

const columns = [
  { label: "Number", key: "number" },
  { label: "Creation Date", key: "creationDate" },
  { label: "Customer", key: "customer" },
  { label: "SalesPerson", key: "salesperson" },
  { label: "Activities", key: "Activities" },
  { label: "Total", key: "total" },
  { label: "Status", key: "status" },
];

const initialData = [
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
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 3,
    number: "500001",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 4,
    number: "500002",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
];

export default function PointOfSalesPage() {
  const router = useRouter();

  const [data, setData] = useState(
    initialData.map((item) => ({
      ...item,
      total: formatPrice(item.total),
    }))
  );

  const handleDelete = (row: any) => {
    const confirmDelete = confirm(`Hapus data dengan ID ${row.id}?`);
    if (confirmDelete) {
      setData((prev) => prev.filter((item) => item.id !== row.id));
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Point of Sales</h1>
        <button
          onClick={() => router.push("/point-of-sales/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
        >
          + Add New
        </button>
      </div>

      <FlexibleTable
        columns={columns}
        data={data}
        onClickUpdate={(row) => {
          router.push(`/point-of-sales/update/${row.id}`);
        }}
        onClickDelete={handleDelete}
        onClickDetail={(row) => {
          router.push(`/point-of-sales/detail/${row.id}`);
        }}
      />
    </div>
  );
}
