"use client";

import React, { useState } from 'react';
import { ChevronDown, Search, ArrowUpDown } from 'lucide-react';

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
    onSearch
}: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch?.(e.target.value);
    };

    return (
        <div className="w-full flex md:block flex-col gap-4">
            {/* Search Bar */}
            <div className="flex items-center justify-between py-4">
                <div className="relative max-w-sm w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="bg-questionnaire-surface border border-questionnaire-muted text-white text-sm rounded-lg focus:ring-questionnaire-primary focus:border-questionnaire-primary block w-full pl-10 p-2.5 outline-none transition-colors"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="relative overflow-x-auto rounded-xl border border-questionnaire-muted glass-panel">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-questionnaire-elevated border-b border-questionnaire-muted">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} scope="col" className="px-6 py-4 font-medium tracking-wider">
                                    <div className="flex items-center gap-2">
                                        {col.header}
                                        {col.sortable && (
                                            <button className="hover:text-white transition-colors">
                                                <ArrowUpDown className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="border-b border-questionnaire-muted hover:bg-white/[0.02] transition-colors last:border-0"
                                >
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
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
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                                    Aucun résultat trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
