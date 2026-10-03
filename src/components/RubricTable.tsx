import React from 'react';
import { RubrikItem } from '../types/rpa';
import { Plus, Trash2 } from 'lucide-react';

interface RubricTableProps {
  items: RubrikItem[];
  onChange: (items: RubrikItem[]) => void;
  readOnlyPreview?: boolean;
}

export const RubricTable: React.FC<RubricTableProps> = ({
  items,
  onChange,
  readOnlyPreview = false,
}) => {
  const handleItemChange = (id: number, field: keyof RubrikItem, value: any) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const handleAddItem = () => {
    const newItem: RubrikItem = {
      id: Date.now(),
      komponenProduk: 'Komponen Produk Baru',
      kriteria: 'Kesesuaian dengan capaian pembelajaran',
      level4: 'Sangat komprehensif, memenuhi seluruh indikator dengan sempurna dan orisinal.',
      level3: 'Memenuhi sebagian besar indikator pokok dengan baik dan jelas.',
      level2: 'Memenuhi beberapa indikator minimal namun masih memerlukan revisi pada beberapa bagian.',
      level1: 'Belum memenuhi indikator minimal yang dipersyaratkan.',
    };
    onChange([...items, newItem]);
  };

  const handleDeleteItem = (id: number) => {
    if (items.length <= 1) return;
    onChange(items.filter((item) => item.id !== id));
  };

  if (readOnlyPreview) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-black text-xs sm:text-sm text-slate-900">
          <thead>
            <tr className="bg-slate-100 border-b-2 border-black font-bold text-center">
              <th className="border border-black px-2 py-2.5 w-10 text-center">NO</th>
              <th className="border border-black px-3 py-2.5 w-44 text-left">
                KOMPONEN / KRITERIA
              </th>
              <th className="border border-black px-3 py-2.5 text-center bg-emerald-50/50">
                SANGAT BAIK (4)
              </th>
              <th className="border border-black px-3 py-2.5 text-center bg-blue-50/50">
                BAIK (3)
              </th>
              <th className="border border-black px-3 py-2.5 text-center bg-amber-50/50">
                CUKUP (2)
              </th>
              <th className="border border-black px-3 py-2.5 text-center bg-rose-50/50">
                PERLU BIMBINGAN (1)
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id} className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  {idx + 1}
                </td>
                <td className="border border-black px-3 py-3 font-semibold align-top text-slate-950">
                  <p>{item.komponenProduk}</p>
                  <p className="text-[11px] font-normal text-slate-600 mt-1 italic">
                    {item.kriteria}
                  </p>
                </td>
                <td className="border border-black px-3 py-3 text-justify align-top leading-relaxed text-xs">
                  {item.level4}
                </td>
                <td className="border border-black px-3 py-3 text-justify align-top leading-relaxed text-xs">
                  {item.level3}
                </td>
                <td className="border border-black px-3 py-3 text-justify align-top leading-relaxed text-xs">
                  {item.level2}
                </td>
                <td className="border border-black px-3 py-3 text-justify align-top leading-relaxed text-xs">
                  {item.level1}
                </td>
              </tr>
            ))}
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
            Rubrik Penilaian Proyek / Produk Perangkat PAI
          </h4>
          <p className="text-xs text-slate-500">
            Kriteria penilaian produk (Modul Ajar, Asesmen, Media Digital, Proposal PTK) dalam 4 level mutu.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Komponen Rubrik</span>
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-800">
                Komponen #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => handleDeleteItem(item.id)}
                disabled={items.length <= 1}
                className="text-xs text-rose-600 hover:text-rose-800 disabled:opacity-30 inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Komponen</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Nama Komponen Produk:
                </label>
                <input
                  type="text"
                  value={item.komponenProduk}
                  onChange={(e) =>
                    handleItemChange(item.id, 'komponenProduk', e.target.value)
                  }
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Kriteria Penilaian:
                </label>
                <input
                  type="text"
                  value={item.kriteria}
                  onChange={(e) =>
                    handleItemChange(item.id, 'kriteria', e.target.value)
                  }
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
              {/* Level 4 */}
              <div className="p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-200">
                <label className="block text-[10px] font-bold text-emerald-900 uppercase mb-1">
                  Level 4: Sangat Baik
                </label>
                <textarea
                  rows={4}
                  value={item.level4}
                  onChange={(e) =>
                    handleItemChange(item.id, 'level4', e.target.value)
                  }
                  className="w-full p-2 text-xs bg-white border border-emerald-300 rounded text-slate-800 leading-relaxed"
                />
              </div>

              {/* Level 3 */}
              <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-200">
                <label className="block text-[10px] font-bold text-blue-900 uppercase mb-1">
                  Level 3: Baik
                </label>
                <textarea
                  rows={4}
                  value={item.level3}
                  onChange={(e) =>
                    handleItemChange(item.id, 'level3', e.target.value)
                  }
                  className="w-full p-2 text-xs bg-white border border-blue-300 rounded text-slate-800 leading-relaxed"
                />
              </div>

              {/* Level 2 */}
              <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200">
                <label className="block text-[10px] font-bold text-amber-900 uppercase mb-1">
                  Level 2: Cukup
                </label>
                <textarea
                  rows={4}
                  value={item.level2}
                  onChange={(e) =>
                    handleItemChange(item.id, 'level2', e.target.value)
                  }
                  className="w-full p-2 text-xs bg-white border border-amber-300 rounded text-slate-800 leading-relaxed"
                />
              </div>

              {/* Level 1 */}
              <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-200">
                <label className="block text-[10px] font-bold text-rose-900 uppercase mb-1">
                  Level 1: Perlu Bimbingan
                </label>
                <textarea
                  rows={4}
                  value={item.level1}
                  onChange={(e) =>
                    handleItemChange(item.id, 'level1', e.target.value)
                  }
                  className="w-full p-2 text-xs bg-white border border-rose-300 rounded text-slate-800 leading-relaxed"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
