function stokValid(input) {
const teks = input.trim();
return teks !== "" && /^[0-9]+$/.test(teks);
}
for (const input of ["5", "0", "", "-1", "abc", "2.5"]) {
console.log(input + ": " + (stokValid(input) ? "valid" : "ditolak"));
}