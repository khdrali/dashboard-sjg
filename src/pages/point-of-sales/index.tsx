"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import FlexibleTable from "@/common/components/table/TableComponent";
import TableSearch from "@/common/components/input/SearchComponent";
import TablePagination from "@/common/components/pagination/Pagination";
import { formatPrice } from "@/common/utils/formatPrice";
import { usePosContext } from "@/common/context/PostContext"; // ⬅ Tambahkan ini

const columns = [
  { label: "No", key: "no" },
  { label: "Number", key: "number" },
  { label: "Creation Date", key: "creationDate" },
  { label: "Customer", key: "customer" },
  { label: "SalesPerson", key: "salesperson" },
  { label: "Activities", key: "Activities" },
  { label: "Total", key: "total" },
  { label: "Status", key: "status" },
];

export default function PointOfSalesPage() {
  const router = useRouter();
  const { posData, deletePosItem } = usePosContext(); // ⬅ Pakai context global

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = useMemo(() => {
    if (!search) return posData;
    const term = search.toLowerCase();
    return posData.filter(
      (item) =>
        item.number.toLowerCase().includes(term) ||
        item.customer.toLowerCase().includes(term)
    );
  }, [search, posData]);

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return filtered.slice(start, end).map((item, idx) => ({
      ...item,
      no: start + idx + 1,
      total: formatPrice(Number(item.total)),
    }));
  }, [filtered, page]);

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(`Hapus data dengan ID ${id}?`);
    if (confirmDelete) {
      deletePosItem(id); // ⬅ Delete dari context
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-semibold">Point of Sales</h1>
        <div className="flex gap-4 items-center">
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search"
          />
          <button
            onClick={() => router.push("/point-of-sales/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg w-[200px]"
          >
            + Add New
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <FlexibleTable
          columns={columns}
          data={paginated}
          onClickUpdate={(item) =>
            router.push(`/point-of-sales/update/${item.id}`)
          }
          onClickDelete={(row) => handleDelete(row?.id)}
          onClickDetail={(row) =>
            router.push(`/point-of-sales/detail/${row.id}`)
          }
        />
      </div>

      {filtered.length > itemsPerPage && (
        <TablePagination
          currentPage={page}
          onPageChange={setPage}
          totalItems={filtered.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}
