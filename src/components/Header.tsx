import React from 'react';
import { Download, Printer, RotateCcw, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { RpaDocument } from '../types/rpa';
import { exportRpaToWord } from '../utils/wordExport';

interface HeaderProps {
  doc: RpaDocument;
  onReset: () => void;
  onOpenPresets: () => void;
  activeTab: 'form' | 'preview' | 'instruments';
  setActiveTab: (tab: 'form' | 'preview' | 'instruments') => void;
  isValid: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  doc,
  onReset,
  onOpenPresets,
  activeTab,
  setActiveTab,
  isValid,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    // Switch to preview mode temporarily for best print layout if needed
    window.print();
  };

  const handleDownloadWord = () => {
    exportRpaToWord(doc);
  };

  const handleCopyText = () => {
    const textContent = `
RENCANA PENGAWASAN AKADEMIK (RPA)
PENGAWAS PENDIDIKAN AGAMA ISLAM (PAI)

1. IDENTITAS:
- Nama Pengawas: ${doc.identitas.namaPengawas}
- NIP: ${doc.identitas.nipPengawas}
- Unit Kerja: ${doc.identitas.unitKerja}
- Jenjang: ${doc.identitas.jenjangPengawasan}
- Durasi: ${doc.identitas.durasiPertemuan}

2. ASPEK / MASALAH:
${doc.aspekMasalah === 'Lainnya (Isi Sendiri)' ? doc.aspekMasalahCustom : doc.aspekMasalah}

3. TUJUAN:
${doc.tujuan}

4. INDIKATOR:
${doc.indikator}

5. WAKTU:
${doc.waktu}

6. TEMPAT:
${doc.tempat}

7. STRATEGI / METODE:
${doc.strategiMetode.join(', ')}

8. SKENARIO KEGIATAN:
A. Pertemuan Awal:
${doc.skenario.pertemuanAwal}

B. Pertemuan Inti:
${doc.skenario.pertemuanInti}

C. Pertemuan Akhir:
${doc.skenario.pertemuanAkhir}

9. SUMBER DAYA:
${doc.sumberDaya}

10. PENILAIAN & INSTRUMEN:
- Jenis: ${doc.penilaianInstrumen.jenisPenilaian}
- Teknik: ${doc.penilaianInstrumen.teknikPenilaian}
- Nama Instrumen: ${doc.penilaianInstrumen.namaInstrumen}
- Deskripsi: ${doc.penilaianInstrumen.deskripsiInstrumen}

11. RENCANA TINDAK LANJUT:
${doc.rencanaTindakLanjut}

Mengetahui,
Ketua Pokjawas PAI
${doc.identitas.namaKetuaPokjawas}
NIP. ${doc.identitas.nipKetuaPokjawas}

${doc.identitas.kabKota}, ${doc.identitas.tanggalDokumen}
Pengawas PAI
${doc.identitas.namaPengawas}
NIP. ${doc.identitas.nipPengawas}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl sticky top-0 z-40 no-print border-b border-emerald-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3.5 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-emerald-500 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center font-bold text-amber-400 text-xl tracking-wider">
                PAI
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-amber-200 bg-clip-text text-transparent">
                  Generator RPA WasPAI
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Format Resmi Kemenag
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 line-clamp-1">
                Aplikasi Penyusunan Rencana Pengawasan Akademik Pengawas PAI (11 Komponen + Instrumen & Rubrik)
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenPresets}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-lg transition-colors cursor-pointer shadow-sm"
              title="Pilih Skenario Kasus PAI Cepat"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Contoh Kasus PAI</span>
            </button>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg transition-colors cursor-pointer"
              title="Salin Rangkuman Teks RPA"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Tersalin!</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Salin Teks</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95"
              title="Cetak langsung ke Printer atau Simpan PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>

            <button
              onClick={handleDownloadWord}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg transition-all cursor-pointer shadow-md hover:shadow-indigo-500/25 active:scale-95"
              title="Unduh seluruh dokumen RPA lengkap dalam format Microsoft Word (.doc)"
            >
              <Download className="w-4 h-4" />
              <span>Download Word</span>
            </button>

            <button
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Reset ke Data Standar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-emerald-800/60 pt-1 -mb-px">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'form'
                ? 'border-amber-400 text-amber-300 bg-white/5'
                : 'border-transparent text-emerald-200/70 hover:text-emerald-100 hover:border-emerald-600'
            }`}
          >
            <span>1. Formulir Input RPA (11 Bagian)</span>
            {!isValid && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Harap lengkapi isian wajib" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'border-amber-400 text-amber-300 bg-white/5'
                : 'border-transparent text-emerald-200/70 hover:text-emerald-100 hover:border-emerald-600'
            }`}
          >
            <span>2. Tampilan Tabel Spreadsheet RPA</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-emerald-500/30 text-emerald-200 rounded">
              Siap Cetak
            </span>
          </button>

          <button
            onClick={() => setActiveTab('instruments')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'instruments'
                ? 'border-amber-400 text-amber-300 bg-white/5'
                : 'border-transparent text-emerald-200/70 hover:text-emerald-100 hover:border-emerald-600'
            }`}
          >
            <span>3. Instrumen & Rubrik Penilaian</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-blue-500/30 text-blue-200 rounded">
              Lampiran
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
