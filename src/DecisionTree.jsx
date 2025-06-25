export default function DecisionTree(data) {
  const { gaya, tinggi, berat, lompat, keseimbangan, pace, stamina, kaki } =
    data;

  if (gaya === "bertahan") {
    if (tinggi === "tinggi") {
      if (lompat === "tinggi") return "Kiper";
      else {
        if (berat === "berat") return "Bek Tengah";
        else return kaki === "kanan" ? "Bek Kanan" : "Bek Kiri";
      }
    } else {
      if (keseimbangan === "rendah") return "Bek Kanan";
      else return "Bek Kiri";
    }
  }

  if (gaya === "menyerang") {
    if (pace === "sangat cepat") {
      if (tinggi === "pendek") {
        return kaki === "kanan" ? "Sayap Kanan" : "Sayap Kiri";
      } else {
        return "Striker";
      }
    } else {
      if (lompat === "tinggi") return "Striker";
      else return kaki === "kanan" ? "Sayap Kanan" : "Sayap Kiri";
    }
  }

  if (gaya === "seimbang") {
    if (stamina === "tinggi") {
      if (pace === "cepat") return "Gelandang Serang";
      else return "Gelandang Tengah";
    } else {
      return "Gelandang Bertahan";
    }
  }

  return "Tidak Diketahui";
}
