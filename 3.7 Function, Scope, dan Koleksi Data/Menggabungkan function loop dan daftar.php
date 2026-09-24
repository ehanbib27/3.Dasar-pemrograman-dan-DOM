function cariNama(array $data, string $nama): array <?
{
$hasil = [];
foreach ($data as $item) {
if ($item['nama'] === $nama) {
$hasil[] = $item;
}
}
return $hasil;
}
echo count(cariNama($barang, 'Buku')) . PHP_EOL;?>