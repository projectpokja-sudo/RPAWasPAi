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
