<?php
require './utils/config.php';
require './C/Manager.php';

$score = intval($_GET['score']);
$player = strval($_GET['player']);

$manager = new Manager($conn);

$manager->add($player, (int)$score);