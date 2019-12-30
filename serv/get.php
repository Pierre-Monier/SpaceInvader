<?php
require './utils/config.php';
require './C/Manager.php';

$manager = new Manager($conn);

$manager->getScore();