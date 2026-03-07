"use client";

import React from 'react';
import { DataTable, ColumnDef } from '@/components/dashboard/DataTable';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

export type BrandListItem = {
    id: string;
    companyName: string | null;
    status: string | null;
    updatedAt: string;
    completionPercent: number;
    missingFieldsCount: number;
};

const columns: ColumnDef<BrandListItem>[] = [
    {
        header: "Entreprise / Identifiant",
        accessorKey: "companyName",
        cell: (item) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-questionnaire-muted flex items-center justify-center text-xs font-semibold text-questionnaire-primary border border-questionnaire-muted">
                    {item.companyName ? item.companyName.substring(0, 2).toUpperCase() : '?'}
                </div>
                <span className="font-medium text-white">{item.companyName || 'Anonyme'}</span>
            </div>
        )
    },
    {
        header: "Complétion",
        cell: (item) => (
            <div className="w-full max-w-[120px]">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Progression</span>
                    <span className="text-white">{item.completionPercent}%</span>
                </div>
                <div className="h-1.5 w-full bg-questionnaire-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-questionnaire-primary to-questionnaire-secondary transition-all"
                        style={{ width: `${item.completionPercent}%` }}
                    />
                </div>
            </div>
        )
    },
    {
        header: "Activité",
        cell: (item) => {
            const isNew = new Date().getTime() - new Date(item.updatedAt).getTime() < 24 * 60 * 60 * 1000;
            return (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                        il y a {formatDistanceToNow(new Date(item.updatedAt), { locale: fr })}
                    </span>
                    {isNew && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Nouveau
                        </span>
                    )}
                </div>
            )
        }
    },
    {
        header: "Statut",
        cell: (item) => {
            const isComplete = item.completionPercent === 100;
            return (
                <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-semibold 
          ${isComplete ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                    {isComplete ? 'Complet' : 'En cours'}
                </span>
            );
        }
    },
    {
        header: "Manquants",
        cell: (item) => (
            item.missingFieldsCount > 0 ? (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20 rounded">
                    {item.missingFieldsCount}
                </span>
            ) : (
                <span className="text-gray-500 text-xs">—</span>
            )
        )
    },
    {
        header: "Actions",
        cell: (item) => (
            <Link
                href={`/admin/brands/questionnaires/${item.id}`}
                className="text-xs text-questionnaire-primary hover:text-white transition-colors"
            >
                Voir détails →
            </Link>
        )
    }
];

export function BrandListClient({ data }: { data: BrandListItem[] }) {
    const [filteredData, setFilteredData] = React.useState(data);

    const handleSearch = (term: string) => {
        if (!term) {
            setFilteredData(data);
            return;
        }
        const lower = term.toLowerCase();
        setFilteredData(data.filter(d => d.companyName?.toLowerCase().includes(lower)));
    };

    return (
        <DataTable
            data={filteredData}
            columns={columns}
            searchPlaceholder="Rechercher une marque..."
            onSearch={handleSearch}
        />
    );
}
