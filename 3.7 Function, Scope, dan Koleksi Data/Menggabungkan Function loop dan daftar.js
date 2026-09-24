function cariNama(data, nama) {
const hasil = [];
for (const item of data) {
if (item.nama === nama) {
hasil.push(item);
}
}
return hasil;
}
console.log(cariNama(barang, "Buku").length);