for (const nilai of [-1, 0, 74,]) {
let hasil;
if (nilai < 0 || nilai > 100) {
hasil = "Tidak valid";
} else if (nilai >= 75) {
hasil = "Lulus";
} else {
hasil = "Belajar lagi";
}
console.log(nilai + ": " + hasil);
}