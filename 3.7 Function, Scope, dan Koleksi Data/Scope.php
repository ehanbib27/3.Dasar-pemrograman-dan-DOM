<?php
$barang = [
['nama' => 'Buku', 'stok' => 5],
['nama' => 'Pensil', 'stok' => 0],
];
foreach ($barang as $item) {
echo $item['nama'] . ': ' . $item['stok'] . PHP_EOL;
}