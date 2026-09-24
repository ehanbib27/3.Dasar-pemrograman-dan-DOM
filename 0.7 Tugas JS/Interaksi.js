function hitungTotal(harga, jumlah) {
const subtotal = harga * jumlah;
const diskon = subtotal >= 100000 ? subtotal * 0.3 : 0;
return subtotal - diskon;
}
console.log(hitungTotal(25000, 4)); // 90000