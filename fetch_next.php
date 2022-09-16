<?php
header('Content-Type: text/plain; charset=UTF-8;');

$username = $_POST['letter'];
$index = $_POST['i'];
$url = 'https://github.com/'.$username.'?page='.$index.'&tab=repositories';
$content = file_get_contents($url);
$get_1 = explode('<ul data-filterable-for="your-repos-filter" data-filterable-type="substring">',$content);
$get_2 = explode('</ul>',$get_1[1]);
$output= substr($get_2[0],1);
$output = preg_replace( "/\n\s+/", "\n", rtrim(html_entity_decode(strip_tags($output))));
$output = str_replace("\n", "|", $output);

echo json_encode($output);

?>