import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isRetryable503 = (error: any) => {
  const status = error?.status ?? error?.code;
  const message = String(error?.message || '').toLowerCase();

  return (
    status === 503 ||
    message.includes('503') ||
    message.includes('unavailable') ||
    message.includes('high demand') ||
    message.includes('overloaded')
  );
};

const isQuota429 = (error: any) => {
  const status = error?.status ?? error?.code;
  const message = String(error?.message || '').toLowerCase();

  return (
    status === 429 ||
    message.includes('429') ||
    message.includes('resource_exhausted') ||
    message.includes('quota') ||
    message.includes('rate limit')
  );
};

async function enhanceWithRetry(
  prompt: string,
  maxAttempts = 4
) {
  let lastError: any = null;

  const retryDelays = [1500, 3000, 5000];

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',

          responseSchema: {
            type: Type.OBJECT,

            properties: {
              tujuan: {
                type: Type.STRING,
              },

              indikator: {
                type: Type.STRING,
              },

              skenario: {
                type: Type.OBJECT,

                properties: {
                  pertemuanAwal: {
                    type: Type.STRING,
                  },

                  pertemuanInti: {
                    type: Type.STRING,
                  },

                  pertemuanAkhir: {
                    type: Type.STRING,
                  },
                },

                required: [
                  'pertemuanAwal',
                  'pertemuanInti',
                  'pertemuanAkhir',
                ],
              },

              sumberDaya: {
                type: Type.STRING,
              },

              penilaianInstrumen: {
                type: Type.OBJECT,

                properties: {
                  jenisPenilaian: {
                    type: Type.STRING,
                  },

                  teknikPenilaian: {
                    type: Type.STRING,
                  },

                  namaInstrumen: {
                    type: Type.STRING,
                  },

                  deskripsiInstrumen: {
                    type: Type.STRING,
                  },
                },

                required: [
                  'jenisPenilaian',
                  'teknikPenilaian',
                  'namaInstrumen',
                  'deskripsiInstrumen',
                ],
              },

              rencanaTindakLanjut: {
                type: Type.STRING,
              },

              instrumenPenilaian: {
                type: Type.ARRAY,

                items: {
                  type: Type.OBJECT,

                  properties: {
                    id: {
                      type: Type.INTEGER,
                    },

                    aspekYangDiamati: {
                      type: Type.STRING,
                    },

                    indikatorKinerja: {
                      type: Type.STRING,
                    },

                    skorMaksimal: {
                      type: Type.INTEGER,
                    },

                    catatanKualitatif: {
                      type: Type.STRING,
                    },
                  },

                  required: [
                    'id',
                    'aspekYangDiamati',
                    'indikatorKinerja',
                    'skorMaksimal',
                    'catatanKualitatif',
                  ],
                },
              },

              rubrikPenilaian: {
                type: Type.ARRAY,

                items: {
                  type: Type.OBJECT,

                  properties: {
                    id: {
                      type: Type.INTEGER,
                    },

                    komponenProduk: {
                      type: Type.STRING,
                    },

                    kriteria: {
                      type: Type.STRING,
                    },

                    level1: {
                      type: Type.STRING,
                    },

                    level2: {
                      type: Type.STRING,
                    },

                    level3: {
                      type: Type.STRING,
                    },

                    level4: {
                      type: Type.STRING,
                    },
                  },

                  required: [
                    'id',
                    'komponenProduk',
                    'kriteria',
                    'level1',
                    'level2',
                    'level3',
                    'level4',
                  ],
                },
              },
            },

            required: [
              'tujuan',
              'indikator',
              'skenario',
              'sumberDaya',
              'penilaianInstrumen',
              'rencanaTindakLanjut',
              'instrumenPenilaian',
              'rubrikPenilaian',
            ],
          },
        },
      });
    } catch (error: any) {
      lastError = error;

      /*
       * 429 tidak diulang.
       *
       * Jika quota habis atau rate limit tercapai,
       * retry hanya akan menghasilkan request tambahan
       * yang kemungkinan besar juga gagal.
       */
      if (isQuota429(error)) {
        throw error;
      }

      /*
       * 503 dianggap sebagai kondisi sementara.
       * Berikan kesempatan kepada Gemini untuk pulih.
       */
      if (isRetryable503(error) && attempt < maxAttempts) {
        await sleep(retryDelays[attempt - 1]);
        continue;
      }

      throw error;
    }
  }

  throw lastError;
}

export default async function handler(req: any, res: any) {
  /*
   * Endpoint enhancement hanya menerima POST.
   */
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
    });
  }

  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({
        error: 'Data RPA tidak ditemukan.',
      });
    }

    /*
     * Pastikan API key tersedia.
     */
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Konfigurasi layanan AI belum tersedia.',
        detail: 'GEMINI_API_KEY belum dikonfigurasi.',
      });
    }

    const prompt = `
Anda adalah editor ahli Rencana Pengawasan Akademik
untuk pengawasan Pendidikan Agama Islam (PAI).

PERAN ANDA:

RPA yang diberikan kepada Anda SUDAH disusun oleh
generator standar aplikasi.

Tugas Anda BUKAN membuat RPA baru dari awal.

Tugas Anda adalah MENYEMPURNAKAN substansi RPA yang
sudah ada agar menjadi lebih:

- formal;
- akademik;
- operasional;
- kontekstual;
- jelas;
- terukur;
- realistis untuk kegiatan pengawasan akademik.

PRINSIP UTAMA:

1. Pertahankan struktur RPA yang diberikan.

2. Pertahankan maksud dan substansi utama RPA.

3. Jangan mengubah identitas pengawas.

4. Jangan mengubah identitas ketua Pokjawas.

5. Jangan mengubah unit kerja.

6. Jangan mengubah jenjang pengawasan.

7. Jangan mengubah durasi pertemuan.

8. Jangan mengubah kabupaten/kota.

9. Jangan mengubah tanggal dokumen.

10. Jangan mengubah aspek masalah yang dipilih pengguna.

11. Jangan mengubah strategi atau metode pengawasan
    yang telah dipilih pengguna.

12. Jangan mengubah waktu kegiatan.

13. Jangan mengubah tempat kegiatan.

14. Jangan membuat nama sekolah, nama guru, data,
    angka, kondisi, atau fakta baru yang tidak diberikan.

15. Jangan membuat informasi faktual yang tidak tersedia.

16. Jika informasi tertentu belum tersedia, jangan
    mengarang informasi tersebut.

17. Gunakan konteks yang sudah tersedia sebagai dasar
    penyempurnaan.

18. Bahasa harus sesuai dengan dokumen resmi pengawasan
    akademik Pendidikan Agama Islam.

PENYEMPURNAAN YANG DIHARAPKAN:

A. TUJUAN

Perbaiki rumusan tujuan agar:

- jelas;
- spesifik;
- relevan dengan aspek masalah;
- berorientasi pada hasil;
- realistis untuk kegiatan pengawasan.

B. INDIKATOR

Perbaiki indikator agar:

- dapat diamati;
- dapat diverifikasi;
- memiliki hubungan langsung dengan tujuan;
- dapat digunakan sebagai dasar penilaian.

C. SKENARIO

Perbaiki skenario:

- pertemuan awal;
- pertemuan inti;
- pertemuan akhir.

Skenario harus menggambarkan kegiatan yang benar-benar
dapat dilakukan oleh pengawas dan pihak yang dibina.

Jangan menambahkan kegiatan yang bertentangan dengan
strategi atau durasi yang telah ditentukan.

D. SUMBER DAYA

Perjelas sumber daya yang memang relevan dengan kegiatan.

Jangan menambahkan sumber daya yang tidak diperlukan.

E. PENILAIAN DAN INSTRUMEN

Pastikan:

- jenis penilaian relevan;
- teknik penilaian relevan;
- nama instrumen sesuai;
- deskripsi instrumen jelas;
- instrumen selaras dengan tujuan dan indikator.

F. INSTRUMEN PENILAIAN

Perbaiki indikator kinerja agar:

- konkret;
- dapat diamati;
- tidak terlalu umum;
- relevan dengan aspek masalah.

Pertahankan struktur dan jumlah item instrumen yang sudah
diberikan oleh generator standar.

Jangan menghilangkan item tanpa alasan yang jelas.

G. RUBRIK PENILAIAN

Perbaiki rubrik agar level 1, 2, 3, dan 4:

- memiliki perbedaan kualitas yang jelas;
- mudah dipahami;
- dapat digunakan oleh pengawas;
- selaras dengan komponen yang dinilai.

Pertahankan jumlah komponen rubrik yang sudah diberikan.

H. RENCANA TINDAK LANJUT

Perbaiki RTL agar:

- konkret;
- operasional;
- realistis;
- berkaitan langsung dengan hasil pengawasan;
- dapat dilaksanakan setelah kegiatan.

JANGAN:

- membuat fakta baru;
- mengubah identitas;
- mengubah strategi;
- mengubah waktu;
- mengubah tempat;
- mengubah jenjang;
- mengubah aspek masalah;
- mengubah konteks pengguna.

HASIL AKHIR:

Kembalikan RPA yang sama dalam struktur data yang sama,
tetapi dengan substansi yang telah disempurnakan.

DATA RPA HASIL GENERATOR STANDAR:

${JSON.stringify(data, null, 2)}

Sekarang sempurnakan RPA tersebut.
`;

    const response = await enhanceWithRetry(prompt, 4);

    const text = response.text;

    if (!text) {
      return res.status(500).json({
        error: 'Gemini tidak mengembalikan hasil enhancement.',
      });
    }

    let result;

    try {
      result = JSON.parse(text);
    } catch (parseError: any) {
      console.error(
        'Gemini Enhancement JSON Parse Error:',
        parseError
      );

      console.error(
        'Gemini Enhancement Raw Response:',
        text
      );

      return res.status(500).json({
        error:
          'Hasil enhancement AI tidak dapat dibaca sebagai data RPA.',
        detail:
          'Gemini mengembalikan format data yang tidak sesuai.',
      });
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Gemini RPA Enhancement Error:', error);

    const status = error?.status ?? error?.code;
    const message = String(error?.message || '');
    const lowerMessage = message.toLowerCase();

    /*
     * QUOTA / RATE LIMIT
     */
    if (isQuota429(error)) {
      return res.status(429).json({
        error:
          'Enhancement AI sedang mencapai batas penggunaan. RPA standar tetap dapat digunakan. Silakan coba kembali setelah batas penggunaan tersedia.',
        detail:
          'Permintaan enhancement AI terkena batas quota atau rate limit Gemini.',
      });
    }

    /*
     * GEMINI SEDANG PADAT / TIDAK TERSEDIA SEMENTARA
     */
    if (
      status === 503 ||
      lowerMessage.includes('503') ||
      lowerMessage.includes('high demand') ||
      lowerMessage.includes('unavailable') ||
      lowerMessage.includes('overloaded')
    ) {
      return res.status(503).json({
        error:
          'Enhancement AI sedang tidak tersedia sementara. RPA standar tetap dapat digunakan. Silakan coba lagi beberapa saat kemudian.',
        detail:
          message ||
          'Gemini sementara tidak tersedia.',
      });
    }

    /*
     * ERROR LAINNYA
     */
    return res.status(500).json({
      error:
        'Enhancement AI gagal diproses. RPA standar tetap dapat digunakan.',
      detail:
        message ||
        'Terjadi kesalahan pada layanan AI.',
    });
  }
}
