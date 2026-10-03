import React, { useState, useEffect } from 'react';
import { RpaDocument } from './types/rpa';
import { INITIAL_RPA_DOCUMENT } from './data/rpaData';
import { Header } from './components/Header';
import { RpaForm } from './components/RpaForm';
import { RpaPreview } from './components/RpaPreview';
import { InstrumentTable } from './components/InstrumentTable';
import { RubricTable } from './components/RubricTable';
import { PresetModal } from './components/PresetModal';
import { AlertCircle, CheckCircle2, FileSpreadsheet, Layers, ShieldCheck } from 'lucide-react';

const STORAGE_KEY = 'generator_rpa_waspai_data_v1';

export default function App() {
  const [doc, setDoc] = useState<RpaDocument>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved RPA from localStorage', e);
    }
    return INITIAL_RPA_DOCUMENT;
  });

  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'instruments'>('form');
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [doc]);

  // Validation function
  const validateDoc = (): string[] => {
    const errors: string[] = [];
    if (!doc.identitas.namaPengawas.trim()) errors.push('Nama Pengawas PAI wajib diisi');
    if (!doc.identitas.nipPengawas.trim()) errors.push('NIP Pengawas PAI wajib diisi');
    if (!doc.identitas.namaKetuaPokjawas.trim()) errors.push('Nama Ketua Pokjawas PAI wajib diisi');
    if (!doc.identitas.nipKetuaPokjawas.trim()) errors.push('NIP Ketua Pokjawas PAI wajib diisi');
    if (!doc.identitas.unitKerja.trim()) errors.push('Unit Kerja Pengawas wajib diisi');
    if (!doc.waktu.trim()) errors.push('Waktu Pelaksanaan supervisi wajib diisi');
    if (!doc.tempat.trim()) errors.push('Tempat Pelaksanaan supervisi wajib diisi');
    if (!doc.tujuan.trim()) errors.push('Tujuan Pengawasan wajib diisi');
    if (!doc.indikator.trim()) errors.push('Indikator Keberhasilan wajib diisi');
    if (doc.strategiMetode.length === 0) errors.push('Pilih minimal 1 Strategi / Metode Kerja');
    return errors;
  };

  const currentErrors = validateDoc();
  const isValid = currentErrors.length === 0;

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang data ke setelan awal?')) {
      setDoc(INITIAL_RPA_DOCUMENT);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans selection:bg-emerald-200">
      {/* Main Header with Navigation & Quick Actions */}
      <Header
        doc={doc}
        onReset={handleReset}
        onOpenPresets={() => setIsPresetModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isValid={isValid}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Validation Warning Banner if invalid and not on form */}
        {!isValid && activeTab !== 'form' && (
          <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl shadow-sm no-print">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 text-sm">
                  Beberapa komponen wajib belum terisi dengan lengkap:
                </h4>
                <ul className="mt-1 list-disc list-inside text-xs text-amber-800 space-y-0.5">
                  {currentErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setActiveTab('form')}
                  className="mt-2 text-xs font-semibold text-emerald-800 underline cursor-pointer hover:text-emerald-950"
                >
                  Kembali ke Formulir Input untuk Melengkapi &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: FORM INPUT */}
        {activeTab === 'form' && (
          <div className="animate-fadeIn">
            <RpaForm
              doc={doc}
              onChange={setDoc}
              onNavigateToPreview={() => setActiveTab('preview')}
            />
          </div>
        )}

        {/* TAB 2: TABEL SPREADSHEET PREVIEW & PRINT */}
        {activeTab === 'preview' && (
          <div className="animate-fadeIn">
            <RpaPreview
              doc={doc}
              onEdit={() => setActiveTab('form')}
              onUpdateDoc={setDoc}
            />
          </div>
        )}

        {/* TAB 3: INSTRUMEN & RUBRIK EDITORS */}
        {activeTab === 'instruments' && (
          <div className="space-y-8 animate-fadeIn pb-16">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 mb-6">
                <div className="p-2.5 bg-blue-100 text-blue-800 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    Lampiran I: Instrumen Penilaian Pengawasan Akademik
                  </h3>
                  <p className="text-xs text-slate-500">
                    Format lembar catatan observasi, skor maksimal, perolehan hasil, dan catatan kualitatif pengawas.
                  </p>
                </div>
              </div>

              <InstrumentTable
                items={doc.instrumenPenilaian}
                onChange={(items) => setDoc({ ...doc, instrumenPenilaian: items })}
                readOnlyPreview={false}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 mb-6">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Layers className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    Lampiran II: Rubrik Penilaian Proyek / Produk Perangkat PAI
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pedoman penskoran kualitas produk perencanaan dan asesmen (Sangat Baik / Baik / Cukup / Perlu Bimbingan).
                  </p>
                </div>
              </div>

              <RubricTable
                items={doc.rubrikPenilaian}
                onChange={(items) => setDoc({ ...doc, rubrikPenilaian: items })}
                readOnlyPreview={false}
              />
            </div>

            <div className="flex justify-end gap-3 no-print">
              <button
                onClick={() => setActiveTab('preview')}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Lihat Tabel Spreadsheet RPA Lengkap &rarr;
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Preset Modal */}
      <PresetModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={setDoc}
        currentDoc={doc}
      />

      {/* Official Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-emerald-800">Generator RPA WasPAI</span>
            <span>&bull;</span>
            <span>Standar Supervisi Akademik Guru PAI Kemenag RI</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Sesuai Pedoman Kurikulum Merdeka PAI (KMA No. 450 Tahun 2024 & Permendikbudristek)
          </p>
        </div>
      </footer>
    </div>
  );
}
