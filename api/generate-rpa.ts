import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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
1. Gunakan bahasa Indonesia formal, akademik, administratif, dan operasional.
2. Hasil harus realistis untuk kegiatan pengawasan akademik.
3. Tujuan harus selaras dengan aspek masalah.
4. Indikator harus dapat diamati atau diverifikasi.
5. Skenario harus realistis sesuai durasi dan strategi pengawasan.
6. Instrumen harus selaras dengan tujuan dan indikator.
7. Rubrik harus memiliki level 1 sampai 4 yang jelas dan dapat dibedakan.
8. Rencana tindak lanjut harus konkret dan dapat dilaksanakan.
9. Jangan mengubah identitas, waktu, tempat, jenjang, atau strategi yang diberikan pengguna.
10. Jangan membuat informasi faktual tentang sekolah atau guru yang tidak diberikan pengguna.

DATA KONTEKS RPA:

${JSON.stringify(data, null, 2)}

Susun substansi RPA berdasarkan konteks tersebut.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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

    const text = response.text;

    if (!text) {
      return res.status(500).json({
        error: 'Gemini tidak mengembalikan hasil.',
      });
    }

    const result = JSON.parse(text);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Gemini RPA Error:', error);

    return res.status(500).json({
      error: 'Gagal menghasilkan RPA dengan AI.',
      detail: error?.message || 'Unknown error',
    });
  }
}
