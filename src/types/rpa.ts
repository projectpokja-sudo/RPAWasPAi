export interface RpaIdentity {
  namaPengawas: string;
  nipPengawas: string;
  namaKetuaPokjawas: string;
  nipKetuaPokjawas: string;
  unitKerja: string;
  jenjangPengawasan: string;
  durasiPertemuan: string;
  kabKota: string;
  tanggalDokumen: string;
}

export interface SkenarioKegiatan {
  pertemuanAwal: string;
  pertemuanInti: string;
  pertemuanAkhir: string;
}

export interface InstrumentItem {
  id: number;
  aspekYangDiamati: string;
  indikatorKinerja: string;
  skorMaksimal: number;
  skorPerolehan?: number;
  catatanKualitatif: string;
}

export interface RubrikLevel {
  skor: number;
  predikat: string;
  deskripsi: string;
}

export interface RubrikItem {
  id: number;
  komponenProduk: string;
  kriteria: string;
  level1: string; // Perlu Pendampingan (1)
  level2: string; // Cukup (2)
  level3: string; // Baik (3)
  level4: string; // Sangat Baik (4)
}

export interface RpaDocument {
  // 1. Identitas
  identitas: RpaIdentity;
  // 2. Aspek/Masalah
  aspekMasalah: string;
  aspekMasalahCustom?: string;
  // 3. Tujuan
  tujuan: string;
  // 4. Indikator
  indikator: string;
  // 5. Waktu
  waktu: string;
  // 6. Tempat
  tempat: string;
  // 7. Strategi/Metode
  strategiMetode: string[];
  strategiMetodeCustom?: string;
  // 8. Skenario Kegiatan (A, B, C)
  skenario: SkenarioKegiatan;
  // 9. Sumber Daya yang Diperlukan
  sumberDaya: string;
  // 10. Penilaian dan Instrumen
  penilaianInstrumen: {
    jenisPenilaian: string;
    teknikPenilaian: string;
    namaInstrumen: string;
    deskripsiInstrumen: string;
  };
  // 11. Rencana Tindak Lanjut
  rencanaTindakLanjut: string;

  // Lampiran Tambahan Wajib
  instrumenPenilaian: InstrumentItem[];
  rubrikPenilaian: RubrikItem[];
}
