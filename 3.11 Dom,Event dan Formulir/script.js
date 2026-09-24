// 1. Data demonstrasi lokal berupa Array of Objects
const dataBarang = [
    { nama: "Buku Tulis", kategori: "Alat Tulis", stok: 15 },
    { nama: "Pensil 2B", kategori: "Alat Tulis", stok: 50 },
    { nama: "Penggaris Besi", kategori: "Alat Tulis", stok: 10 },
    { nama: "Penghapus", kategori: "Alat Tulis", stok: 20 },
    { nama: "Spidol Hitam", kategori: "Alat Tulis", stok: 5 },
    { nama: "Kertas HVS", kategori: "Kertas", stok: 100 },
    { nama: "Laptop", kategori: "Alat Kerja", stok: 5 },
];

// 2. Mengambil referensi DOM
const formPencarian = document.getElementById("formPencarian");
const inputCari = document.getElementById("inputCari");
const pesanError = document.getElementById("pesanError");
const daftarHasil = document.getElementById("daftarHasil");
const emptyState = document.getElementById("emptyState");

// 3. Menangani event submit
formPencarian.addEventListener("submit", function(event) {
    // Mencegah browser melakukan reload halaman
    event.preventDefault();

    // Mengambil nilai teks dan menghilangkan spasi berlebih
    const kataKunci = inputCari.value.trim();

    // Reset tampilan hasil dan error sebelum mulai pencarian baru
    daftarHasil.innerHTML = "";
    pesanError.classList.add("sembunyi");
    
    // VALIDASI: Tolak input jika kosong
    if (kataKunci === "") {
        pesanError.textContent = "Kok kosong😡😡!";
        pesanError.classList.remove("sembunyi");
        daftarHasil.classList.add("sembunyi");
        emptyState.classList.add("sembunyi");
        inputCari.focus(); // Mengembalikan fokus kursor ke kotak input
        return; // Menghentikan proses agar kode di bawahnya tidak berjalan
    }

    // PROSES: Melakukan filter data
    // Menggunakan toLowerCase() agar huruf besar/kecil tetap cocok (case-insensitive)
    const hasilCari = dataBarang.filter(function(barang) {
        return barang.nama.toLowerCase().includes(kataKunci.toLowerCase());
    });

    // OUTPUT: Menampilkan Hasil
    daftarHasil.classList.remove("sembunyi");

    if (hasilCari.length === 0) {
        // Jika data tidak ditemukan, tampilkan pesan empty state
        emptyState.textContent = `Barang dengan kata kunci "${kataKunci}" tidak ditemukan.`;
        emptyState.classList.remove("sembunyi");
    } else {
        // Jika data ditemukan, sembunyikan empty state
        emptyState.classList.add("sembunyi");

        // Buat list HTML untuk setiap hasil pencarian menggunakan textContent (mencegah syntax error/HTML injection)
        for (const barang of hasilCari) {
            const li = document.createElement("li");
            
            const teksTebal = document.createElement("strong");
            teksTebal.textContent = barang.nama;
            
            const teksBiasa = document.createTextNode(` (Kategori: ${barang.kategori} | Stok: ${barang.stok})`);
            
            li.appendChild(teksTebal);
            li.appendChild(teksBiasa);
            
            daftarHasil.appendChild(li);
        }
    }
});