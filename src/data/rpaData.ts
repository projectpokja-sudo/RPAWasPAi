import { InstrumentItem, RubrikItem, RpaDocument } from '../types/rpa';

export const ASPEK_MASALAH_OPTIONS = [
  'Guru kesulitan merancang Modul Ajar PAI yang memfasilitasi pemahaman mendalam, Rencana Pembelajaran cenderung padat materi (tuntutan administratif) daripada kualitas pemahaman murid;',
  'Guru belum mampu menghubungkan kompetensi PAI dalam CP dengan realitas kehidupan nyata anak, sehingga tujuan pembelajaran masih terkonsentrasi pada pengetahuan dan belum berdampak nyata dalam penghayatan dan pengamalan dalam kehidupan sehari-hari;',
  'Desain aktivitas belajar dalam dokumen perencanaan masih monoton (didominasi ceramah/hafalan jangka pendek), belum memetakan diferensiasi proses/produk;',
  'Proses pembelajaran di kelas masih dominan menggunakan metode ceramah (monoton) dan belum menerapkan model pembelajaran aktif berorientasi Higher Order Thinking Skills (HOTS);',
  'Guru kesulitan merumuskan instrumen asesmen formatif dan sumatif yang sahih, terutama dalam mengukur aspek sikap (afektif) spiritual dan sosial peserta didik secara objektif;',
  'Guru kesulitan membuat tindak lanjut hasil asesmen formatif dan sumatif yang sahih, untuk meningkatkan kualitas pembelajaran;',
  'Guru belum memanfaatkan platform digital (seperti Smart PAI, Canva, atau LMS) untuk mendukung ekosistem pembelajaran rumpun PAI;',
  'Guru belum mampu menghasilkan karya ilmiah (PTK) atau publikasi ilmiah sebagai bukti Pengembangan Kompetensi Berkelanjutan;',
  'Lainnya (Isi Sendiri)',
];

export const STRATEGI_METODE_OPTIONS = [
  'Coaching Akademik',
  'Workshop / Pelatihan Klinis',
  'Mentoring dan Peer Coaching',
  'Supervisi Klinis Bermutu (Pendampingan)',
  'Focus Group Discussion (FGD) Kasus Riil (Problem Solving)',
  'Lokakarya (Bimtek)',
  'Lainnya (Tulis Sendiri)',
];

export const JENJANG_OPTIONS = [
  'SD (Sekolah Dasar)',
  'SMP (Sekolah Menengah Pertama)',
  'SMA (Sekolah Menengah Atas)',
  'SMK (Sekolah Menengah Kejuruan)',
  'SLB (Sekolah Luar Biasa)',
  'PAUD / TK',
];

export const DURASI_OPTIONS = [
  '1 Pertemuan (4 JP / 180 Menit)',
  '1 Pertemuan (6 JP / 270 Menit)',
  '2 Pertemuan Siklus Penuh (8 JP)',
  '1 Hari Penuh (Bimtek/Workshop 8 JP)',
  'Supervisi Berkala Siklus 3 Tahap (Pra, Inti, Pasca)',
];

export interface AspekMapping {
  tujuan: string;
  indikator: string;
  penilaianInstrumen: {
    jenisPenilaian: string;
    teknikPenilaian: string;
    namaInstrumen: string;
    deskripsiInstrumen: string;
  };
  rencanaTindakLanjut: string;
  instrumen: InstrumentItem[];
  rubrik: RubrikItem[];
}

export const ASPEK_MAPPINGS: Record<string, AspekMapping> = {
  [ASPEK_MASALAH_OPTIONS[0]]: {
    tujuan:
      'Meningkatkan kompetensi guru Pendidikan Agama Islam (PAI) dalam merancang Modul Ajar yang memfasilitasi pemahaman mendalam (deep learning) dan bermakna, sehingga rencana pembelajaran tidak sekadar padat materi administratif melainkan berfokus pada esensi pemahaman konsep dan transformasi karakter peserta didik.',
    indikator:
      '1. Minimal 85% Guru PAI binaan mampu menyusun Modul Ajar dengan alur pemahaman mendalam (essential understandings & key concepts);\n2. Guru mampu memangkas redundansi materi administratif dan merumuskan asesmen diagnostik serta pemantik berpikir kritis;\n3. Terwujudnya 1 draf Modul Ajar PAI tervalidasi yang siap diimplementasikan di kelas masing-masing.',
    penilaianInstrumen: {
      jenisPenilaian: 'Penilaian Kinerja / Unjuk Kerja (Performance Test) & Telaah Portofolio Dokumen',
      teknikPenilaian: 'Analisis Dokumen Produk Perencanaan dan Observasi Pendampingan Klinis',
      namaInstrumen: 'Format Lembar Telaah Modul Ajar PAI dan Catatan Refleksi Supervisi Akademik',
      deskripsiInstrumen: 'Instrumen rubrik skala 1-4 untuk membedah kedalaman pemahaman, integrasi CP, alur aktivitas bermakna, dan kejelasan asesmen formatif.',
    },
    rencanaTindakLanjut:
      '1. Melakukan validasi final dan pengesahan Modul Ajar hasil revisi dalam rentang waktu 7 hari kerja;\n2. Menjadwalkan observasi kelas (supervisi klinis) untuk melihat implementasi nyata modul di ruang pembelajaran;\n3. Membagikan modul terbaik sebagai "Best Practice" dalam forum KKG/MGMP PAI binaan tingkat Gugus/Wilayah;\n4. Memfasilitasi pendampingan asinkron melalui grup koordinasi kepengawasan.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Perumusan Tujuan Pembelajaran', indikatorKinerja: 'Memuat kompetensi esensial dan pemahaman mendalam berakar CP PAI', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Pemantik & Pemahaman Bermakna', indikatorKinerja: 'Terdapat pertanyaan pemantik kontekstual yang merangsang daya nalar siswa', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Struktur Aktivitas Belajar', indikatorKinerja: 'Aktivitas tidak sekadar transfer hafalan, melainkan eksplorasi, refleksi, dan aksi nyata', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 4, aspekYangDiamati: 'Rencana Asesmen Formatif', indikatorKinerja: 'Memuat instrumen cek pemahaman di awal dan sepanjang proses pembelajaran', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 5, aspekYangDiamati: 'Efisiensi Administrasi Modul', indikatorKinerja: 'Modul praktis, ringkas, operasional, dan mudah dieksekusi guru tanpa beban administratif berlebih', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Kualitas Pemahaman Bermakna (Deep Learning)',
        kriteria: 'Kedalaman konsep yang diajarkan pada materi rumpun PAI (Aqidah/Akhlak/Fiqih/Al-Qur\'an Hadits/SKI)',
        level1: 'Masih berupa daftar materi panjang/padat, hanya hafalan tekstual tanpa pertanyaan pemantik.',
        level2: 'Terdapat tujuan pembelajaran namun belum menonjolkan esensi pemahaman mendalam bagi kehidupan peserta didik.',
        level3: 'Telah merumuskan konsep esensial dan pertanyaan pemantik yang merangsang daya nalar serta kontekstual.',
        level4: 'Sangat komprehensif, menghubungkan pemahaman mendalam dengan integrasi lintas disiplin dan aksi nyata karakter Islami.',
      },
      {
        id: 2,
        komponenProduk: 'Keterpaduan Desain Asesmen dengan Aktivitas',
        kriteria: 'Kesesuaian antara asesmen awal, formatif harian, dan evaluasi hasil belajar',
        level1: 'Hanya ada asesmen sumatif tertulis berupa pilihan ganda di akhir bab.',
        level2: 'Ada asesmen formatif namun bersifat sporadis dan tidak terhubung langsung dengan proses perbaikan belajar.',
        level3: 'Asesmen formatif terintegrasi baik dalam alur aktivitas dan memuat rubrik kriteria ketercapaian tujuan.',
        level4: 'Asesmen variatif, mencakup asesmen diagnostik, formatif berkala, umpan balik kualitatif, dan self-reflection murid.',
      },
    ],
  },
  [ASPEK_MASALAH_OPTIONS[1]]: {
    tujuan:
      'Meningkatkan kemampuan guru PAI dalam mengontekstualisasikan Capaian Pembelajaran (CP) dengan realitas kehidupan nyata peserta didik, sehingga pembelajaran bertransformasi dari sekadar kognitif hafalan menuju penghayatan nilai dan pengamalan nyata akhlak mulia dalam keseharian.',
    indikator:
      '1. 90% Guru mampu memetakan elemen CP PAI dengan fenomena riil, isu sosial, dan pengalaman otentik peserta didik;\n2. Guru mampu merancang skenario pembelajaran berbasis proyek/studi kasus kontekstual yang menguji pengamalan nilai keagamaan;\n3. Terbentuknya rubrik observasi perilaku harian pengamalan ibadah dan akhlakul karimah.',
    penilaianInstrumen: {
      jenisPenilaian: 'Penilaian Kinerja / Portofolio Desain Kontekstual & Refleksi Mandiri',
      teknikPenilaian: 'Peer Assessment dan Telaah Rubrik Keterkaitan CP-Kehidupan Nyata',
      namaInstrumen: 'Format Lembar Observasi Keterhubungan Kontekstual dan Lembar Verifikasi CP-Aplikasi',
      deskripsiInstrumen: 'Instrumen evaluasi untuk menakar relevansi skenario pembelajaran dengan tantangan moral dan sosial siswa saat ini.',
    },
    rencanaTindakLanjut:
      '1. Pendampingan implementasi proyek penguatan profil pelajar rahmatan lil \'alamin (PPRA) berbasis isu lingkungan/sosial sekolah;\n2. Pengawasan berkala terhadap jurnal refleksi pembiasaan ibadah dan adab siswa;\n3. Pembahasan tematik dalam rapat kerja Pokjawas PAI untuk diseminasi ke sekolah lain.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Relevansi Isu Kontekstual', indikatorKinerja: 'Materi PAI dikaitkan dengan problem faktual siswa (gadget, bullying, kejujuran, toleransi)', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Integrasi Nilai Rahmatan lil \'Alamin', indikatorKinerja: 'Memuat penanaman moderasi beragama dan kasih sayang dalam pergaulan multikultural', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Penugasan Berorientasi Aksi Nyata', indikatorKinerja: 'Bentuk penugasan menuntut tindakan konkret bukan semata lembar kerja kertas', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 4, aspekYangDiamati: 'Alat Ukur Penghayatan Sikap', indikatorKinerja: 'Tersedia jurnal observasi sikap yang objektif melibatkan orang tua atau pembiasaan diri', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Kontekstualisasi Elemen CP PAI',
        kriteria: 'Derajat keterhubungan antara rumusan CP dengan permasalahan konkret kehidupan murid',
        level1: 'Pembahasan materi murni teoritis, tidak menyentuh realitas keseharian anak.',
        level2: 'Menyebutkan contoh kehidupan nyata namun masih bersifat klise dan belum menantang anak bernalar kritis.',
        level3: 'Mampu mengangkat studi kasus/dilema moral yang dihadapi siswa dan membedahnya dengan dalil naqli.',
        level4: 'Sangat kontekstual, melahirkan aksi kepedulian nyata, kampanye kebaikan, atau proyek solusi sosial berbasis PAI.',
      },
    ],
  },
  [ASPEK_MASALAH_OPTIONS[2]]: {
    tujuan:
      'Meningkatkan keterampilan guru PAI dalam mendesain skenario pembelajaran berdiferensiasi (konten, proses, dan produk) yang variatif, sehingga mengakomodasi keberagaman profil belajar, kesiapan belajar, dan minat peserta didik tanpa monoton ceramah.',
    indikator:
      '1. 80% Guru mampu memetakan kebutuhan belajar peserta didik berdasarkan hasil asesmen awal;\n2. Guru mampu merancang minimal 1 skenario pembelajaran berdiferensiasi (proses atau produk) pada materi rumpun PAI;\n3. Hilangnya dominasi metode ceramah pasif dan meningkatnya keterlibatan aktif peserta didik di kelas.',
    penilaianInstrumen: {
      jenisPenilaian: 'Penilaian Kinerja (Performance Test) Desain Diferensiasi & Simulasi Mengajar',
      teknikPenilaian: 'Observasi Simulasi Microteaching dan Validasi Modul Ajar Berdiferensiasi',
      namaInstrumen: 'Format Lembar Telaah Pembelajaran Berdiferensiasi dan Rubrik Pemetaan Siswa',
      deskripsiInstrumen: 'Instrumen pengukuran keberhasilan akomodasi gaya belajar visual, auditori, kinestetik, dan kesiapan pemahaman materi Al-Qur\'an/Fiqih.',
    },
    rencanaTindakLanjut:
      '1. Pendampingan klinis saat guru mempraktikkan diferensiasi proses kelompok di ruang kelas sesungguhnya;\n2. Evaluasi bertahap pada forum MGMP/KKG PAI setiap dua pekan sekali;\n3. Menyusun bank modul ajar berdiferensiasi PAI per jenjang untuk referensi pengawas se-kabupaten/kota.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Pemetaan Kesiapan Belajar', indikatorKinerja: 'Tersedia data awal kemampuan membaca Al-Qur\'an/pemahaman hukum Islam tiap siswa', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Diferensiasi Konten', indikatorKinerja: 'Menyediakan beragam bahan ajar (teks, audio tilawah, infografis, video interaktif)', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Diferensiasi Proses', indikatorKinerja: 'Mengatur aktivitas belajar mandiri, berpasangan, atau scaffolding terbimbing', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 4, aspekYangDiamati: 'Diferensiasi Produk', indikatorKinerja: 'Siswa diberi pilihan unjuk karya (rekaman bacaan, mindmap, poster, presentasi dakwah)', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Strategi Pembelajaran Berdiferensiasi',
        kriteria: 'Ketepatan pemilihan diferensiasi konten, proses, dan produk sesuai keragaman murid',
        level1: 'Semua siswa diperlakukan identik dengan satu metode tunggal (ceramah seragam).',
        level2: 'Sudah ada variasi media namun aktivitas dan tagihan tugas masih seragam tanpa opsi.',
        level3: 'Mengakomodasi minimal 2 jenis diferensiasi (misal konten & produk) disertai scaffolding jelas.',
        level4: 'Diferensiasi terpadu (konten, proses, produk) berbasis asesmen diagnostik yang akurat dan berkeadilan.',
      },
    ],
  },
  [ASPEK_MASALAH_OPTIONS[3]]: {
    tujuan:
      'Meningkatkan kompetensi pedagogik guru PAI dalam menerapkan model-model pembelajaran aktif inovatif (seperti Problem Based Learning, Project Based Learning, Inquiry, Discovery, dan Jigsaw) yang menumbuhkan kemampuan berpikir tingkat tinggi (HOTS) serta melatih daya nalar kritis siswa.',
    indikator:
      '1. Minimal 85% Guru PAI mampu memilih dan menyusun sintaks model pembelajaran aktif berorientasi HOTS;\n2. Guru mampu memformulasi pertanyaan pemantik level analisis (C4), evaluasi (C5), dan kreasi (C6) pada materi PAI;\n3. Siswa aktif berdiskusi, berargumentasi secara santun dengan rujukan dalil, dan menghasilkan solusi kreatif.',
    penilaianInstrumen: {
      jenisPenilaian: 'Observasi Kinerja Praktik Pembelajaran (Microteaching/Supervisi Kelas) & Lembar Refleksi',
      teknikPenilaian: 'Observasi Langsung Menggunakan Skala Penilaian Kinerja Guru',
      namaInstrumen: 'Format Lembar Catatan Observasi Pembelajaran Aktif Berorientasi HOTS',
      deskripsiInstrumen: 'Instrumen observasi keterlaksanaan sintaks model pembelajaran aktif dan keterlibatan aktif siswa.',
    },
    rencanaTindakLanjut:
      '1. Pelaksanaan supervisi kunjungan kelas terjadwal untuk mengamati interaksi HOTS antara guru dan murid;\n2. Sesi coaching pasca observasi dengan pendekatan TIRTA untuk menggali kesadaran reflektif guru;\n3. Pembentukan kelompok kerja Lesson Study PAI di tingkat gugus binaan.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Kesesuaian Sintaks Model', indikatorKinerja: 'Langkah pembelajaran runtut mengikuti model aktif (PBL/PjBL/Inquiry)', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Stimulasi Pertanyaan HOTS', indikatorKinerja: 'Guru mengajukan pertanyaan memancing analisis, perbandingan, dan pemecahan masalah keagamaan', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Aktivitas Kolaboratif Murid', indikatorKinerja: 'Peserta didik bekerja dalam tim, bertukar pandangan, dan saling mengklarifikasi pemikiran', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 4, aspekYangDiamati: 'Penguatan Konsep & Makna', indikatorKinerja: 'Guru membimbing penarikan kesimpulan dalil dan hikmah syariat secara mendalam', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Penerapan Model Pembelajaran Aktif HOTS',
        kriteria: 'Keterlibatan kognitif tingkat tinggi siswa selama proses pembelajaran PAI',
        level1: 'Hanya meminta siswa menghafal definisi/nama tokoh/tahun tanpa telaah kritis.',
        level2: 'Mulai ada tanya jawab namun pertanyaan masih terbatas ingatan/pemahaman rendah (C1-C2).',
        level3: 'Penerapan sintaks aktif memicu siswa menganalisis perbedaan pendapat fiqih atau hikmah akhlak (C4-C5).',
        level4: 'Siswa memproduksi ide solusi orisinal atas problem etika/sosial kontemporer berlandaskan Al-Qur\'an dan Hadits (C6).',
      },
    ],
  },
  [ASPEK_MASALAH_OPTIONS[4]]: {
    tujuan:
      'Meningkatkan keterampilan guru PAI dalam merumuskan dan mengembangkan instrumen asesmen formatif dan sumatif yang sahih (valid) dan andal, khususnya teknik asesmen autentik untuk mengukur sikap spiritual (iman, taqwa, syukur, tawakkal) dan sikap sosial (toleransi, amanah, peduli) secara objektif tanpa rekayasa nilai.',
    indikator:
      '1. 85% Guru PAI mampu menyusun kisi-kisi dan instrumen asesmen sikap berupa jurnal observasi, penilaian diri (self-assessment), dan penilaian antar-teman (peer-assessment);\n2. Guru mampu menyusun rubrik kriteria ketercapaian tujuan pembelajaran (KKTP) yang terukur dan deskriptif;\n3. Penilaian sikap terhindar dari subyektivitas semata dan terdokumentasi rapi dalam portofolio perkembangan karakter anak.',
    penilaianInstrumen: {
      jenisPenilaian: 'Penilaian Produk Instrumen & Telaah Validitas Kisi-Kisi Asesmen',
      teknikPenilaian: 'Bedah Dokumen Instrumen Penilaian dan Uji Coba Keterbacaan Rubrik',
      namaInstrumen: 'Format Lembar Validasi Instrumen Asesmen PAI dan Rubrik Penilaian Sikap Spiritual/Sosial',
      deskripsiInstrumen: 'Instrumen telaah kelayakan kisi-kisi, indikator sikap, kejelasan butir instrumen, dan kemudahan administrasi.',
    },
    rencanaTindakLanjut:
      '1. Uji coba instrumen asesmen sikap pada 1 rombel percontohan selama 1 bulan berjalan;\n2. Pendampingan rekapitulasi data asesmen ke dalam laporan capaian belajar (Rapor Kurikulum Merdeka);\n3. Diskusi berkala pada forum KKG/MGMP untuk kalibrasi persepsi rubrik sikap.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Kesesuaian dengan CP dan TP', indikatorKinerja: 'Instrumen mengukur langsung dimensi kompetensi sikap spiritual dan sosial yang ditargetkan', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Kejelasan Indikator Sikap', indikatorKinerja: 'Indikator perilaku dapat diamati (observable) dan tidak menimbulkan tafsir ganda', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Kelengkapan Format Observasi', indikatorKinerja: 'Tersedia jurnal insidental, format self-assessment, dan lembar wawancara konfirmasi', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 4, aspekYangDiamati: 'Rubrik Deskriptif Objektif', indikatorKinerja: 'Memiliki tingkatan kriteria jelas (skor 1-4 atau belum muncul, mulai berkembang, dsb)', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Kualitas Instrumen Asesmen Sikap',
        kriteria: 'Objektivitas, keotentikan, dan validitas alat ukur sikap spiritual dan sosial',
        level1: 'Nilai sikap hanya asumsi perkiraan guru di akhir semester tanpa catatan instrumen riil.',
        level2: 'Ada lembar observasi namun deskriptornya kabur (hanya tertulis: baik, cukup, kurang tanpa kriteria).',
        level3: 'Terdapat kisi-kisi, jurnal harian, dan instrumen penilaian diri dengan indikator perilaku terukur.',
        level4: 'Sangat komprehensif, multi-sumber (observasi, refleksi diri, teman sejawat, catatan orang tua) dan terdokumentasi digital.',
      },
    ],
  },
  [ASPEK_MASALAH_OPTIONS[5]]: {
    tujuan:
      'Meningkatkan kompetensi guru PAI dalam menganalisis data hasil asesmen formatif dan sumatif serta merancang program tindak lanjut yang berdampak nyata, baik berupa intervensi remediasi terfokus maupun program pengayaan yang bermakna.',
    indikator:
      '1. 90% Guru PAI mampu melakukan analisis diagnostik kesenjangan capaian kompetensi peserta didik;\n2. Guru mampu merancang program remidial berdiferensiasi (bukan sekadar tes ulang soal yang sama);\n3. Terlaksananya program pengayaan bermutu bagi peserta didik yang telah mencapai kemahiran lebih awal.',
    penilaianInstrumen: {
      jenisPenilaian: 'Penilaian Kinerja / Telaah Portofolio Dokumen Tindak Lanjut Asesmen',
      teknikPenilaian: 'Analisis Bukti Hasil Belajar Siswa dan Rencana Program Remedial/Pengayaan',
      namaInstrumen: 'Format Lembar Evaluasi Tindak Lanjut Asesmen dan Lembar Refleksi Guru',
      deskripsiInstrumen: 'Instrumen rubrik untuk memeriksa keselarasan antara diagnosis kelemahan belajar dengan jenis perlakuan yang diberikan.',
    },
    rencanaTindakLanjut:
      '1. Verifikasi efektivitas program remedial pada siklus pengawasan berikutnya;\n2. Pemberian apresiasi kepada guru yang berhasil menuntaskan ketertinggalan belajar peserta didik;\n3. Pendokumentasian laporan kemajuan belajar murid sebagai bahan evaluasi mutu satuan pendidikan.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Ketajaman Analisis Hasil Tes', indikatorKinerja: 'Guru mampu memetakan materi/indikator mana yang paling banyak belum dikuasai siswa', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Diferensiasi Tindak Lanjut', indikatorKinerja: 'Bentuk remedial disesuaikan dengan akar masalah (tutor sebaya, bimbingan khusus, media baru)', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Rencana Pengayaan Bermakna', indikatorKinerja: 'Siswa cepat belajar diberikan tantangan pendalaman proyek bukan tugas mekanis tambahan', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 4, aspekYangDiamati: 'Pencatatan Rekam Progres', indikatorKinerja: 'Terdapat grafik/tabel pertumbuhan nilai dan kompetensi siswa sebelum dan sesudah intervensi', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Desain Tindak Lanjut Remedial & Pengayaan',
        kriteria: 'Kesesuaian treatment pembelajaran dengan akar kendala belajar murid',
        level1: 'Remedial hanya berupa pemberian ulang soal ujian tanpa ada bimbingan ulang.',
        level2: 'Ada penjelasan ulang materi namun masih klasikal dan belum menyentuh kesulitan spesifik tiap anak.',
        level3: 'Remedial terfokus pada indikator yang belum tuntas dengan metode bimbingan bervariasi.',
        level4: 'Sangat terstruktur, ada kontrak belajar remedial, keterlibatan tutor sebaya, dan pengayaan inovatif berbasis minat.',
      },
    ],
  },
  [ASPEK_MASALAH_OPTIONS[6]]: {
    tujuan:
      'Meningkatkan literasi dan keterampilan teknologi guru PAI dalam mendayagunakan platform digital (seperti Smart PAI Kemenag, Canva for Education, Google Workspace/LMS, Quizizz, dan Media Interaktif Agama Islam) untuk mewujudkan ekosistem pembelajaran yang interaktif, menarik, dan adaptif zaman.',
    indikator:
      '1. Minimal 85% Guru PAI aktif mengoperasikan aplikasi Smart PAI Kemenag dan mengunggah administrasi pembelajaran;\n2. Guru mampu memproduksi minimal 2 media ajar digital interaktif (infografis/slide Canva/kuis interaktif);\n3. Meningkatnya antusiasme dan partisipasi belajar peserta didik melalui pemanfaatan media digital rumpun PAI.',
    penilaianInstrumen: {
      jenisPenilaian: 'Penilaian Kinerja / Praktik Langsung (Hands-on Digital Demonstration)',
      teknikPenilaian: 'Uji Coba Pengoperasian Platform dan Review Produk Konten Digital',
      namaInstrumen: 'Format Lembar Validasi Media Digital PAI dan Ceklis Integrasi Platform Smart PAI',
      deskripsiInstrumen: 'Instrumen penilaian kemudahan akses, kesesuaian konten syariah, estetika visual, dan interaktivitas media.',
    },
    rencanaTindakLanjut:
      '1. Pelatihan lanjutan pembuatan konten video microlearning PAI bersama tim IT Pokjawas;\n2. Pembentukan pojok "Digital PAI Guru Penggerak" di MGMP/KKG untuk saling berbagi template Canva;\n3. Monitoring keaktifan guru pada dashboard aplikasi Smart PAI Kemenag secara berkala.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Pemanfaatan Akun Smart PAI', indikatorKinerja: 'Profil guru terverifikasi aktif dan telah mengunggah perangkat ajar pada platform resmi', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Kreativitas Desain Media (Canva)', indikatorKinerja: 'Media menarik, font jelas, tata letak proporsional, serta memuat dalil Al-Qur\'an yang sahih', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Interaktivitas Pembelajaran Digital', indikatorKinerja: 'Memanfaatkan kuis digital interaktif (Wordwall/Quizizz) untuk asesmen formatif menyenangkan', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 4, aspekYangDiamati: 'Aksesibilitas bagi Murid', indikatorKinerja: 'Media mudah dibuka oleh siswa di berbagai perangkat tanpa membebani kuota berlebihan', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Integrasi Platform Digital dalam Pembelajaran PAI',
        kriteria: 'Tingkat kemahiran guru dalam memanfaatkan teknologi digital edukasi Islam',
        level1: 'Guru sama sekali belum memanfaatkan platform digital, masih mengandalkan buku cetak usang.',
        level2: 'Menggunakan proyektor namun sebatas menampilkan teks buku tanpa desain visual yang ramah anak.',
        level3: 'Mampu membuat slide presentasi Canva menarik dan memanfaatkan Smart PAI secara fungsional.',
        level4: 'Menciptakan ekosistem blended learning terpadu, LMS terkelola rapi, dan memproduksi media multimedia interaktif orisinal.',
      },
    ],
  },
  [ASPEK_MASALAH_OPTIONS[7]]: {
    tujuan:
      'Meningkatkan kompetensi profesional guru PAI dalam merancang, melaksanakan, dan menyusun laporan Penelitian Tindakan Kelas (PTK) atau publikasi karya ilmiah populer di bidang pendidikan Islam sebagai wujud Pengembangan Keprofesian Berkelanjutan (PKB) yang berdampak pada kenaikan pangkat dan mutu sekolah.',
    indikator:
      '1. Minimal 75% Guru PAI binaan mampu menyusun proposal PTK berbasis problem riil di kelas PAI;\n2. Guru mampu mengumpulkan data siklus dan menyusun draf laporan hasil penelitian tindakan kelas;\n3. Terbitnya minimal 1 artikel ilmiah/karya tulis populer di jurnal terakreditasi atau media edukasi.',
    penilaianInstrumen: {
      jenisPenilaian: 'Penilaian Produk Karya Tulis Ilmiah (KTI) & Presentasi Seminar Proposal',
      teknikPenilaian: 'Review Naskah Ilmiah dan Pembimbingan Klinis Struktur Sistematika PTK',
      namaInstrumen: 'Format Lembar Telaah Proposal dan Laporan PTK Guru PAI',
      deskripsiInstrumen: 'Instrumen rubrik ilmiah meliputi orisinalitas judul, ketajaman rumusan masalah, metodologi siklus, dan etika penulisan.',
    },
    rencanaTindakLanjut:
      '1. Pendampingan penulisan intensif per bab melalui klinik konsultasi ilmiah Pokjawas PAI;\n2. Penyelenggaraan seminar hasil PTK kolaboratif di tingkat kabupaten/kota;\n3. Pengiriman artikel terpilih ke jurnal ilmiah Kementerian Agama atau asosiasi profesi.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Urgensi & Orisinalitas Masalah', indikatorKinerja: 'Masalah bersumber dari kendala nyata belajar PAI di kelas, bukan hasil plagiasi', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Ketepatan Metodologi Siklus', indikatorKinerja: 'Terdapat alur perencanaan, tindakan, observasi, dan refleksi yang logis dan runtut', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Validitas Alat Pengumpul Data', indikatorKinerja: 'Menggunakan instrumen tes, lembar observasi, dan wawancara yang teruji validitasnya', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 4, aspekYangDiamati: 'Sistematika & Tata Bahasa Ilmiah', indikatorKinerja: 'Mengikuti kaidah PUEBI, sitasi ilmiah mutakhir, dan kaidah penulisan transliterasi Arab-Latin', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Kualitas Proposal / Laporan PTK Guru PAI',
        kriteria: 'Keilmiahan metodologi, kedalaman analisis data siklus, dan solusi tindakan perbaikan',
        level1: 'Draf tulisan belum berstruktur ilmiah, bersifat copy-paste, dan tidak memiliki data empiris.',
        level2: 'Struktur ada namun metodologi siklus tidak jelas serta indikator keberhasilan tindakan belum terukur.',
        level3: 'Metodologi memenuhi standar PTK, siklus 1 dan 2 berjalan runtut dengan data observasi lengkap.',
        level4: 'Sangat bermutu, analisis komprehensif didukung literatur mutakhir, serta siap dipublikasikan di jurnal ber-ISSN.',
      },
    ],
  },
  [ASPEK_MASALAH_OPTIONS[8]]: {
    tujuan:
      'Meningkatkan kompetensi pedagogik dan profesional guru PAI dalam mengatasi permasalahan spesifik pembelajaran, sehingga mampu menyusun perencanaan inovatif dan mengimplementasikannya secara efektif di satuan pendidikan.',
    indikator:
      '1. Minimal 85% Guru mampu mengidentifikasi akar permasalahan pembelajaran secara mandiri;\n2. Terwujudnya 1 dokumen perbaikan rencana pembelajaran yang terverifikasi dan kontekstual;\n3. Terjadinya peningkatan kualitas proses belajar siswa sesuai target yang ditetapkan.',
    penilaianInstrumen: {
      jenisPenilaian: 'Penilaian Kinerja / Portofolio Perencanaan dan Observasi Pendampingan',
      teknikPenilaian: 'Review Dokumen dan Wawancara Refleksi Terstruktur',
      namaInstrumen: 'Format Lembar Catatan Observasi dan Lembar Penilaian Kinerja Guru',
      deskripsiInstrumen: 'Instrumen pengukuran ketercapaian tujuan pengawasan akademik sesuai aspek khusus yang diajukan.',
    },
    rencanaTindakLanjut:
      '1. Monitoring implementasi rencana perbaikan pada siklus supervisi selanjutnya;\n2. Memberikan bimbingan teknis lanjutan secara berkala di komunitas MGMP/KKG;\n3. Melaporkan hasil pembinaan kepada Kepala Seksi PAIS / PAKIS Kantor Kementerian Agama.',
    instrumen: [
      { id: 1, aspekYangDiamati: 'Kesesuaian Solusi Tindakan', indikatorKinerja: 'Solusi yang dirancang relevan dan menjawab langsung pokok permasalahan yang diangkat', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 2, aspekYangDiamati: 'Keterlaksanaan Skenario Perbaikan', indikatorKinerja: 'Langkah kegiatan dijalankan secara runtut dan tuntas sesuai jadwal komitmen', skorMaksimal: 4, catatanKualitatif: '' },
      { id: 3, aspekYangDiamati: 'Evaluasi Dampak Hasil', indikatorKinerja: 'Terdapat data peningkatan kompetensi murid atau kualitas administrasi guru', skorMaksimal: 4, catatanKualitatif: '' },
    ],
    rubrik: [
      {
        id: 1,
        komponenProduk: 'Kualitas Dokumen Hasil Pendampingan Khusus',
        kriteria: 'Tingkat ketercapaian target perbaikan dan kepatuhan terhadap regulasi',
        level1: 'Dokumen belum menunjukkan perubahan signifikan dari kondisi awal.',
        level2: 'Ada perbaikan sebagian kecil aspek namun masih membutuhkan banyak revisi mendasar.',
        level3: 'Dokumen memenuhi standar kompetensi yang dipersyaratkan dan siap diterapkan.',
        level4: 'Dokumen inovatif, memiliki nilai kebaruan tinggi, dan dapat menjadi rujukan guru lain.',
      },
    ],
  },
};

/**
 * Generate Skenario Kegiatan based on selected strategies
 */
export function generateSkenario(strategies: string[], customStrategy?: string): { skenario: { pertemuanAwal: string; pertemuanInti: string; pertemuanAkhir: string }; sumberDaya: string } {
  const strList = strategies.slice();
  if (customStrategy && customStrategy.trim() !== '') {
    strList.push(customStrategy.trim());
  }

  const hasCoaching = strList.some(s => s.toLowerCase().includes('coaching'));
  const hasWorkshop = strList.some(s => s.toLowerCase().includes('workshop') || s.toLowerCase().includes('lokakarya') || s.toLowerCase().includes('bimtek'));
  const hasKlinis = strList.some(s => s.toLowerCase().includes('supervisi klinis') || s.toLowerCase().includes('pendampingan'));
  const hasFgd = strList.some(s => s.toLowerCase().includes('fgd') || s.toLowerCase().includes('focus group'));
  const hasMentoring = strList.some(s => s.toLowerCase().includes('mentoring') || s.toLowerCase().includes('peer'));

  const stratLabel = strList.length > 0 ? strList.join(', ') : 'Supervisi Klinis Bermutu dan Coaching Akademik';

  // Pertemuan Awal
  let awal = `1. Pengawas PAI membuka pertemuan dengan salam ta'dzim, membina hubungan kemitraan (rapport), dan menyelaraskan frekuensi tujuan supervisi yang bernuansa pemberdayaan dan kolegial;\n`;
  awal += `2. Melakukan apersepsi dan identifikasi awal (kesepakatan pra-observasi): mengkaji target kompetensi, tantangan faktual yang dihadapi guru PAI di madrasah/sekolah binaan, serta menyepakati fokus area pendampingan;\n`;
  if (hasCoaching) {
    awal += `3. Menerapkan alur TIRTA pada sesi awal: menetapkan Tujuan pertemuan, Mengidentifikasi kondisi riil guru PAI secara terbuka, serta membangun suasana kemitraan yang memberdayakan tanpa kesan menghakimi;\n`;
  }
  if (hasFgd) {
    awal += `4. Menyajikan stimulus studi kasus faktual terkait isu pembelajaran PAI untuk memicu pemetaan persepsi bersama antar guru;\n`;
  }
  awal += `5. Menjelaskan rubrik penilaian, instrumen observasi, dan jadwal alur pelaksanaan kegiatan secara transparan kepada seluruh peserta.`;

  // Pertemuan Inti
  let inti = '';
  if (hasWorkshop) {
    inti += `1. Pengawas memaparkan materi kunci, regulasi Kurikulum Merdeka PAI (Keputusan Menag / BSKAP), dan bedah contoh best practice modul ajar / asesmen yang ideal;\n`;
    inti += `2. Kerja kelompok terarah (Hands-on Lab): Guru PAI secara mandiri dan berkolaborasi mempraktikkan penyusunan perangkat ajar, instrumen asesmen sikap, atau pemanfaatan platform digital secara langsung;\n`;
    inti += `3. Pengawas berkeliling memberikan bimbingan teknis personal (scaffolding) dan menjawab kendala teknis guru per butir komponen;\n`;
    inti += `4. Sesi presentasi perwakilan kelompok (Gallery Walk / PechaKucha), disusul tanggapan sejawat dan penguatan komprehensif dari Pengawas PAI.`;
  } else if (hasKlinis) {
    inti += `1. Pengawas bersama guru memasuki ruang kelas / laboratorium untuk melakukan observasi langsung proses pembelajaran PAI berbasis instrumen telaah;\n`;
    inti += `2. Pengawas mengamati interaksi guru-murid, penguasaan materi PAI, penanaman adab dan nilai moderasi beragama, serta penerapan teknik asesmen formatif;\n`;
    inti += `3. Pengawas mencatat fakta objektif (critical incidents), respon siswa, dan durasi aktivitas tanpa menginterupsi jalannya pembelajaran;\n`;
    inti += `4. Menghimpun bukti portofolio kerja siswa dan lembar observasi sebagai bahan telaah faktual pasca kegiatan.`;
  } else if (hasCoaching || hasMentoring) {
    inti += `1. Melakukan dialog mendalam berbasis kemitraan: Pengawas mengajukan pertanyaan berbobot (powerful questioning) untuk menstimulasi kesadaran metakognitif guru;\n`;
    inti += `2. Membimbing guru mengeksplorasi Rencana Aksi (R pada TIRTA): merumuskan alternatif metode mengajar, merancang lembar kerja murid yang lebih interaktif, dan menyusun langkah perbaikan konkrit;\n`;
    inti += `3. Peer review berpasangan antar guru PAI sejawat guna saling memberi masukan apresiatif dan konstruktif terhadap draf perangkat yang dibuat;\n`;
    inti += `4. Pengawas memberikan umpan balik berbasis data objektif dan apresiasi tulus atas inisiatif kemajuan yang ditunjukkan guru.`;
  } else {
    inti += `1. Pelaksanaan pendampingan terstruktur sesuai dengan metode ${stratLabel};\n`;
    inti += `2. Pendalaman materi, simulasi praktik mengajar (peer teaching), serta bedah perangkat ajar dan instrumen asesmen PAI;\n`;
    inti += `3. Diskusi pemecahan masalah (problem solving) terhadap kendala faktual yang dihadapi guru di kelas;\n`;
    inti += `4. Finalisasi draf produk kerja pengawasan akademik dan validasi instrumen perbaikan secara terukur.`;
  }

  // Pertemuan Akhir
  let akhir = `1. Sesi Pasca-Pendampingan dan Refleksi Bermakna: Pengawas mengajak guru merefleksikan pengalaman, perasaan, dan pembelajaran penting (insight) yang diperoleh sepanjang proses kegiatan;\n`;
  if (hasCoaching) {
    akhir += `2. Membangun Tanggung Jawab (TA pada TIRTA): Mengukuhkan komitmen guru PAI mengenai langkah konkret perbaikan, penanggung jawab dukungan, dan batas waktu penyelesaian tindak lanjut;\n`;
  }
  akhir += `3. Pengawas menyampaikan umpan balik deskriptif (descriptive feedback) yang mengapresiasi kelebihan dan memberikan rekomendasi solutif pada aspek yang perlu ditingkatkan;\n`;
  akhir += `4. Penandatanganan komitmen bersama lembar Rencana Tindak Lanjut (RTL) supervisi akademik dan penyerahan instrumen penilaian hasil supervisi;\n`;
  akhir += `5. Doa penutup bersama dan penguatan motivasi spiritual sebagai pendidik PAI yang berintegritas dan berdedikasi tinggi.`;

  // Sumber Daya
  let sumberDaya = `1. Regulasi Resmi: KMA No. 450 Tahun 2024 / Permendikbudristek Kurikulum Merdeka, Capaian Pembelajaran (CP) PAI dan Bahasa Arab;\n` +
    `2. Dokumen Kurikulum: Panduan Pembelajaran dan Asesmen (PPA), Panduan Pengembangan Projek Penguatan Profil Pelajar Pancasila & PPRA Kemenag;\n` +
    `3. Perangkat Teknologi: Laptop/PC, Proyektor LCD, Jaringan Internet/Wi-Fi, Akun Platform Smart PAI, Aplikasi Canva for Education, Google Drive / LMS;\n` +
    `4. Instrumen Pengawasan: Format Lembar Telaah Modul Ajar PAI, Catatan Observasi Kelas, Rubrik Penilaian Kinerja Guru PAI, Lembar Refleksi Coaching TIRTA;\n` +
    `5. Sarana Penunjang: Kertas Plano/Flipchart, Post-It Notes, Spidol Warna, Mushaf Al-Qur'an Terjemah, dan ATK pendukung.`;

  return {
    skenario: {
      pertemuanAwal: awal.trim(),
      pertemuanInti: inti.trim(),
      pertemuanAkhir: akhir.trim(),
    },
    sumberDaya: sumberDaya.trim(),
  };
}

export const PRESET_LIST: Array<{
  name: string;
  badge: string;
  description: string;
  data: Partial<RpaDocument>;
}> = [
  {
    name: 'Supervisi Modul Ajar PAI Berdiferensiasi (SD/SMP)',
    badge: 'Populer',
    description: 'Fokus pada penyusunan modul ajar mendalam dan akomodasi keberagaman kesiapan belajar murid.',
    data: {
      aspekMasalah: ASPEK_MASALAH_OPTIONS[0],
      strategiMetode: ['Coaching Akademik', 'Workshop / Pelatihan Klinis'],
      waktu: 'Rabu, 14 Oktober 2026 Jam 08.00 – 14.30 WIB',
      tempat: 'Aula KKG PAI Gugus Imam Bonjol / SDN Sukajadi 1',
    },
  },
  {
    name: 'Supervisi Asesmen Autentik Sikap Spiritual & Sosial PAI',
    badge: 'Karakter',
    description: 'Fokus instrumen observasi afektif, self-assessment, dan jurnal pembiasaan adab siswa.',
    data: {
      aspekMasalah: ASPEK_MASALAH_OPTIONS[4],
      strategiMetode: ['Supervisi Klinis Bermutu (Pendampingan)', 'Focus Group Discussion (FGD) Kasus Riil (Problem Solving)'],
      waktu: 'Kamis, 22 Oktober 2026 Jam 08.30 – 15.00 WIB',
      tempat: 'Ruang Guru & Kelas PAI SMP Negeri 3',
    },
  },
  {
    name: 'Supervisi Pembelajaran Aktif Berorientasi HOTS & Moderasi',
    badge: 'Inovasi',
    description: 'Penerapan Problem Based Learning dalam rumpun Fiqih/Aqidah dengan dalil kontekstual.',
    data: {
      aspekMasalah: ASPEK_MASALAH_OPTIONS[3],
      strategiMetode: ['Mentoring dan Peer Coaching', 'Supervisi Klinis Bermutu (Pendampingan)'],
      waktu: 'Sabtu, 07 November 2026 Jam 08.00 – 15.00 WIB',
      tempat: 'Lab Multimedia & Ruang Kelas SMA Negeri 1',
    },
  },
  {
    name: 'Supervisi Integrasi Platform Digital Smart PAI & Canva',
    badge: 'Digital',
    description: 'Optimalisasi ekosistem digital Kemenag dan pembuatan media ajar interaktif.',
    data: {
      aspekMasalah: ASPEK_MASALAH_OPTIONS[6],
      strategiMetode: ['Lokakarya (Bimtek)', 'Workshop / Pelatihan Klinis'],
      waktu: 'Selasa, 17 November 2026 Jam 08.00 – 15.30 WIB',
      tempat: 'Aula Kantor Kementerian Agama Kota/Kabupaten',
    },
  },
];

export const INITIAL_RPA_DOCUMENT: RpaDocument = {
  identitas: {
    namaPengawas: 'Drs. H. Ahmad Fauzi, M.Pd.I.',
    nipPengawas: '197405121999031002',
    namaKetuaPokjawas: 'Dr. Hj. Siti Rohmah, M.Ag.',
    nipKetuaPokjawas: '197108201997032001',
    unitKerja: 'Kantor Kementerian Agama Kota Bandung',
    jenjangPengawasan: 'SMP (Sekolah Menengah Pertama)',
    durasiPertemuan: '1 Pertemuan (6 JP / 270 Menit)',
    kabKota: 'Kota Bandung',
    tanggalDokumen: '03 September 2026',
  },
  aspekMasalah: ASPEK_MASALAH_OPTIONS[0],
  tujuan: ASPEK_MAPPINGS[ASPEK_MASALAH_OPTIONS[0]].tujuan,
  indikator: ASPEK_MAPPINGS[ASPEK_MASALAH_OPTIONS[0]].indikator,
  waktu: 'Sabtu, 03 September 2026 Jam 08.00 – 15.00 WIB',
  tempat: 'Aula Kantor Kementerian Agama Kota Bandung',
  strategiMetode: ['Coaching Akademik', 'Supervisi Klinis Bermutu (Pendampingan)'],
  skenario: {
    pertemuanAwal:
      '1. Pengawas PAI membuka pertemuan dengan salam silaturahmi, membina hubungan kemitraan (rapport), dan menyelaraskan frekuensi supervisi akademik yang bersifat memberdayakan guru;\n2. Melakukan apersepsi dan kesepakatan pra-observasi: mengidentifikasi kebutuhan mendesak guru dalam menyusun Modul Ajar mendalam berakar CP PAI;\n3. Menerapkan alur TIRTA tahap awal: menetapkan Tujuan sesi, Mengidentifikasi kondisi modul yang ada saat ini, serta membangun komitmen bersama;\n4. Menyampaikan indikator ketercapaian, rubrik telaah modul ajar, dan jadwal alur pelaksanaan supervisi secara terbuka.',
    pertemuanInti:
      '1. Pengawas bersama guru melakukan telaah bersama terhadap draf Modul Ajar yang telah disiapkan guru PAI;\n2. Melakukan coaching klinis: Pengawas melontarkan pertanyaan reflektif untuk memantik guru menyaring materi agar berfokus pada pemahaman mendalam (deep learning) dan pertanyaan pemantik berbobot;\n3. Kerja mandiri terbimbing: Guru merancang ulang aktivitas belajar yang menghubungkan dalil naqli dengan kasus nyata keseharian murid;\n4. Pengawas memberikan umpan balik apresiatif dan membimbing perumusan instrumen asesmen formatif yang operasional.',
    pertemuanAkhir:
      '1. Pasca-observasi: Guru melakukan refleksi diri atas insight dan pemahaman baru yang diperoleh selama sesi pendampingan;\n2. Menyepakati Rencana Aksi (TIRTA - Tanggung Jawab): menetapkan jadwal implementasi modul ajar hasil revisi di ruang kelas sesungguhnya;\n3. Penandatanganan komitmen bersama lembar Rencana Tindak Lanjut (RTL) supervisi akademik;\n4. Doa penutup dan penguatan dedikasi spiritual guru PAI sebagai uswah hasanah di satuan pendidikan.',
  },
  sumberDaya:
    '1. KMA No. 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum Merdeka pada Madrasah & Sekolah;\n2. Capaian Pembelajaran (CP) PAI Kemendikbudristek & Kemenag;\n3. Laptop, Proyektor LCD, Akses Internet, dan Platform Digital Smart PAI Kemenag;\n4. Format Instrumen Lembar Telaah Modul Ajar PAI, Catatan Refleksi Supervisi, dan Rubrik Kinerja.',
  penilaianInstrumen: {
    jenisPenilaian: 'Penilaian Kinerja (Performance Test) & Telaah Portofolio Dokumen',
    teknikPenilaian: 'Analisis Dokumen Produk Perencanaan dan Observasi Pendampingan Klinis',
    namaInstrumen: 'Format Lembar Telaah Modul Ajar PAI dan Catatan Refleksi Supervisi Akademik',
    deskripsiInstrumen: 'Instrumen rubrik skala 1-4 untuk membedah kedalaman pemahaman, integrasi CP, alur aktivitas bermakna, dan kejelasan asesmen formatif.',
  },
  rencanaTindakLanjut:
    '1. Memvalidasi dan menyetujui final draf Modul Ajar PAI hasil revisi selambat-lambatnya 7 hari kerja;\n2. Melaksanakan supervisi kunjungan kelas (observasi pembelajaran) untuk mengamati keterlaksanaan modul di hadapan murid;\n3. Mengagendakan diseminasi Modul Ajar Terbaik sebagai model inspirasi dalam forum MGMP PAI tingkat Kota;\n4. Melaporkan hasil evaluasi kepengawasan akademik kepada Kepala Kantor Kementerian Agama / Kasi PAIS.',
  instrumenPenilaian: ASPEK_MAPPINGS[ASPEK_MASALAH_OPTIONS[0]].instrumen,
  rubrikPenilaian: ASPEK_MAPPINGS[ASPEK_MASALAH_OPTIONS[0]].rubrik,
};
