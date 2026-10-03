import { RpaDocument } from '../types/rpa';

/**
 * Generates and downloads a complete Microsoft Word (.doc) document
 * with authentic table borders, justified text alignment, full 11 components,
 * instrument table, rubric table, and the two-column signature block.
 */
export function exportRpaToWord(doc: RpaDocument) {
  const currentDate = doc.identitas.tanggalDokumen || '03 September 2026';
  const tempatTtd = doc.identitas.kabKota || 'Bandung';

  const strategiesText = doc.strategiMetode.length > 0
    ? doc.strategiMetode.join(', ') + (doc.strategiMetodeCustom ? `, ${doc.strategiMetodeCustom}` : '')
    : 'Supervisi Klinis Bermutu dan Coaching Akademik';

  const formatListHtml = (text: string) => {
    return text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => `<p style="margin: 2pt 0; text-align: justify; line-height: 1.35;">${line.trim()}</p>`)
      .join('');
  };

  const instrumentRowsHtml = doc.instrumenPenilaian
    .map(
      (item, idx) => `
    <tr>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: center; vertical-align: top;">${idx + 1}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: left; vertical-align: top; font-weight: 600;">${item.aspekYangDiamati}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: justify; vertical-align: top;">${item.indikatorKinerja}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: center; vertical-align: top;">${item.skorMaksimal}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: center; vertical-align: top;">${item.skorPerolehan ?? '-'}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: justify; vertical-align: top;">${item.catatanKualitatif || '-'}</td>
    </tr>
  `
    )
    .join('');

  const rubricRowsHtml = doc.rubrikPenilaian
    .map(
      (item, idx) => `
    <tr>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: center; vertical-align: top;">${idx + 1}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: left; vertical-align: top; font-weight: 600;">
        ${item.komponenProduk}
        <br/><span style="font-weight: normal; font-size: 9pt; color: #444;">(${item.kriteria})</span>
      </td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: justify; vertical-align: top; font-size: 9.5pt;">${item.level4}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: justify; vertical-align: top; font-size: 9.5pt;">${item.level3}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: justify; vertical-align: top; font-size: 9.5pt;">${item.level2}</td>
      <td style="border: 1pt solid #000000; padding: 5pt; text-align: justify; vertical-align: top; font-size: 9.5pt;">${item.level1}</td>
    </tr>
  `
    )
    .join('');

  const wordContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>Rencana Pengawasan Akademik (RPA) - Pengawas PAI</title>
      <style>
        @page Section1 {
          size: 21.0cm 29.7cm;
          margin: 2.0cm 2.0cm 2.0cm 2.0cm;
          mso-header-margin: 36.0pt;
          mso-footer-margin: 36.0pt;
          mso-paper-source: 0;
        }
        div.Section1 {
          page: Section1;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11pt;
          line-height: 1.3;
          color: #000000;
        }
        p, div, td, th {
          text-align: justify;
          text-justify: inter-word;
        }
        h1, h2, h3, h4 {
          text-align: center;
          margin: 0;
          padding: 0;
        }
        .header-title {
          font-size: 13pt;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 2pt;
        }
        .header-subtitle {
          font-size: 12pt;
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 12pt;
        }
        table.spreadsheet-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8pt;
          margin-bottom: 14pt;
        }
        table.spreadsheet-table th {
          background-color: #f2f4f7;
          border: 1pt solid #000000;
          padding: 6pt;
          font-weight: bold;
          text-align: center;
          font-size: 10.5pt;
        }
        table.spreadsheet-table td {
          border: 1pt solid #000000;
          padding: 6pt 8pt;
          vertical-align: top;
          font-size: 10.5pt;
        }
        .section-label {
          font-weight: bold;
          color: #000000;
        }
        .subheading {
          font-weight: bold;
          margin-top: 4pt;
          margin-bottom: 2pt;
          color: #1e3a8a;
        }
      </style>
    </head>
    <body>
      <div class="Section1">
        <!-- KOP DOKUMEN RESMI KEPENGAWASAN -->
        <div style="border-bottom: 3px double #000000; padding-bottom: 6pt; margin-bottom: 14pt; text-align: center;">
          <p style="font-size: 11pt; font-weight: bold; margin: 0; text-align: center;">KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
          <p style="font-size: 10pt; font-weight: bold; margin: 0; text-align: center;">KANTOR KEMENTERIAN AGAMA ${doc.identitas.unitKerja.toUpperCase()}</p>
          <p style="font-size: 10pt; font-weight: bold; margin: 0; text-align: center;">KELOMPOK KERJA PENGAWAS PENDIDIKAN AGAMA ISLAM (POKJAWAS PAI)</p>
          <p style="font-size: 8.5pt; margin: 2pt 0 0 0; text-align: center; font-style: italic;">Sekretariat: ${doc.identitas.kabKota} | Layanan Supervisi Akademik & Manajerial Guru PAI</p>
        </div>

        <div class="header-title">RENCANA PENGAWASAN AKADEMIK (RPA)</div>
        <div class="header-subtitle">PENGAWAS PENDIDIKAN AGAMA ISLAM (PAI)</div>

        <!-- TABEL SPREADSHEET 11 BAGIAN UTAMA -->
        <table class="spreadsheet-table">
          <thead>
            <tr>
              <th style="width: 5%;">NO</th>
              <th style="width: 25%;">KOMPONEN PENGAWASAN</th>
              <th style="width: 70%;">DESKRIPSI / RINCIAN OPERASIONAL</th>
            </tr>
          </thead>
          <tbody>
            <!-- 1. IDENTITAS -->
            <tr>
              <td style="text-align: center; font-weight: bold;">1</td>
              <td class="section-label">Identitas Pengawasan</td>
              <td>
                <table style="width: 100%; border: none; border-collapse: collapse;">
                  <tr>
                    <td style="border: none; padding: 2pt 0; width: 35%;">a. Nama Pengawas PAI</td>
                    <td style="border: none; padding: 2pt 0; width: 5%;">:</td>
                    <td style="border: none; padding: 2pt 0; font-weight: bold;">${doc.identitas.namaPengawas}</td>
                  </tr>
                  <tr>
                    <td style="border: none; padding: 2pt 0;">b. Unit Kerja</td>
                    <td style="border: none; padding: 2pt 0;">:</td>
                    <td style="border: none; padding: 2pt 0;">${doc.identitas.unitKerja}</td>
                  </tr>
                  <tr>
                    <td style="border: none; padding: 2pt 0;">c. Jenjang Pengawasan</td>
                    <td style="border: none; padding: 2pt 0;">:</td>
                    <td style="border: none; padding: 2pt 0;">${doc.identitas.jenjangPengawasan}</td>
                  </tr>
                  <tr>
                    <td style="border: none; padding: 2pt 0;">d. Durasi Pertemuan</td>
                    <td style="border: none; padding: 2pt 0;">:</td>
                    <td style="border: none; padding: 2pt 0;">${doc.identitas.durasiPertemuan}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- 2. ASPEK / MASALAH -->
            <tr>
              <td style="text-align: center; font-weight: bold;">2</td>
              <td class="section-label">Aspek / Masalah</td>
              <td style="text-align: justify;">
                ${doc.aspekMasalah === 'Lainnya (Isi Sendiri)' ? doc.aspekMasalahCustom || '-' : doc.aspekMasalah}
              </td>
            </tr>

            <!-- 3. TUJUAN -->
            <tr>
              <td style="text-align: center; font-weight: bold;">3</td>
              <td class="section-label">Tujuan Pengawasan</td>
              <td style="text-align: justify;">
                ${formatListHtml(doc.tujuan)}
              </td>
            </tr>

            <!-- 4. INDIKATOR -->
            <tr>
              <td style="text-align: center; font-weight: bold;">4</td>
              <td class="section-label">Indikator Keberhasilan</td>
              <td style="text-align: justify;">
                ${formatListHtml(doc.indikator)}
              </td>
            </tr>

            <!-- 5. WAKTU -->
            <tr>
              <td style="text-align: center; font-weight: bold;">5</td>
              <td class="section-label">Waktu Pelaksanaan</td>
              <td>${doc.waktu}</td>
            </tr>

            <!-- 6. TEMPAT -->
            <tr>
              <td style="text-align: center; font-weight: bold;">6</td>
              <td class="section-label">Tempat Pelaksanaan</td>
              <td>${doc.tempat}</td>
            </tr>

            <!-- 7. STRATEGI / METODE KERJA -->
            <tr>
              <td style="text-align: center; font-weight: bold;">7</td>
              <td class="section-label">Strategi / Metode Kerja / Teknik Supervisi</td>
              <td>${strategiesText}</td>
            </tr>

            <!-- 8. SKENARIO KEGIATAN -->
            <tr>
              <td style="text-align: center; font-weight: bold;">8</td>
              <td class="section-label">Skenario Kegiatan</td>
              <td>
                <div style="font-weight: bold; margin-bottom: 2pt; text-decoration: underline;">A. Pertemuan Awal (Pra-Observasi / Pengkondisian)</div>
                <div style="margin-bottom: 8pt;">${formatListHtml(doc.skenario.pertemuanAwal)}</div>

                <div style="font-weight: bold; margin-bottom: 2pt; text-decoration: underline;">B. Pertemuan Inti (Pelaksanaan Supervisi / Pendampingan Klinis)</div>
                <div style="margin-bottom: 8pt;">${formatListHtml(doc.skenario.pertemuanInti)}</div>

                <div style="font-weight: bold; margin-bottom: 2pt; text-decoration: underline;">C. Pertemuan Akhir (Pasca-Observasi, Refleksi & Komitmen RTL)</div>
                <div>${formatListHtml(doc.skenario.pertemuanAkhir)}</div>
              </td>
            </tr>

            <!-- 9. SUMBER DAYA -->
            <tr>
              <td style="text-align: center; font-weight: bold;">9</td>
              <td class="section-label">Sumber Daya yang Diperlukan</td>
              <td>
                ${formatListHtml(doc.sumberDaya)}
              </td>
            </tr>

            <!-- 10. PENILAIAN & INSTRUMEN -->
            <tr>
              <td style="text-align: center; font-weight: bold;">10</td>
              <td class="section-label">Penilaian dan Instrumen</td>
              <td>
                <p style="margin: 2pt 0;"><strong>Jenis Penilaian:</strong> ${doc.penilaianInstrumen.jenisPenilaian}</p>
                <p style="margin: 2pt 0;"><strong>Teknik Penilaian:</strong> ${doc.penilaianInstrumen.teknikPenilaian}</p>
                <p style="margin: 2pt 0;"><strong>Nama Instrumen:</strong> ${doc.penilaianInstrumen.namaInstrumen}</p>
                <p style="margin: 2pt 0; text-align: justify;"><strong>Deskripsi Operasional:</strong> ${doc.penilaianInstrumen.deskripsiInstrumen}</p>
                <p style="margin: 3pt 0 0 0; font-style: italic; font-size: 9.5pt; color: #1f2937;">*Rincian instrumen dan rubrik penilaian terlampir pada dokumen ini.</p>
              </td>
            </tr>

            <!-- 11. RENCANA TINDAK LANJUT -->
            <tr>
              <td style="text-align: center; font-weight: bold;">11</td>
              <td class="section-label">Rencana Tindak Lanjut (RTL)</td>
              <td>
                ${formatListHtml(doc.rencanaTindakLanjut)}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- LEMBAR TANDA TANGAN (KIRI: KETUA POKJAWAS, KANAN: PENGAWAS PAI) -->
        <table style="width: 100%; border: none; border-collapse: collapse; margin-top: 24pt; page-break-inside: avoid;">
          <tr>
            <td style="width: 50%; border: none; vertical-align: top; text-align: left; padding-left: 10pt;">
              <p style="margin: 0; line-height: 1.3;">Mengetahui,</p>
              <p style="margin: 0; line-height: 1.3; font-weight: bold;">Ketua Pokjawas PAI</p>
              <div style="height: 60pt;"></div>
              <p style="margin: 0; line-height: 1.3; font-weight: bold; text-decoration: underline;">${doc.identitas.namaKetuaPokjawas}</p>
              <p style="margin: 0; line-height: 1.3;">NIP. ${doc.identitas.nipKetuaPokjawas}</p>
            </td>
            <td style="width: 50%; border: none; vertical-align: top; text-align: left; padding-left: 40pt;">
              <p style="margin: 0; line-height: 1.3;">${tempatTtd}, ${currentDate}</p>
              <p style="margin: 0; line-height: 1.3; font-weight: bold;">Pengawas Pendidikan Agama Islam,</p>
              <div style="height: 60pt;"></div>
              <p style="margin: 0; line-height: 1.3; font-weight: bold; text-decoration: underline;">${doc.identitas.namaPengawas}</p>
              <p style="margin: 0; line-height: 1.3;">NIP. ${doc.identitas.nipPengawas}</p>
            </td>
          </tr>
        </table>

        <!-- BREAK TO ATTACHMENTS -->
        <div style="page-break-before: always; height: 1pt;"></div>

        <!-- LAMPIRAN 1: INSTRUMEN PENILAIAN PENGAWASAN AKADEMIK -->
        <div style="text-align: center; margin-top: 15pt; margin-bottom: 12pt;">
          <h3 style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">LAMPIRAN I: INSTRUMEN PENILAIAN PENGAWASAN AKADEMIK</h3>
          <p style="font-size: 10pt; font-style: italic; margin-top: 2pt;">Format Lembar Catatan Observasi & Penilaian Unjuk Kerja Guru PAI</p>
        </div>

        <table class="spreadsheet-table">
          <thead>
            <tr>
              <th style="width: 5%;">NO</th>
              <th style="width: 25%;">ASPEK YANG DIAMATI</th>
              <th style="width: 35%;">INDIKATOR KINERJA</th>
              <th style="width: 10%;">SKOR MAKS.</th>
              <th style="width: 10%;">SKOR HASIL</th>
              <th style="width: 15%;">CATATAN KUALITATIF</th>
            </tr>
          </thead>
          <tbody>
            ${instrumentRowsHtml}
          </tbody>
        </table>

        <!-- BREAK TO RUBRIC -->
        <div style="page-break-before: always; height: 1pt;"></div>

        <!-- LAMPIRAN 2: RUBRIK PENILAIAN PROYEK / PRODUK PERANGKAT PAI -->
        <div style="text-align: center; margin-top: 15pt; margin-bottom: 12pt;">
          <h3 style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">LAMPIRAN II: RUBRIK PENILAIAN PROYEK / PRODUK PERANGKAT PAI</h3>
          <p style="font-size: 10pt; font-style: italic; margin-top: 2pt;">Pedoman Penskoran Kualitas Produk Perencanaan & Asesmen Pembelajaran</p>
        </div>

        <table class="spreadsheet-table">
          <thead>
            <tr>
              <th style="width: 4%;">NO</th>
              <th style="width: 20%;">KOMPONEN / KRITERIA</th>
              <th style="width: 19%;">SANGAT BAIK (4)</th>
              <th style="width: 19%;">BAIK (3)</th>
              <th style="width: 19%;">CUKUP (2)</th>
              <th style="width: 19%;">PERLU BIMBINGAN (1)</th>
            </tr>
          </thead>
          <tbody>
            ${rubricRowsHtml}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', wordContent], {
    type: 'application/msword;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  const filename = `RPA_WasPAI_${doc.identitas.namaPengawas.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.doc`;

  downloadLink.href = url;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}
