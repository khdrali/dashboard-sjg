import KanbanCard from "@/common/components/Card/Kanban";
import TableSearch from "@/common/components/input/SearchComponent";
import TablePagination from "@/common/components/pagination/Pagination";
import { PosItem } from "@/common/context/PostContext";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

// total page per halaman
const itemsPerPage = 15;

// contoh data
const initialPosData: PosItem[] = [
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
    number: "500003",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 4,
    number: "500004",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 5,
    number: "500001",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 6,
    number: "500002",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 7,
    number: "500003",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 8,
    number: "500004",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 9,
    number: "500001",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 10,
    number: "500002",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 11,
    number: "500003",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 12,
    number: "500100",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 13,
    number: "500001",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 14,
    number: "500002",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 15,
    number: "500003",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 16,
    number: "500004",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 17,
    number: "500001",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 18,
    number: "500002",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 19,
    number: "500003",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 20,
    number: "500004",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 21,
    number: "500001",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 22,
    number: "500002",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
  {
    id: 23,
    number: "500003",
    creationDate: "08/03/2025 22:08",
    customer: "Testing",
    salesperson: "Muhammad Rafli",
    Activities: "Active",
    total: 2000000,
    status: "Quotation",
  },
  {
    id: 24,
    number: "500100",
    creationDate: "08/03/2025 22:08",
    customer: "Another",
    salesperson: "Khaidar Ali",
    Activities: "Pending",
    total: 900000,
    status: "Quotation",
  },
];

const KanbanScreen = () => {
  const router = useRouter();
  // state search
  const [searchTerm, setSearchTerm] = useState("");
  // state page
  const [page, setPage] = useState(1);

  // filter data by customer dan number
  const filteredData = useMemo(() => {
    return initialPosData.filter(
      (item) =>
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.number.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // ambil data dari page yang aktif
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, page]);

  useEffect(() => {
    setPage(1); // Reset ke halaman 1 saat search berubah
  }, [searchTerm]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Kanban</h1>
        <div className="flex items-center gap-4">
          {/* component search */}
          <TableSearch
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search"
          />
          {/* <button
            onClick={() => router.push("/point-of-sales/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg w-[200px]"
          >
            + Add New
          </button> */}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paginatedData.map((item) => (
          // component card kanban
          <KanbanCard
            key={item.id}
            creationDate={item?.creationDate}
            customer={item?.customer}
            number={item?.number}
            status={item?.status}
            total={item?.total}
          />
        ))}
      </div>

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <TablePagination
          currentPage={page}
          onPageChange={setPage}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default KanbanScreen;
