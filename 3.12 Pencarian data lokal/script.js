// Referensi elemen DOM
const formTugas = document.getElementById("formTugas");
const inputTugas = document.getElementById("inputTugas");
const pesanError = document.getElementById("pesanError");
const daftarTugas = document.getElementById("daftarTugas");
const emptyState = document.getElementById("emptyState");
const statusTugas = document.getElementById("statusTugas");
const btnHapusSelesai = document.getElementById("btnHapusSelesai");

// Array untuk menyimpan data (seperti di Subbab 3.10)
let dataTugas = [];

// Fungsi untuk menggambar ulang DOM berdasarkan data saat ini
function renderDOM() {
    daftarTugas.innerHTML = ""; // Bersihkan list HTML
    
    let jumlahBelumSelesai = 0;
    let adaYangSelesai = false;

    // Cek apakah data kosong untuk memunculkan Empty State
    if (dataTugas.length === 0) {
        emptyState.classList.remove("sembunyi");
    } else {
        emptyState.classList.add("sembunyi");

        // Loop untuk membuat elemen DOM setiap tugas
        for (let i = 0; i < dataTugas.length; i++) {
            const tugas = dataTugas[i];
            
            // Hitung status untuk modifikasi & tantangan
            if (!tugas.selesai) jumlahBelumSelesai++;
            if (tugas.selesai) adaYangSelesai = true;

            const li = document.createElement("li");

            // Menggunakan textContent untuk teks (mencegah syntax error/HTML injeksi)
            const spanTeks = document.createElement("span");
            spanTeks.textContent = tugas.judul;
            spanTeks.classList.add("teks-tugas");
            if (tugas.selesai) {
                spanTeks.classList.add("selesai");
            }

            const divAksi = document.createElement("div");
            divAksi.classList.add("aksi-btn");

            // Tombol Tandai Selesai / Batal
            const btnSelesai = document.createElement("button");
            btnSelesai.textContent = tugas.selesai ? "Batal" : "Selesai";
            btnSelesai.addEventListener("click", function() {
                dataTugas[i].selesai = !dataTugas[i].selesai; // Ubah status
                renderDOM(); // Render ulang DOM
            });

            // Tombol Hapus Individual
            const btnHapus = document.createElement("button");
            btnHapus.textContent = "Hapus";
            btnHapus.style.backgroundColor = "#dc3545";
            btnHapus.addEventListener("click", function() {
                dataTugas.splice(i, 1); // Hapus 1 data dari array
                renderDOM(); // Render ulang DOM
            });

            divAksi.appendChild(btnSelesai);
            divAksi.appendChild(btnHapus);

            li.appendChild(spanTeks);
            li.appendChild(divAksi);

            daftarTugas.appendChild(li);
        }
    }

    // Eksekusi Modifikasi: Update teks status belum selesai
    statusTugas.textContent = `Tugas belum selesai: ${jumlahBelumSelesai}`;

    // Eksekusi Tantangan: Munculkan tombol hapus hanya jika ada tugas selesai
    if (adaYangSelesai) {
        btnHapusSelesai.classList.remove("sembunyi");
    } else {
        btnHapusSelesai.classList.add("sembunyi");
    }
}

// Menangani Event Form Submit
formTugas.addEventListener("submit", function(event) {
    event.preventDefault(); // Cegah reload browser

    const judulInput = inputTugas.value.trim();

    // TAMBAHKAN DUA BARIS INI UNTUK CEK DI CONSOLE:
    console.log("Input diketik:", judulInput);
    console.log("Isi array dataTugas saat ini:", dataTugas);

    // Validasi input kosong
    if (judulInput === "") {
        pesanError.textContent = "Data harus diisi, tidak boleh kosong!";
        pesanError.classList.remove("sembunyi");
        inputTugas.focus(); // Kembalikan fokus ke kotak input
        return;
    }

    // Jika sukses, sembunyikan error dan masukkan data baru
    pesanError.classList.add("sembunyi");
    dataTugas.push({ judul: judulInput, selesai: false });

    inputTugas.value = ""; // Kosongkan form
    renderDOM();
});

// Event Listener untuk Tantangan (Hapus yang selesai)
btnHapusSelesai.addEventListener("click", function() {
    // Saring array, sisakan yang HANYA belum selesai
    dataTugas = dataTugas.filter(function(tugas) {
        return tugas.selesai === false;
    });
    renderDOM();
});
