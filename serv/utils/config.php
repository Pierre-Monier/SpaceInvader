<?php
$conn = new PDO('mysql:host=localhost;dbname=jeux_op', 'mo_high999', 'meepmeeP');
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING); // On émet une alerte à chaque fois qu'une requête a échouéconn
