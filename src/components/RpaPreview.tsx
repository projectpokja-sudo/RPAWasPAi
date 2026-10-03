import React from 'react';
import { RpaDocument } from '../types/rpa';
import { exportRpaToWord } from '../utils/wordExport';
import {
  Printer,
  Download,
  Edit,
  FileSpreadsheet,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { InstrumentTable } from './InstrumentTable';
import { RubricTable } from './RubricTable';

interface RpaPreviewProps {
  doc: RpaDocument;
  onEdit: () => void;
  onUpdateDoc: (updated: RpaDocument) => void;
}

export const RpaPreview: React.FC<RpaPreviewProps> = ({
  doc,
  onEdit,
  onUpdateDoc,
}) => {
  const [showAttachments, setShowAttachments] = React.useState(true);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadWord = () => {
    exportRpaToWord(doc);
  };

  const strategiesText =
    doc.strategiMetode.length > 0
      ? doc.strategiMetode.join(', ') +
        (doc.strategiMetodeCustom ? `, ${doc.strategiMetodeCustom}` : '')
      : 'Supervisi Klinis Bermutu dan Coaching Akademik';

  // Helper to split numbered lines and render as clean paragraphs with text-justify
  const renderFormattedParagraphs = (text: string) => {
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    return lines.map((line, idx) => (
      <p key={idx} className="mb-1.5 last:mb-0 text-justify leading-relaxed">
        {line.trim()}
      </p>
    ));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner Toolbar for Preview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
            <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm sm:text-base">
              Pratinjau Tabel Spreadsheet RPA WasPAI
            </h3>
            <p className="text-xs text-slate-500">
              Format tabel bergaris baku, tulisan rata kanan-kiri (justified) sesuai tata naskah Kemenag.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Formulir</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors cursor-pointer shadow-sm active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>

          <button
            onClick={handleDownloadWord}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl transition-colors cursor-pointer shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Word (.doc)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DOKUMEN CETAK UTAMA (A4 SPREADSHEET FORM) */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-300 p-6 sm:p-10 lg:p-12 max-w-5xl mx-auto print:shadow-none print:border-none print:p-0">
        {/* KOP RESMI SURAT KEPENGAWASAN */}
        <div className="border-b-4 border-double border-slate-900 pb-4 mb-6 text-center">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-slate-900 uppercase">
            Kementerian Agama Republik Indonesia
          </p>
          <p className="text-sm sm:text-base font-extrabold tracking-wide text-slate-950 uppercase mt-0.5">
            Kantor Kementerian Agama {doc.identitas.unitKerja.toUpperCase()}
          </p>
          <p className="text-xs sm:text-sm font-bold tracking-wider text-slate-900 uppercase mt-0.5">
            Kelompok Kerja Pengawas Pendidikan Agama Islam (POKJAWAS PAI)
          </p>
          <p className="text-[10px] sm:text-xs text-slate-600 italic mt-1 font-serif">
            Sekretariat: {doc.identitas.kabKota} | Layanan Supervisi Akademik & Bimbingan Pedagogik Guru PAI
          </p>
        </div>

        {/* JUDUL DOKUMEN */}
        <div className="text-center mb-6">
          <h2 className="text-base sm:text-lg font-black tracking-wide text-slate-900 uppercase underline decoration-2 underline-offset-4">
            Rencana Pengawasan Akademik (RPA)
          </h2>
          <p className="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase mt-1">
            Pengawas Pendidikan Agama Islam (WasPAI)
          </p>
        </div>

        {/* ========================================================= */}
        {/* 11 BAGIAN UTAMA DALAM TABEL SPREADSHEET */}
        {/* ========================================================= */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black text-slate-900 text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-black font-bold text-center">
                <th className="border border-black px-2 py-2.5 w-12 text-center">
                  NO
                </th>
                <th className="border border-black px-3 py-2.5 w-56 text-left">
                  KOMPONEN PENGAWASAN
                </th>
                <th className="border border-black px-4 py-2.5 text-center">
                  DESKRIPSI / RINCIAN OPERASIONAL
                </th>
              </tr>
            </thead>
            <tbody>
              {/* 1. IDENTITAS */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  1
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Identitas Pengawasan
                </td>
                <td className="border border-black px-4 py-3 align-top">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 text-xs sm:text-sm">
                    <div className="flex">
                      <span className="w-40 font-medium text-slate-700">a. Nama Pengawas PAI</span>
                      <span className="mr-2">:</span>
                      <span className="font-bold text-slate-950">{doc.identitas.namaPengawas}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-slate-700">b. Unit Kerja</span>
                      <span className="mr-2">:</span>
                      <span className="text-slate-950">{doc.identitas.unitKerja}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-slate-700">c. Jenjang Pengawasan</span>
                      <span className="mr-2">:</span>
                      <span className="font-semibold text-slate-950">{doc.identitas.jenjangPengawasan}</span>
                    </div>
                    <div className="flex">
                      <span className="w-40 font-medium text-slate-700">d. Durasi Pertemuan</span>
                      <span className="mr-2">:</span>
                      <span className="text-slate-950">{doc.identitas.durasiPertemuan}</span>
                    </div>
                  </div>
                </td>
              </tr>

              {/* 2. ASPEK / MASALAH */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  2
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Aspek / Masalah
                </td>
                <td className="border border-black px-4 py-3 text-justify leading-relaxed align-top">
                  {doc.aspekMasalah === 'Lainnya (Isi Sendiri)'
                    ? doc.aspekMasalahCustom || '-'
                    : doc.aspekMasalah}
                </td>
              </tr>

              {/* 3. TUJUAN */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  3
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Tujuan Pengawasan
                </td>
                <td className="border border-black px-4 py-3 text-justify leading-relaxed align-top">
                  {renderFormattedParagraphs(doc.tujuan)}
                </td>
              </tr>

              {/* 4. INDIKATOR */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  4
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Indikator Keberhasilan
                </td>
                <td className="border border-black px-4 py-3 text-justify leading-relaxed align-top">
                  {renderFormattedParagraphs(doc.indikator)}
                </td>
              </tr>

              {/* 5. WAKTU */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  5
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Waktu Pelaksanaan
                </td>
                <td className="border border-black px-4 py-3 align-top font-medium">
                  {doc.waktu}
                </td>
              </tr>

              {/* 6. TEMPAT */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  6
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Tempat Pelaksanaan
                </td>
                <td className="border border-black px-4 py-3 align-top font-medium">
                  {doc.tempat}
                </td>
              </tr>

              {/* 7. STRATEGI / METODE */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  7
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Strategi / Metode Kerja / Teknik Supervisi
                </td>
                <td className="border border-black px-4 py-3 align-top leading-relaxed text-justify font-medium">
                  {strategiesText}
                </td>
              </tr>

              {/* 8. SKENARIO KEGIATAN */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  8
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Skenario Kegiatan
                </td>
                <td className="border border-black px-4 py-3 align-top space-y-3">
                  <div>
                    <h5 className="font-bold text-slate-900 underline mb-1">
                      A. Pertemuan Awal (Pra-Observasi / Pengkondisian Kemitraan):
                    </h5>
                    <div className="pl-1">
                      {renderFormattedParagraphs(doc.skenario.pertemuanAwal)}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 underline mb-1">
                      B. Pertemuan Inti (Pelaksanaan Supervisi / Pendampingan Klinis):
                    </h5>
                    <div className="pl-1">
                      {renderFormattedParagraphs(doc.skenario.pertemuanInti)}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 underline mb-1">
                      C. Pertemuan Akhir (Pasca-Observasi, Refleksi & Komitmen RTL):
                    </h5>
                    <div className="pl-1">
                      {renderFormattedParagraphs(doc.skenario.pertemuanAkhir)}
                    </div>
                  </div>
                </td>
              </tr>

              {/* 9. SUMBER DAYA */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  9
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Sumber Daya yang Diperlukan
                </td>
                <td className="border border-black px-4 py-3 align-top text-justify leading-relaxed">
                  {renderFormattedParagraphs(doc.sumberDaya)}
                </td>
              </tr>

              {/* 10. PENILAIAN & INSTRUMEN */}
              <tr className="border-b border-black">
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  10
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Penilaian dan Instrumen
                </td>
                <td className="border border-black px-4 py-3 align-top space-y-1.5 text-justify">
                  <p>
                    <span className="font-semibold">Jenis Penilaian:</span>{' '}
                    {doc.penilaianInstrumen.jenisPenilaian}
                  </p>
                  <p>
                    <span className="font-semibold">Teknik Penilaian:</span>{' '}
                    {doc.penilaianInstrumen.teknikPenilaian}
                  </p>
                  <p>
                    <span className="font-semibold">Nama Format Instrumen:</span>{' '}
                    {doc.penilaianInstrumen.namaInstrumen}
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-semibold">Deskripsi Operasional:</span>{' '}
                    {doc.penilaianInstrumen.deskripsiInstrumen}
                  </p>
                  <p className="text-[11px] text-slate-600 italic pt-1">
                    *Rincian butir instrumen pengamatan dan rubrik penilaian produk terlampir pada dokumen ini.
                  </p>
                </td>
              </tr>

              {/* 11. RENCANA TINDAK LANJUT */}
              <tr>
                <td className="border border-black px-2 py-3 text-center font-bold align-top">
                  11
                </td>
                <td className="border border-black px-3 py-3 font-bold align-top bg-slate-50/50">
                  Rencana Tindak Lanjut (RTL)
                </td>
                <td className="border border-black px-4 py-3 align-top text-justify leading-relaxed">
                  {renderFormattedParagraphs(doc.rencanaTindakLanjut)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* LEMBAR PENGESAHAN / TANDA TANGAN */}
        {/* KIRI BAWAH: KETUA POKJAWAS | KANAN BAWAH: PENGAWAS PAI */}
        {/* ========================================================= */}
        <div className="mt-10 pt-4 grid grid-cols-2 gap-8 text-xs sm:text-sm avoid-break">
          {/* Sisi Kiri: Mengetahui, Ketua Pokjawas */}
          <div className="text-left">
            <p className="text-slate-800">Mengetahui,</p>
            <p className="font-bold text-slate-950">Ketua Pokjawas PAI</p>
            <div className="h-20 sm:h-24"></div>
            <p className="font-bold text-slate-950 underline underline-offset-2">
              {doc.identitas.namaKetuaPokjawas}
            </p>
            <p className="text-slate-700">NIP. {doc.identitas.nipKetuaPokjawas}</p>
          </div>

          {/* Sisi Kanan: Pengawas PAI */}
          <div className="text-left pl-8 sm:pl-16">
            <p className="text-slate-800">
              {doc.identitas.kabKota || 'Bandung'}, {doc.identitas.tanggalDokumen || '03 September 2026'}
            </p>
            <p className="font-bold text-slate-950">
              Pengawas Pendidikan Agama Islam,
            </p>
            <div className="h-20 sm:h-24"></div>
            <p className="font-bold text-slate-950 underline underline-offset-2">
              {doc.identitas.namaPengawas}
            </p>
            <p className="text-slate-700">NIP. {doc.identitas.nipPengawas}</p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAMPIRAN 1 & 2 (INSTRUMEN PENILAIAN & RUBRIK PRODUK) */}
        {/* ========================================================= */}
        <div className="mt-12 pt-8 border-t-2 border-slate-300 page-break">
          <div className="flex items-center justify-between mb-4 no-print">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold text-xs rounded">
                Lampiran Lengkap
              </span>
              <h4 className="font-bold text-slate-800 text-sm">
                Lampiran I (Instrumen Penilaian) & Lampiran II (Rubrik Penilaian Produk)
              </h4>
            </div>
            <button
              onClick={() => setShowAttachments(!showAttachments)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 cursor-pointer"
            >
              {showAttachments ? (
                <>
                  <span>Sembunyikan Lampiran</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Tampilkan Lampiran</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {showAttachments && (
            <div className="space-y-10">
              {/* Lampiran I */}
              <div>
                <div className="text-center mb-4">
                  <h3 className="font-bold text-slate-950 text-sm sm:text-base uppercase underline underline-offset-4">
                    LAMPIRAN I: INSTRUMEN PENILAIAN PENGAWASAN AKADEMIK
                  </h3>
                  <p className="text-xs text-slate-600 italic mt-0.5">
                    Format Lembar Catatan Observasi & Keterlaksanaan Kinerja Guru PAI
                  </p>
                </div>
                <InstrumentTable
                  items={doc.instrumenPenilaian}
                  onChange={(items) =>
                    onUpdateDoc({ ...doc, instrumenPenilaian: items })
                  }
                  readOnlyPreview={true}
                />
              </div>

              {/* Lampiran II */}
              <div className="page-break pt-4">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-slate-950 text-sm sm:text-base uppercase underline underline-offset-4">
                    LAMPIRAN II: RUBRIK PENILAIAN PROYEK / PRODUK PERANGKAT PAI
                  </h3>
                  <p className="text-xs text-slate-600 italic mt-0.5">
                    Pedoman Penskoran Kualitas Dokumen Perencanaan & Asesmen Pembelajaran (Skala 1 - 4)
                  </p>
                </div>
                <RubricTable
                  items={doc.rubrikPenilaian}
                  onChange={(items) =>
                    onUpdateDoc({ ...doc, rubrikPenilaian: items })
                  }
                  readOnlyPreview={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
