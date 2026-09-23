<?php
$nilai = 75;
if ($nilai < 0 || $nilai > 100) {
echo "Tidak valid";
} elseif ($nilai >= 75) {
echo "Lulus";
} else {
echo "Belajar lagi";
}?>