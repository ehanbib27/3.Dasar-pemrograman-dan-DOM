<?php
function totalBelanja(int $harga, int $jumlah): int
{
return $harga * $jumlah;
}
echo totalBelanja(12000, 2) . PHP_EOL;
?>