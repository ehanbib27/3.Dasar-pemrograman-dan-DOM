<?php
// ==========================================
// BAGIAN 1: LOGIKA PHP (SERVER-SIDE)
// ==========================================

// Variabel untuk menyimpan pesan dari proses PHP
$pesanServer = "";
$statusProses = "";

// Cek apakah form dikirim melalui metode POST (PHP memproses input)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {$tugasBaru = isset($_POST['inputTugas']) ? trim($_POST['inputTugas']) : '';

    // Validasi sederhana di sisi PHP
    if (empty($tugasBaru)) {$pesanServer = "PHP Server: Input tidak boleh kosong!";
        $statusProses = "error";
    } else {
        // Mengamankan input teks dengan htmlspecialchars (mencegah XSS)
        $tugasAman = htmlspecialchars($tugasBaru, ENT_QUOTES, 'UTF-8');$pesanServer = "PHP Server: Berhasil menerima tugas '" . $tugasAman . "'";
        $statusProses = "sukses";
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Tugas dengan PHP & DOM (Subbab 3.11)</title>
    
    <!-- CSS -->
    <style>
        * { box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background-color: #e9ecef; padding: 20px; }
        .container { max-width: 450px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        form { display: flex; gap: 10px; margin-bottom: 10px; }
        input { flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; outline: none; }
        input:focus { border-color: #007bff; }
        button { padding: 8px 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #0056b3; }

        .btn-danger { background-color: #dc3545; width: 100%; margin-top: 15px; }
        .btn-danger:hover { background-color: #c82333; }
        .aksi-btn button { padding: 4px 8px; font-size: 12px; margin-left: 5px; }

        ul { list-style: none; padding: 0; margin: 10px 0; }
        li { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; }
        .teks-tugas { flex: 1; word-break: break-word; margin-right: 10px; }
        .selesai { text-decoration: line-through; color: #888; }

        .sembunyi { display: none !important; }
        .error { color: #dc3545; font-size: 13px; margin-bottom: 10px; }
        .sukses { color: #28a745; font-size: 13px; margin-bottom: 10px; }
        .empty-state { text-align: center; color: #6c757d; font-style: italic; margin-top: 20px; }
        #statusTugas { font-weight: bold; color: #495057; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Manajemen Tugas (PHP + JS)</h2>

        <!-- Notifikasi dari Server PHP (jika ada) -->
        <?php if (!empty($pesanServer)): ?>
            <div class="<?php echo $statusProses; ?>">
                <strong><?php echo $pesanServer; ?></strong>
            </div>
        <?php endif; ?>

        <!-- Form Tambah Tugas (mengirim ke PHP via method POST) -->
        <form id="formTugas" action="" method="POST">
            <input type="text" id="inputTugas" name="inputTugas" placeholder="Ketik tugas baru di sini...">
            <button type="submit">Tambah</button>
        </form>

        <!-- Tempat peringatan error dari Client (JS) -->
        <div id="pesanError" class="sembunyi error"></div>

        <!-- Penghitung Tugas (DOM JS) -->
        <p id="statusTugas">Tugas belum selesai: 0</p>

        <!-- Empty State -->
        <div id="emptyState" class="empty-state">
            Belum ada tugas saat ini.
        </div>

        <!-- Tempat Daftar Tugas -->
        <ul id="daftarTugas"></ul>

        <!-- Tombol Hapus Masal -->
        <button id="btnHapusSelesai" class="sembunyi btn-danger">Hapus yang Selesai</button>
    </div>

    <!-- ========================================== -->
    <!-- BAGIAN 2: LOGIKA JAVASCRIPT & DOM (CLIENT) -->
    <!-- ========================================== -->
    <script>
        const formTugas = document.getElementById("formTugas");
        const inputTugas = document.getElementById("inputTugas");
        const pesanError = document.getElementById("pesanError");
        const daftarTugas = document.getElementById("daftarTugas");
        const emptyState = document.getElementById("emptyState");
        const statusTugas = document.getElementById("statusTugas");
        const btnHapusSelesai = document.getElementById("btnHapusSelesai");

        let dataTugas = [];

        function renderDOM() {
            daftarTugas.innerHTML = "";
            let jumlahBelumSelesai = 0;
            let adaYangSelesai = false;

            if (dataTugas.length === 0) {
                emptyState.classList.remove("sembunyi");
            } else {
                emptyState.classList.add("sembunyi");

                for (let i = 0; i < dataTugas.length; i++) {
                    const tugas = dataTugas[i];
                    if (!tugas.selesai) jumlahBelumSelesai++;
                    if (tugas.selesai) adaYangSelesai = true;

                    const li = document.createElement("li");
                    const spanTeks = document.createElement("span");
                    spanTeks.textContent = tugas.judul;
                    spanTeks.classList.add("teks-tugas");
                    if (tugas.selesai) spanTeks.classList.add("selesai");

                    const divAksi = document.createElement("div");
                    divAksi.classList.add("aksi-btn");

                    const btnSelesai = document.createElement("button");
                    btnSelesai.textContent = tugas.selesai ? "Batal" : "Selesai";
                    btnSelesai.addEventListener("click", function() {
                        dataTugas[i].selesai = !dataTugas[i].selesai;
                        renderDOM();
                    });

                    const btnHapus = document.createElement("button");
                    btnHapus.textContent = "Hapus";
                    btnHapus.style.backgroundColor = "#dc3545";
                    btnHapus.addEventListener("click", function() {
                        dataTugas.splice(i, 1);
                        renderDOM();
                    });

                    divAksi.appendChild(btnSelesai);
                    divAksi.appendChild(btnHapus);
                    li.appendChild(spanTeks);
                    li.appendChild(divAksi);
                    daftarTugas.appendChild(li);
                }
            }

            statusTugas.textContent = `Tugas belum selesai: ${jumlahBelumSelesai}`;

            if (adaYangSelesai) {
                btnHapusSelesai.classList.remove("sembunyi");
            } else {
                btnHapusSelesai.classList.add("sembunyi");
            }
        }

        formTugas.addEventListener("submit", function(event) {
            event.preventDefault(); // Cegah reload halaman agar DOM tetap berjalan di client
            const judulInput = inputTugas.value.trim();

            // Validasi JavaScript (Front-end)
            if (judulInput === "") {
                pesanError.textContent = "Data harus diisi, tidak boleh kosong!";
                pesanError.classList.remove("sembunyi");
                inputTugas.focus();
                return;
            }

            // Jika validasi lolos, simpan ke JS dan hentikan pengiriman form ke PHP
            pesanError.classList.add("sembunyi");
            dataTugas.push({ judul: judulInput, selesai: false });
            inputTugas.value = "";
            renderDOM();
        });

        btnHapusSelesai.addEventListener("click", function() {
            dataTugas = dataTugas.filter(tugas => tugas.selesai === false);
            renderDOM();
        });

        renderDOM();
    </script>
</body>
</html>