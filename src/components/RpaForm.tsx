import React from 'react';
import {
  RpaDocument,
  RpaIdentity,
} from '../types/rpa';
import {
  ASPEK_MASALAH_OPTIONS,
  ASPEK_MAPPINGS,
  STRATEGI_METODE_OPTIONS,
  JENJANG_OPTIONS,
  DURASI_OPTIONS,
  generateSkenario,
} from '../data/rpaData';
import {
  User,
  Building,
  Target,
  Clock,
  MapPin,
  ListChecks,
  Briefcase,
  Layers,
  FileCheck,
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Eye,
} from 'lucide-react';

interface RpaFormProps {
  doc: RpaDocument;
  onChange: (updatedDoc: RpaDocument) => void;
  onNavigateToPreview: () => void;
}

export const RpaForm: React.FC<RpaFormProps> = ({
  doc,
  onChange,
  onNavigateToPreview,
}) => {
  const [activeAccordion, setActiveAccordion] = React.useState<number | null>(null);

  // Handle Identity changes
  const handleIdentityChange = (field: keyof RpaIdentity, value: string) => {
    onChange({
      ...doc,
      identitas: {
        ...doc.identitas,
        [field]: value,
      },
    });
  };

  // Handle Aspek / Masalah change
  const handleAspekChange = (selectedAspek: string) => {
    const isCustom = selectedAspek === 'Lainnya (Isi Sendiri)';
    const mapping = ASPEK_MAPPINGS[selectedAspek];

    if (mapping) {
      onChange({
        ...doc,
        aspekMasalah: selectedAspek,
        tujuan: mapping.tujuan,
        indikator: mapping.indikator,
        penilaianInstrumen: mapping.penilaianInstrumen,
        rencanaTindakLanjut: mapping.rencanaTindakLanjut,
        instrumenPenilaian: mapping.instrumen,
        rubrikPenilaian: mapping.rubrik,
      });
    } else {
      onChange({
        ...doc,
        aspekMasalah: selectedAspek,
        aspekMasalahCustom: isCustom ? (doc.aspekMasalahCustom || '') : '',
      });
    }
  };

  // Handle Strategy toggle
  const handleStrategyToggle = (strategy: string) => {
    const exists = doc.strategiMetode.includes(strategy);
    let updatedStrategies: string[];

    if (exists) {
      updatedStrategies = doc.strategiMetode.filter((s) => s !== strategy);
    } else {
      updatedStrategies = [...doc.strategiMetode, strategy];
    }

    // Auto generate scenario & resources based on new strategies
    const { skenario, sumberDaya } = generateSkenario(
      updatedStrategies,
      doc.strategiMetodeCustom
    );

    onChange({
      ...doc,
      strategiMetode: updatedStrategies,
      skenario,
      sumberDaya,
    });
  };

  // Regenerate Skenario & Sumber Daya manually
  const handleRegenerateSkenario = () => {
    const { skenario, sumberDaya } = generateSkenario(
      doc.strategiMetode,
      doc.strategiMetodeCustom
    );
    onChange({
      ...doc,
      skenario,
      sumberDaya,
    });
  };

  // Regenerate Tujuan & Indikator manually from aspect
  const handleRegenerateTujuanIndikator = () => {
    const mapping = ASPEK_MAPPINGS[doc.aspekMasalah];
    if (mapping) {
      onChange({
        ...doc,
        tujuan: mapping.tujuan,
        indikator: mapping.indikator,
      });
    }
  };

  // Regenerate RTL
  const handleRegenerateRtl = () => {
    const mapping = ASPEK_MAPPINGS[doc.aspekMasalah];
    if (mapping) {
      onChange({
        ...doc,
        rencanaTindakLanjut: mapping.rencanaTindakLanjut,
      });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Notice & Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/80 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-md mt-0.5 sm:mt-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Penyusunan Rencana Pengawasan Akademik (RPA) PAI
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Sistem secara otomatis mengisi Tujuan, Indikator, Skenario (Awal, Inti, Akhir), Sumber Daya, Penilaian, dan RTL sesuai Aspek/Masalah & Strategi yang Anda pilih. Anda dapat menyesuaikan teks kapan saja.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToPreview}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
          >
            <Eye className="w-4 h-4" />
            <span>Lihat Tabel Hasil</span>
          </button>
        </div>
      </div>

      {/* FORM SECTIONS */}
      <div className="grid grid-cols-1 gap-6">
        {/* ========================================================= */}
        {/* 1. IDENTITAS */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
          <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                1
              </span>
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                Identitas Pengawasan
                <span className="text-xs font-normal text-rose-500">*Wajib Diisi</span>
              </h3>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Data Resmi Pengawas & Pokjawas PAI
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Nama Pengawas */}
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Nama Pengawas PAI <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={doc.identitas.namaPengawas}
                  onChange={(e) => handleIdentityChange('namaPengawas', e.target.value)}
                  placeholder="Contoh: Drs. H. Ahmad Fauzi, M.Pd.I."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            {/* NIP Pengawas */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                NIP Pengawas PAI <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={doc.identitas.nipPengawas}
                onChange={(e) => handleIdentityChange('nipPengawas', e.target.value)}
                placeholder="Contoh: 197405121999031002"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
              />
            </div>

            {/* Unit Kerja */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Unit Kerja <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={doc.identitas.unitKerja}
                onChange={(e) => handleIdentityChange('unitKerja', e.target.value)}
                placeholder="Contoh: Kantor Kementerian Agama Kota Bandung"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
              />
            </div>

            {/* Jenjang Pengawasan */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Jenjang Pengawasan <span className="text-rose-500">*</span>
              </label>
              <select
                value={doc.identitas.jenjangPengawasan}
                onChange={(e) => handleIdentityChange('jenjangPengawasan', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 font-medium"
              >
                {JENJANG_OPTIONS.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </div>

            {/* Durasi Pertemuan */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Durasi Pertemuan <span className="text-rose-500">*</span>
              </label>
              <select
                value={doc.identitas.durasiPertemuan}
                onChange={(e) => handleIdentityChange('durasiPertemuan', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
              >
                {DURASI_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Kota/Kabupaten Penandatanganan */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Kota / Lokasi Surat
              </label>
              <input
                type="text"
                value={doc.identitas.kabKota}
                onChange={(e) => handleIdentityChange('kabKota', e.target.value)}
                placeholder="Contoh: Bandung"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
              />
            </div>

            {/* Tanggal Dokumen */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Tanggal Dokumen RPA
              </label>
              <input
                type="text"
                value={doc.identitas.tanggalDokumen}
                onChange={(e) => handleIdentityChange('tanggalDokumen', e.target.value)}
                placeholder="Contoh: 03 September 2026"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
              />
            </div>

            {/* Nama Ketua Pokjawas */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Nama Ketua Pokjawas PAI <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={doc.identitas.namaKetuaPokjawas}
                onChange={(e) => handleIdentityChange('namaKetuaPokjawas', e.target.value)}
                placeholder="Contoh: Dr. Hj. Siti Rohmah, M.Ag."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 font-medium"
              />
            </div>

            {/* NIP Ketua Pokjawas */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                NIP Ketua Pokjawas PAI <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={doc.identitas.nipKetuaPokjawas}
                onChange={(e) => handleIdentityChange('nipKetuaPokjawas', e.target.value)}
                placeholder="Contoh: 197108201997032001"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800"
              />
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. ASPEK / MASALAH */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
          <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                2
              </span>
              <h3 className="font-bold text-slate-800 text-base">
                Aspek / Masalah Pengawasan
              </h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
              Pemicu Otomatisasi (Auto-Generate)
            </span>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Pilih Aspek / Masalah Faktual Guru PAI:
              </label>
              <select
                value={doc.aspekMasalah}
                onChange={(e) => handleAspekChange(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-slate-50/60 border-2 border-emerald-500/40 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 transition-all text-slate-900 font-medium leading-relaxed"
              >
                {ASPEK_MASALAH_OPTIONS.map((aspek, idx) => (
                  <option key={idx} value={aspek}>
                    {idx + 1}. {aspek}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Aspect Textarea if 'Lainnya (Isi Sendiri)' selected */}
            {doc.aspekMasalah === 'Lainnya (Isi Sendiri)' && (
              <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-amber-900 uppercase">
                  Tuliskan Aspek / Masalah Spesifik Anda Sendiri:
                </label>
                <textarea
                  rows={3}
                  value={doc.aspekMasalahCustom || ''}
                  onChange={(e) =>
                    onChange({
                      ...doc,
                      aspekMasalahCustom: e.target.value,
                    })
                  }
                  placeholder="Deskripsikan permasalahan akademis guru PAI yang ingin diintervensi..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-slate-800"
                />
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. TUJUAN & 4. INDIKATOR */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 3. TUJUAN */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                    3
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">Tujuan Pengawasan</h3>
                </div>
                <button
                  type="button"
                  onClick={handleRegenerateTujuanIndikator}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  title="Generate ulang tujuan sesuai aspek masalah terpilih"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Otomatis</span>
                </button>
              </div>

              <div className="p-6 space-y-2">
                <p className="text-xs text-slate-500">
                  Generated otomatis berdasarkan Aspek/Masalah (dapat Anda modifikasi):
                </p>
                <textarea
                  rows={6}
                  value={doc.tujuan}
                  onChange={(e) => onChange({ ...doc, tujuan: e.target.value })}
                  placeholder="Rumuskan tujuan pendampingan kepengawasan..."
                  className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 leading-relaxed font-normal"
                />
              </div>
            </div>
            <div className="px-6 py-2.5 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-100">
              *Tujuan harus terukur, realistis, dan berorientasi pada peningkatan kompetensi guru PAI.
            </div>
          </section>

          {/* 4. INDIKATOR */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                    4
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">
                    Indikator Keberhasilan
                  </h3>
                </div>
                <span className="text-xs text-slate-500">Kuantitatif & Kualitatif</span>
              </div>

              <div className="p-6 space-y-2">
                <p className="text-xs text-slate-500">
                  Generated otomatis berdasarkan Tujuan (target persentase dan bukti konkret):
                </p>
                <textarea
                  rows={6}
                  value={doc.indikator}
                  onChange={(e) => onChange({ ...doc, indikator: e.target.value })}
                  placeholder="Rumuskan indikator keberhasilan supervisi..."
                  className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 leading-relaxed font-normal"
                />
              </div>
            </div>
            <div className="px-6 py-2.5 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-100">
              *Gunakan target terukur (contoh: 80% guru mampu merancang minimal 1 modul ajar).
            </div>
          </section>
        </div>

        {/* ========================================================= */}
        {/* 5. WAKTU & 6. TEMPAT */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                5 & 6
              </span>
              <h3 className="font-bold text-slate-800 text-base">
                Waktu & Tempat Pelaksanaan
              </h3>
            </div>
            <span className="text-xs font-semibold text-rose-500">*Diisi Manual oleh Pengawas</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 5. Waktu */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  5. Waktu Pelaksanaan <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">Hari, Tanggal & Pukul</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={doc.waktu}
                  onChange={(e) => onChange({ ...doc, waktu: e.target.value })}
                  placeholder="Contoh: Sabtu, 03 September 2026 Jam 08.00 – 15.00 WIB"
                  className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 font-medium"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 self-center mr-1">Opsi cepat:</span>
                <button
                  type="button"
                  onClick={() => onChange({ ...doc, waktu: 'Rabu, 14 Oktober 2026 Jam 08.00 – 14.30 WIB' })}
                  className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded cursor-pointer"
                >
                  Rabu Pagi
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...doc, waktu: 'Sabtu, 07 November 2026 Jam 08.00 – 15.00 WIB' })}
                  className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded cursor-pointer"
                >
                  Sabtu Penuh
                </button>
              </div>
            </div>

            {/* 6. Tempat */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  6. Tempat Pelaksanaan <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500">Lokasi / Ruang / Sekolah</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={doc.tempat}
                  onChange={(e) => onChange({ ...doc, tempat: e.target.value })}
                  placeholder="Contoh: Aula Kantor Kementerian Agama Kota Bandung"
                  className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 font-medium"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 self-center mr-1">Opsi cepat:</span>
                <button
                  type="button"
                  onClick={() => onChange({ ...doc, tempat: `Aula Kantor Kementerian Agama ${doc.identitas.kabKota || 'Kota Bandung'}` })}
                  className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded cursor-pointer"
                >
                  Aula Kemenag
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...doc, tempat: 'Ruang Guru & Laboratorium Komputer Sekolah Binaan' })}
                  className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 rounded cursor-pointer"
                >
                  Sekolah Binaan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. STRATEGI / METODE KERJA / TEKNIK SUPERVISI */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                7
              </span>
              <h3 className="font-bold text-slate-800 text-base">
                Strategi / Metode Kerja / Teknik Supervisi
              </h3>
            </div>
            <span className="text-xs text-emerald-700 font-semibold">
              Boleh memilih lebih dari satu (Multi-pilihan)
            </span>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-500">
              Pilih satu atau beberapa strategi. Skenario Kegiatan dan Sumber Daya akan disesuaikan otomatis:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {STRATEGI_METODE_OPTIONS.map((strat, idx) => {
                const isSelected = doc.strategiMetode.includes(strat);
                return (
                  <label
                    key={idx}
                    className={`flex items-start p-3.5 rounded-xl border-2 transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleStrategyToggle(strat)}
                      className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <div className="ml-3">
                      <span className={`text-sm font-semibold ${isSelected ? 'text-emerald-950' : 'text-slate-700'}`}>
                        {strat}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Custom Strategy if 'Lainnya (Tulis Sendiri)' selected */}
            {doc.strategiMetode.includes('Lainnya (Tulis Sendiri)') && (
              <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2 mt-3">
                <label className="block text-xs font-bold text-amber-900 uppercase">
                  Tuliskan Metode / Teknik Supervisi Lainnya:
                </label>
                <input
                  type="text"
                  value={doc.strategiMetodeCustom || ''}
                  onChange={(e) => {
                    const custom = e.target.value;
                    const { skenario, sumberDaya } = generateSkenario(
                      doc.strategiMetode,
                      custom
                    );
                    onChange({
                      ...doc,
                      strategiMetodeCustom: custom,
                      skenario,
                      sumberDaya,
                    });
                  }}
                  placeholder="Misal: Lesson Study Kolaboratif, Microteaching Berpasangan..."
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-slate-800"
                />
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. SKENARIO KEGIATAN */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                8
              </span>
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  Skenario Kegiatan (3 Bagian)
                </h3>
                <p className="text-xs text-slate-500">
                  A. Pertemuan Awal &bull; B. Pertemuan Inti &bull; C. Pertemuan Akhir
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRegenerateSkenario}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200 cursor-pointer"
              title="Generate ulang skenario sesuai strategi yang dipilih"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate Sesuai Strategi</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* A. Pertemuan Awal */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] inline-flex items-center justify-center">
                    A
                  </span>
                  Pertemuan Awal (Pra-Observasi / Pengkondisian Kemitraan)
                </span>
                <span className="text-[11px] text-slate-500">Alur TIRTA (Tujuan & Identifikasi)</span>
              </div>
              <textarea
                rows={4}
                value={doc.skenario.pertemuanAwal}
                onChange={(e) =>
                  onChange({
                    ...doc,
                    skenario: { ...doc.skenario, pertemuanAwal: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 leading-relaxed"
              />
            </div>

            {/* B. Pertemuan Inti */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] inline-flex items-center justify-center">
                    B
                  </span>
                  Pertemuan Inti (Pelaksanaan Supervisi / Pendampingan Klinis / Workshop)
                </span>
                <span className="text-[11px] text-slate-500">Alur TIRTA (Rencana Aksi)</span>
              </div>
              <textarea
                rows={5}
                value={doc.skenario.pertemuanInti}
                onChange={(e) =>
                  onChange({
                    ...doc,
                    skenario: { ...doc.skenario, pertemuanInti: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 leading-relaxed"
              />
            </div>

            {/* C. Pertemuan Akhir */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] inline-flex items-center justify-center">
                    C
                  </span>
                  Pertemuan Akhir (Pasca-Observasi, Refleksi Bermakna & RTL)
                </span>
                <span className="text-[11px] text-slate-500">Alur TIRTA (Tanggung Jawab)</span>
              </div>
              <textarea
                rows={4}
                value={doc.skenario.pertemuanAkhir}
                onChange={(e) =>
                  onChange({
                    ...doc,
                    skenario: { ...doc.skenario, pertemuanAkhir: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. SUMBER DAYA & 10. PENILAIAN & INSTRUMEN */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 9. Sumber Daya */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                    9
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">
                    Sumber Daya yang Diperlukan
                  </h3>
                </div>
                <span className="text-xs text-slate-500">Regulasi & Fasilitas</span>
              </div>

              <div className="p-6 space-y-2">
                <p className="text-xs text-slate-500">
                  Regulasi Kemenag, dokumen kurikulum, perangkat teknologi & sarana:
                </p>
                <textarea
                  rows={6}
                  value={doc.sumberDaya}
                  onChange={(e) => onChange({ ...doc, sumberDaya: e.target.value })}
                  placeholder="Daftar regulasi, modul, platform, dan sarana..."
                  className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 leading-relaxed"
                />
              </div>
            </div>
            <div className="px-6 py-2.5 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-100">
              *Mencakup regulasi KMA, buku panduan, LMS, proyektor, lembar telaah, dll.
            </div>
          </section>

          {/* 10. Penilaian & Instrumen */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                    10
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">
                    Penilaian dan Instrumen
                  </h3>
                </div>
                <span className="text-xs text-slate-500">Ringkasan Operasional</span>
              </div>

              <div className="p-6 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase">
                      Jenis Penilaian:
                    </label>
                    <input
                      type="text"
                      value={doc.penilaianInstrumen.jenisPenilaian}
                      onChange={(e) =>
                        onChange({
                          ...doc,
                          penilaianInstrumen: {
                            ...doc.penilaianInstrumen,
                            jenisPenilaian: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase">
                      Teknik Penilaian:
                    </label>
                    <input
                      type="text"
                      value={doc.penilaianInstrumen.teknikPenilaian}
                      onChange={(e) =>
                        onChange({
                          ...doc,
                          penilaianInstrumen: {
                            ...doc.penilaianInstrumen,
                            teknikPenilaian: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase">
                    Nama Format Instrumen:
                  </label>
                  <input
                    type="text"
                    value={doc.penilaianInstrumen.namaInstrumen}
                    onChange={(e) =>
                      onChange({
                        ...doc,
                        penilaianInstrumen: {
                          ...doc.penilaianInstrumen,
                          namaInstrumen: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase">
                    Deskripsi Operasional Instrumen:
                  </label>
                  <textarea
                    rows={2}
                    value={doc.penilaianInstrumen.deskripsiInstrumen}
                    onChange={(e) =>
                      onChange({
                        ...doc,
                        penilaianInstrumen: {
                          ...doc.penilaianInstrumen,
                          deskripsiInstrumen: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 leading-relaxed"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-2.5 bg-slate-50 text-[11px] text-slate-500 border-t border-slate-100">
              *Tabel instrumen rincian dan rubrik produk lengkap dapat dikelola pada Tab 3.
            </div>
          </section>
        </div>

        {/* ========================================================= */}
        {/* 11. RENCANA TINDAK LANJUT */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-sm shadow-sm">
                11
              </span>
              <h3 className="font-bold text-slate-800 text-base">
                Rencana Tindak Lanjut (RTL)
              </h3>
            </div>
            <button
              type="button"
              onClick={handleRegenerateRtl}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sinkronkan RTL</span>
            </button>
          </div>

          <div className="p-6 space-y-2">
            <p className="text-xs text-slate-500">
              Langkah strategis pasca pengawasan (validasi modul, kunjungan kelas, MGMP/KKG, pelaporan Kemenag):
            </p>
            <textarea
              rows={4}
              value={doc.rencanaTindakLanjut}
              onChange={(e) => onChange({ ...doc, rencanaTindakLanjut: e.target.value })}
              placeholder="Rincian tahapan tindak lanjut pengawasan..."
              className="w-full px-4 py-3 text-sm bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-slate-800 leading-relaxed"
            />
          </div>
        </section>

        {/* SUBMIT / PREVIEW BUTTON BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-emerald-950 text-white p-6 rounded-2xl shadow-lg gap-4">
          <div>
            <h4 className="font-bold text-amber-300 text-base">
              Seluruh 11 Komponen RPA Telah Terkonfigurasi
            </h4>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Klik tombol preview untuk melihat format tabel spreadsheet siap cetak & siap unduh Word.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToPreview}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>Tampilkan Tabel Spreadsheet RPA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
