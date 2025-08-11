import TableSearch from "@/common/components/input/SearchComponent";
import TablePagination from "@/common/components/pagination/Pagination";
import FlexibleTable from "@/common/components/table/TableComponent";
import { usePosContext } from "@/common/context/PostContext";
import { formatPrice } from "@/common/utils/formatPrice";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";

// table head
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

const PointSalesScreen = () => {
  // route
  const router = useRouter();

  // state global buat nambah data dummy pas buat data baru
  const { posData, deletePosItem } = usePosContext();

  // state search & page
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    setPage(1);
  }, [search]);

  // fungsi search
  const filtered = useMemo(() => {
    if (!search) return posData;
    const term = search.toLowerCase();
    return posData.filter(
      (item) =>
        item.number.toLowerCase().includes(term) ||
        item.customer.toLowerCase().includes(term)
    );
  }, [search, posData]);

  // fungsi batasin data yang ditampilin per page
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return filtered.slice(start, end).map((item, idx) => ({
      ...item,
      no: start + idx + 1,
      total: formatPrice(Number(item.total)),
    }));
  }, [filtered, page]);

  // fungsi delete row table
  const handleDelete = (id: number) => {
    const confirmDelete = confirm(`Hapus data dengan ID ${id}?`);
    if (confirmDelete) {
      deletePosItem(id); // ⬅ Delete dari context
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">Point of Sales</h1>
        <div className="flex items-center gap-4">
          {/* component search */}
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search by Customer"
          />
          <button
            // fungsi saat di klik
            onClick={() => router.push("/point-of-sales/add")}
            // style
            className="w-[200px] rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            + Add New
          </button>
        </div>
      </div>
      {/* component table */}
      <div className="w-full overflow-x-auto">
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
      {/* pagination */}
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
};

export default PointSalesScreen;
