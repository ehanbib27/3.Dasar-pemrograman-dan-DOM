<?php
foreach ([-1, 0, 74, 75, 100, 101] as $nilai) {
if ($nilai < 0 || $nilai > 100) {
$hasil = "Tidak valid";
} elseif ($nilai >= 75) {
$hasil = "Lulus";
} else {
$hasil = "Belajar lagi";
}
echo $nilai . ': ' . $hasil . PHP_EOL;
}