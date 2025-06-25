import React, { useState } from "react";
import { postTrainPemainBola, getFamousFootballer } from "./SupabaseService";
import DecisionTree from "./DecisionTree"; // Pastikan file/fungsi ini ada

export default function PlayerForm() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictedPosisi, setPredictedPosisi] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [famousPlayers, setFamousPlayers] = useState([]);
  const [formData, setFormData] = useState({
    berat: "",
    tinggi: "",
    pace: "",
    stamina: "",
    keseimbangan: "",
    kaki: "",
    lompat: "",
    gaya: "",
    posisi: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);
    setLoading(true);
    setModalMessage("Sedang melakukan cenayang...");
    setFamousPlayers([]);

    try {
      // Kategorikan tinggi dan berat sebelum prediksi
      let kategoriTinggi = "";
      let kategoriBerat = "";
      const tinggi = Number(formData.tinggi);
      const berat = Number(formData.berat);

      if (tinggi >= 180) {
        kategoriTinggi = "tinggi";
      } else if (tinggi >= 170 && tinggi < 180) {
        kategoriTinggi = "sedang";
      } else {
        kategoriTinggi = "pendek";
      }

      if (berat >= 80) {
        kategoriBerat = "berat";
      } else if (berat >= 70 && berat < 80) {
        kategoriBerat = "sedang";
      } else {
        kategoriBerat = "ringan";
      }

      // Buat data baru dengan kategori tinggi & berat
      const dataForPrediction = {
        ...formData,
        tinggi: kategoriTinggi,
        berat: kategoriBerat,
      };

      // 2. Prediksi posisi menggunakan DecisionTree
      const predicted = DecisionTree(dataForPrediction);

      // 3. Post data ke Supabase, posisi diambil dari hasil prediksi (pakai SupabaseService)
      const dataToPost = { ...dataForPrediction, posisi: predicted };
      await postTrainPemainBola(dataToPost);

      // 4. Ambil 3 pemain terkenal dengan posisi yang sama
      const allFamous = await getFamousFootballer();
      const filtered = allFamous
        .filter((p) => p.posisi?.toLowerCase() === predicted.toLowerCase())
        .slice(0, 3);

      setPredictedPosisi(predicted);
      setFamousPlayers(filtered);
      setModalMessage(`Dukun Kami Berhasil Memprediksi Posisi Terbaik Anda!`);
    } catch (error) {
      console.error("Error during submission:", error);
      setModalMessage("Terjadi kesalahan saat mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-wrap items-center border-b-3 pb-4 mb-4">
          <img src="images/footure.png" alt="" className="w-15" />
          <div className="ml-4">
            <p className="text-2xl font-poppins font-bold">
              <span className="text-blue-300">Foo</span>
              <span className="text-orange-300">Ture</span>
            </p>
            <p className="text-gray-500">
              Prediksi posisi sepakbola berdasarkan data pemain
            </p>
          </div>
        </div>
        {/* Disclaimer */}
        <div className="alert bg-yellow-200 shadow-lg rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            {/* <AlertCircle className="text-yellow-600 mt-1" /> */}
            <div>
              <h3 className="font-bold text-yellow-800 uppercase">
                Disclaimer!
              </h3>
              <ul className="list-disc list-inside text-sm text-yellow-900 mt-2 space-y-1">
                <li>
                  Website tidak meminta <strong>data pribadi</strong> apapun
                </li>
                <li>
                  Data akan disimpan, namun hanya untuk keperluan <strong>optimasi</strong>
                </li>
                <li>
                  Website ini hanya digunakan untuk <strong>hiburan</strong>
                </li>
                <li>
                  Prediksi yang dihasilkan tidak sepenuhnya benar, sehingga{" "}
                  <strong>tidak dapat dijadikan pedoman</strong>
                </li>
                <li>
                  Isi data dengan sungguh-sungguh untuk mendapat{" "}
                  <strong>hasil yang maksimal</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ...input fields... */}
          <div>
            <label className="label font-semibold text-md mb-2">
              Berat (kg)
            </label>
            <input
              type="number"
              name="berat"
              className="input input-bordered w-full"
              placeholder="Masukkan berat badan"
              required
              min={1}
              value={formData.berat}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label font-semibold text-md mb-2">
              Tinggi (cm)
            </label>
            <input
              type="number"
              name="tinggi"
              className="input input-bordered w-full"
              placeholder="Masukkan tinggi badan"
              required
              min={1}
              value={formData.tinggi}
              onChange={handleChange}
            />
          </div>
          {[
            {
              label: "Pace",
              name: "pace",
              options: [
                "sangat lambat",
                "lambat",
                "sedang",
                "cepat",
                "sangat cepat",
              ],
            },
            {
              label: "Stamina",
              name: "stamina",
              options: ["rendah", "sedang", "tinggi"],
            },
            {
              label: "Keseimbangan",
              name: "keseimbangan",
              options: ["rendah", "sedang", "tinggi"],
            },
            { label: "Kaki Dominan", name: "kaki", options: ["kanan", "kiri"] },
            {
              label: "Kemampuan Lompat",
              name: "lompat",
              options: ["rendah", "sedang", "tinggi"],
            },
            {
              label: "Preferensi Gaya Bermain",
              name: "gaya",
              options: ["bertahan", "seimbang", "menyerang"],
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="label font-semibold text-md mb-2">
                {field.label}
              </label>
              <select
                name={field.name}
                className="select select-bordered w-full"
                required
                value={formData[field.name]}
                onChange={handleChange}
              >
                <option value="">-- Pilih {field.label} --</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              Kirim Data
            </button>
          </div>
        </form>
      </div>

      {/* Modal Konfirmasi */}
      {showModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {loading ? "Sedang menghubungi cenayang..." : "Data Terkirim!"}
            </h3>
            <p className="py-4">
              {modalMessage}
              {!loading && predictedPosisi && (
                <span className="flex flex-col text-center items-center justify-center mt-4">
                  <br />
                  <strong>
                    Posisi-mu:
                    <div className="text-2xl font-bold text-blue-600">
                      {predictedPosisi}
                    </div>
                  </strong>
                  {/* Tampilkan pemain bola terkenal */}
                  {famousPlayers.length > 0 && (
                    <div className="mt-4">
                      <span className="font-semibold">
                        Pemain bola terkenal di posisi ini:
                      </span>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {famousPlayers.map((pemain, idx) => (
                          <div
                            key={idx}
                            className="card bg-blue-50 border border-blue-200 rounded-lg shadow p-4 flex flex-col items-center"
                          >
                            <img
                              src={pemain.foto || "/images/default-player.png"}
                              alt={pemain.nama}
                              className="w-20 h-20 object-cover rounded-full mb-2 border"
                            />
                            <div className="font-bold text-blue-700">
                              {pemain.nama}
                            </div>
                            <div className="text-sm text-gray-600">
                              {pemain.posisi}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="alert bg-blue-300 shadow-lg rounded-lg p-4 mt-4">
                        <div className="flex items-start gap-3">
                          <div className="text-blue-800 italic">
                            Sumber data pemain bola terkenal diambil dari{" "}
                            <a href="https://www.transfermarkt.com/">www.transfermarkt.com</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </span>
              )}
            </p>
            <div className="modal-action">
              <button
                className="btn btn-success"
                onClick={() => {
                  setShowModal(false);
                  setPredictedPosisi("");
                  setModalMessage("");
                  setFamousPlayers([]);
                  setFormData({
                    berat: "",
                    tinggi: "",
                    pace: "",
                    stamina: "",
                    keseimbangan: "",
                    kaki: "",
                    lompat: "",
                    gaya: "",
                    posisi: "",
                  });
                }}
                disabled={loading}
              >
                Tutup
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
