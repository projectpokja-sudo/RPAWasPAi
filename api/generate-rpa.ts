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

async function generateWithRetry(
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
       * 429 tidak langsung di-retry.
       *
       * Jika penyebabnya adalah quota harian,
       * retry hanya akan memperbanyak request yang gagal.
       */
      if (isQuota429(error)) {
        throw error;
      }

      /*
       * 503 biasanya bersifat sementara.
       * Kita beri kesempatan Gemini pulih sebelum
       * mengembalikan error ke pengguna.
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
  // Hanya menerima POST
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

    const prompt = `
Anda adalah asisten ahli penyusun Rencana Pengawasan Akademik
untuk pengawasan Pendidikan Agama Islam (PAI).

Tugas Anda adalah menyusun substansi RPA berdasarkan data yang
diberikan oleh pengguna.

PRINSIP PENYUSUNAN:

1. Gunakan bahasa Indonesia formal, akademik, administratif,
   dan operasional.

2. Hasil harus realistis untuk kegiatan pengawasan akademik.

3. Tujuan harus selaras dengan aspek masalah.

4. Indikator harus dapat diamati atau diverifikasi.

5. Skenario harus realistis sesuai durasi dan strategi
   pengawasan.

6. Instrumen harus selaras dengan tujuan dan indikator.

7. Rubrik harus memiliki level 1 sampai 4 yang jelas
   dan dapat dibedakan.

8. Rencana tindak lanjut harus konkret dan dapat dilaksanakan.

9. Jangan mengubah identitas, waktu, tempat, jenjang,
   atau strategi yang diberikan pengguna.

10. Jangan membuat informasi faktual tentang sekolah atau
    guru yang tidak diberikan pengguna.

11. Jika pengguna memberikan informasi khusus pada
    aspek masalah atau strategi, gunakan informasi tersebut
    sebagai dasar penyusunan substansi.

12. Jangan menghilangkan bagian penting dari data konteks
    yang diberikan pengguna.

DATA KONTEKS RPA:

${JSON.stringify(data, null, 2)}

Susun substansi RPA berdasarkan konteks tersebut.
`;

    const response = await generateWithRetry(prompt, 4);

    const text = response.text;

    if (!text) {
      return res.status(500).json({
        error: 'Gemini tidak mengembalikan hasil.',
      });
    }

    let result;

    try {
      result = JSON.parse(text);
    } catch (parseError: any) {
      console.error('Gemini JSON Parse Error:', parseError);
      console.error('Gemini Raw Response:', text);

      return res.status(500).json({
        error: 'Hasil AI tidak dapat dibaca sebagai data RPA.',
        detail:
          'Gemini mengembalikan format data yang tidak sesuai.',
      });
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Gemini RPA Error:', error);

    const status = error?.status ?? error?.code;
    const message = String(error?.message || '');

    /*
     * QUOTA / RATE LIMIT
     */
    if (isQuota429(error)) {
      return res.status(429).json({
        error:
          'Layanan AI sedang mencapai batas penggunaan. Silakan tunggu beberapa saat lalu coba kembali.',
        detail:
          'Permintaan AI terkena batas quota atau rate limit Gemini.',
      });
    }

    /*
     * GEMINI SEDANG PADAT / TIDAK TERSEDIA SEMENTARA
     */
    if (
      status === 503 ||
      message.toLowerCase().includes('high demand') ||
      message.toLowerCase().includes('unavailable')
    ) {
      return res.status(503).json({
        error:
          'Layanan AI sedang sangat sibuk. Sistem sudah mencoba kembali beberapa kali. Silakan coba lagi beberapa saat kemudian.',
        detail: message || 'Gemini sementara tidak tersedia.',
      });
    }

    /*
     * ERROR LAINNYA
     */
    return res.status(500).json({
      error: 'Gagal menghasilkan RPA dengan AI.',
      detail: message || 'Terjadi kesalahan pada layanan AI.',
    });
  }
}
