import React from "react";
import { BsPencil } from "react-icons/bs";
import { LuEye } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

interface Column {
  label: string;
  key: string;
}

interface FlexibleTableProps {
  columns: Column[];
  data: Record<string, any>[];
  onClickUpdate?: (item: Record<string, any>) => void;
  onClickDelete?: (item: Record<string, any>) => void;
  onClickDetail?: (item: Record<string, any>) => void;
}

const FlexibleTable: React.FC<FlexibleTableProps> = ({
  columns,
  data,
  onClickUpdate,
  onClickDelete,
  onClickDetail,
}) => {
  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-12">
              No
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-32">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-800">{idx + 1}</td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap"
                  >
                    {item[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-x-3">
                    <button
                      onClick={() => onClickDetail?.(item)}
                      title="Detail"
                    >
                      <LuEye className="w-5 h-5 text-blue-500 cursor-pointer" />
                    </button>
                    <button onClick={() => onClickUpdate?.(item)} title="Edit">
                      <BsPencil className="w-5 h-5 text-yellow-500 cursor-pointer" />
                    </button>
                    <button onClick={() => onClickDelete?.(item)} title="Hapus">
                      <MdDelete className="w-5 h-5 text-red-500 cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="px-4 py-6 text-center text-sm text-gray-500"
              >
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlexibleTable;
