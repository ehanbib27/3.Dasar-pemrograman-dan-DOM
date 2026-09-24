<?php
function stokValid(string $input): bool
{
$teks = trim($input);
return $teks !== '' && ctype_digit($teks);
}
foreach (['5', '0', '', '-1', 'abc', '2.5'] as $input) 
echo $input . ': ' . (stokValid($input) ? 'valid' : 'ditolak');
echo PHP_EOL;