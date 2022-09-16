<?php
header('Content-Type: text/plain; charset=UTF-8;');

$username = $_POST['letter'];
$url = 'https://github.com/'.$username.'?tab=repositories';
$content = file_get_contents($url);
$get_1 = explode('<a class="next_page" ',$content);
$get_2 = explode('</a>',$get_1[1]);
$output= $get_2[0];
$output = preg_replace( "/\n\s+/", "\n", rtrim(html_entity_decode(strip_tags($output))));
$output = str_replace("\n", "|", $output);

echo json_encode($output);

?>