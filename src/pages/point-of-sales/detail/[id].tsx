// pages/point-of-sales/preview/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatPrice } from "@/common/utils/formatPrice";
import SubmitButton from "@/common/components/button/SubmitButton";

// Dummy data yang bisa kamu letakkan di file terpisah jika perlu
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

export default function PreviewPage() {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const found = initialData.find((x) => x.id === Number(id));
      setItem(found ?? null);
    }
  }, [id]);

  if (!item) {
    return <p className="p-6">Data tidak ditemukan.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Detail Point of Sales</h1>
      <div className="space-y-5 mb-6">
        <DetailRow label="Number" value={item.number} />
        <DetailRow label="Creation Date" value={item.creationDate} />
        <DetailRow label="Customer" value={item.customer} />
        <DetailRow label="Salesperson" value={item.salesperson} />
        <DetailRow label="Activities" value={item.Activities} />
        <DetailRow label="Total" value={formatPrice(item.total)} />
        <DetailRow label="Status" value={item.status} />
      </div>

      <SubmitButton
        type="button"
        onClick={() => router.back()}
        label="Back"
        disabled={false}
      />
    </div>
  );
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);
