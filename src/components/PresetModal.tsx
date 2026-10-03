import React from 'react';
import { PRESET_LIST, ASPEK_MAPPINGS, generateSkenario } from '../data/rpaData';
import { RpaDocument } from '../types/rpa';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

interface PresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (presetDoc: RpaDocument) => void;
  currentDoc: RpaDocument;
}

export const PresetModal: React.FC<PresetModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentDoc,
}) => {
  if (!isOpen) return null;

  const handleApplyPreset = (presetItem: (typeof PRESET_LIST)[0]) => {
    const selectedAspek = presetItem.data.aspekMasalah || currentDoc.aspekMasalah;
    const mapping = ASPEK_MAPPINGS[selectedAspek] || ASPEK_MAPPINGS[Object.keys(ASPEK_MAPPINGS)[0]];
    const strategies = presetItem.data.strategiMetode || currentDoc.strategiMetode;

    const { skenario, sumberDaya } = generateSkenario(strategies);

    const merged: RpaDocument = {
      ...currentDoc,
      aspekMasalah: selectedAspek,
      tujuan: mapping.tujuan,
      indikator: mapping.indikator,
      waktu: presetItem.data.waktu || currentDoc.waktu,
      tempat: presetItem.data.tempat || currentDoc.tempat,
      strategiMetode: strategies,
      skenario,
      sumberDaya,
      penilaianInstrumen: mapping.penilaianInstrumen,
      rencanaTindakLanjut: mapping.rencanaTindakLanjut,
      instrumenPenilaian: mapping.instrumen,
      rubrikPenilaian: mapping.rubrik,
    };

    onSelectPreset(merged);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-xl font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                Pilih Skenario Kasus PAI Cepat
              </h3>
              <p className="text-xs text-emerald-200">
                Gunakan template kasus riil pengawasan PAI yang telah disesuaikan dengan Kurikulum Merdeka
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
          {PRESET_LIST.map((preset, index) => (
            <div
              key={index}
              onClick={() => handleApplyPreset(preset)}
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-600 bg-slate-50/50 hover:bg-emerald-50/40 transition-all cursor-pointer group flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-950">
                    {preset.name}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-800">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {preset.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                  <span className="font-medium text-emerald-700">
                    Metode: {preset.data.strategiMetode?.join(', ')}
                  </span>
                </div>
              </div>

              <div className="shrink-0 p-2 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
