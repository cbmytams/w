"use client";

import React, { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";

export type ColumnDef<T> = {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    sortable?: boolean;
};

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    searchPlaceholder?: string;
    onSearch?: (value: string) => void;
}

export function DataTable<T>({
    data,
    columns,
    searchPlaceholder = "Rechercher...",
    onSearch,
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch?.(e.target.value);
    };

    return (
        <div className="w-full flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex items-center py-2">
                <div className="relative max-w-sm w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <Search className="w-3.5 h-3.5 text-white/30" />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl focus:ring-1 focus:ring-white/20 focus:border-white/20 pl-10 pr-4 py-2.5 outline-none transition-all placeholder-white/20"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="surface-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="border-b border-white/5">
                            <tr>
                                {columns.map((col, idx) => (
                                    <th
                                        key={idx}
                                        scope="col"
                                        className="px-6 py-3 text-[9px] uppercase tracking-[0.3em] text-white/25 font-medium whitespace-nowrap"
                                    >
                                        <div className="flex items-center gap-2">
                                            {col.header}
                                            {col.sortable && (
                                                <button
                                                    type="button"
                                                    aria-label={`Trier par ${col.header}`}
                                                    className="hover:text-white/60 transition-colors text-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded"
                                                >
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        {columns.map((col, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className="px-6 py-4 whitespace-nowrap text-white/70"
                                            >
                                                {col.cell
                                                    ? col.cell(row)
                                                    : col.accessorKey
                                                        ? (row[col.accessorKey] as React.ReactNode)
                                                        : null}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-6 py-12 text-center text-white/25 text-sm"
                                    >
                                        Aucun résultat trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
