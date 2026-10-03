import React from 'react';
import { InstrumentItem } from '../types/rpa';
import { Plus, Trash2, CheckCircle, Calculator } from 'lucide-react';

interface InstrumentTableProps {
  items: InstrumentItem[];
  onChange: (items: InstrumentItem[]) => void;
  readOnlyPreview?: boolean;
}

export const InstrumentTable: React.FC<InstrumentTableProps> = ({
  items,
  onChange,
  readOnlyPreview = false,
}) => {
  const handleItemChange = (
    id: number,
    field: keyof InstrumentItem,
    value: any
  ) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleAddItem = () => {
    const newItem: InstrumentItem = {
      id: Date.now(),
      aspekYangDiamati: 'Aspek Observasi Tambahan',
      indikatorKinerja: 'Indikator kinerja yang dapat diobservasi secara terukur',
      skorMaksimal: 4,
      skorPerolehan: 4,
      catatanKualitatif: 'Telah terlaksana dengan baik',
    };
    onChange([...items, newItem]);
  };

  const handleDeleteItem = (id: number) => {
    if (items.length <= 1) return;
    onChange(items.filter((item) => item.id !== id));
  };

  // Compute Total
  const totalMax = items.reduce((acc, curr) => acc + (curr.skorMaksimal || 4), 0);
  const totalObtained = items.reduce(
    (acc, curr) => acc + (curr.skorPerolehan || 0),
    0
  );
  const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : '0';

  let kualifikasi = 'Sangat Baik (A)';
  const numPerc = parseFloat(percentage);
  if (numPerc < 60) kualifikasi = 'Kurang (D)';
  else if (numPerc < 75) kualifikasi = 'Cukup (C)';
  else if (numPerc < 86) kualifikasi = 'Baik (B)';

  if (readOnlyPreview) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-black text-xs sm:text-sm text-slate-900">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-black font-bold text-center">
              <th className="border border-black px-2 py-2.5 w-10 text-center">NO</th>
              <th className="border border-black px-3 py-2.5 w-48 text-left">
                ASPEK YANG DIAMATI
              </th>
              <th className="border border-black px-4 py-2.5 text-center">
                INDIKATOR KINERJA
              </th>
              <th className="border border-black px-2 py-2.5 w-16 text-center">
                SKOR MAKS
              </th>
              <th className="border border-black px-2 py-2.5 w-16 text-center">
                SKOR HASIL
              </th>
              <th className="border border-black px-3 py-2.5 w-44 text-left">
                CATATAN KUALITATIF
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} className="border-b border-black">
                <td className="border border-black px-2 py-2.5 text-center font-bold align-top">
                  {idx + 1}
                </td>
                <td className="border border-black px-3 py-2.5 font-semibold align-top text-slate-950">
                  {item.aspekYangDiamati}
                </td>
                <td className="border border-black px-4 py-2.5 text-justify leading-relaxed align-top">
                  {item.indikatorKinerja}
                </td>
                <td className="border border-black px-2 py-2.5 text-center font-medium align-top">
                  {item.skorMaksimal}
                </td>
                <td className="border border-black px-2 py-2.5 text-center font-bold align-top text-emerald-800">
                  {item.skorPerolehan ?? '-'}
                </td>
                <td className="border border-black px-3 py-2.5 text-justify align-top text-xs leading-relaxed">
                  {item.catatanKualitatif || '-'}
                </td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-bold border-t-2 border-black">
              <td colSpan={3} className="border border-black px-3 py-2.5 text-right uppercase">
                Total Skor & Nilai Ketercapaian
              </td>
              <td className="border border-black px-2 py-2.5 text-center">{totalMax}</td>
              <td className="border border-black px-2 py-2.5 text-center text-emerald-800">
                {totalObtained > 0 ? totalObtained : '-'}
              </td>
              <td className="border border-black px-3 py-2.5 text-left text-xs">
                {totalObtained > 0 ? `${percentage}% (${kualifikasi})` : 'Format Siap Observasi'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Interactive Editable Mode
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <h4 className="font-bold text-slate-800 text-sm sm:text-base">
            Tabel Instrumen Penilaian Pengawasan Akademik
          </h4>
          <p className="text-xs text-slate-500">
            Daftar indikator observasi keterlaksanaan kinerja guru PAI. Anda dapat mengubah butir, memasukkan skor, atau menambah kriteria.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Skor: {totalObtained}/{totalMax} ({percentage}%)</span>
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Butir</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
        <table className="w-full text-xs text-left border-collapse">
          <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
            <tr>
              <th className="p-3 w-10 text-center">No</th>
              <th className="p-3 w-48">Aspek yang Diamati</th>
              <th className="p-3">Indikator Kinerja</th>
              <th className="p-3 w-20 text-center">Skor Maks</th>
              <th className="p-3 w-20 text-center">Skor Nilai</th>
              <th className="p-3 w-48">Catatan Kualitatif</th>
              <th className="p-3 w-12 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="p-3 text-center font-bold text-slate-500">{index + 1}</td>
                <td className="p-3">
                  <input
                    type="text"
                    value={item.aspekYangDiamati}
                    onChange={(e) =>
                      handleItemChange(item.id, 'aspekYangDiamati', e.target.value)
                    }
                    className="w-full px-2 py-1.5 border border-slate-300 rounded font-semibold text-slate-800 focus:ring-1 focus:ring-emerald-500"
                  />
                </td>
                <td className="p-3">
                  <textarea
                    rows={2}
                    value={item.indikatorKinerja}
                    onChange={(e) =>
                      handleItemChange(item.id, 'indikatorKinerja', e.target.value)
                    }
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-slate-800 focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </td>
                <td className="p-3 text-center">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={item.skorMaksimal}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        'skorMaksimal',
                        parseInt(e.target.value) || 4
                      )
                    }
                    className="w-14 px-2 py-1 text-center border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 font-bold"
                  />
                </td>
                <td className="p-3 text-center">
                  <input
                    type="number"
                    min={0}
                    max={item.skorMaksimal}
                    value={item.skorPerolehan ?? ''}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        'skorPerolehan',
                        e.target.value === '' ? undefined : parseInt(e.target.value)
                      )
                    }
                    placeholder="-"
                    className="w-14 px-2 py-1 text-center border border-emerald-400 bg-emerald-50/50 rounded focus:ring-1 focus:ring-emerald-500 font-bold text-emerald-900"
                  />
                </td>
                <td className="p-3">
                  <textarea
                    rows={2}
                    value={item.catatanKualitatif}
                    onChange={(e) =>
                      handleItemChange(item.id, 'catatanKualitatif', e.target.value)
                    }
                    placeholder="Catatan temuan..."
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-slate-800 focus:ring-1 focus:ring-emerald-500 text-xs"
                  />
                </td>
                <td className="p-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    disabled={items.length <= 1}
                    className="text-slate-400 hover:text-rose-600 disabled:opacity-30 transition-colors p-1"
                    title="Hapus baris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
