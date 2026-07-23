import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Column } from "../(dashboard)/dashboard/columns";

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
};

export default function DataTable<T>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <Table className="border-collapse text-[12.5px]">
      <TableHeader className="[&_tr]:border-b-0">
        <TableRow className="border-b-0 hover:bg-transparent">
          {columns.map((column) => (
            <TableHead
              key={column.key.toString()}
              className="h-auto px-0 pb-2 text-left text-[10.5px] font-medium uppercase text-ink-faint"
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="[&_tr:last-child]:border-t [&_tr:last-child]:border-border">
        {data.map((row, index) => (
          <TableRow
            key={index}
            onClick={() => onRowClick?.(row)}
            className={`border-t border-b-0 border-border hover:bg-transparent ${
              onRowClick ? "cursor-pointer" : ""
            }`}
          >
            {columns.map((column) => (
              <TableCell
                key={column.key.toString()}
                className="px-2 py-2.5 first:pl-0"
              >
                {column.render
                  ? column.render(row)
                  : String(row[column.key as keyof T] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}