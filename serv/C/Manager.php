<?php
class Manager{
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // caratéristique
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    protected $_conn;
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    // CONSTRUCT
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    public function __construct($conn){$this->setDb($conn);}    
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// fonctionnalité
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    public function getScore()
    {

        $scores = [];

        $q = $this->_conn->prepare('SELECT * FROM `score` ORDER by score DESC');
        $q->execute([]);
        while ($donnees = $q->fetch(PDO::FETCH_ASSOC))
        {

            $scores[] = $donnees;

        }
        $scores = json_encode($scores);
        echo $scores;

    }

    public function add(string $player, int $score)
    {
        if(!$this->update($player, $score)){
            $q = $this->_conn->prepare('INSERT INTO `score` (player, score) VALUES (:player, :score)');
            $q->execute([':player'  =>  $player,
                         ':score'   =>  $score]);
        }
    }

    public function update(string $player, int $score)
    {
        $q = $this->_conn->prepare('SELECT * FROM `score` WHERE player = :player');
        $q->execute([':player' => $player]);

        while ($donnees = $q->fetch(PDO::FETCH_ASSOC))
        {

            if(!empty($donnees)){
                if($donnees['score'] < $score){
                    $q = $this->_conn->prepare('UPDATE `score` SET `score` = :score WHERE player = :player');
                    $q->execute([':player' =>  $player,
                                 ':score'  =>  $score]);
                    
                }
                return true;
            }else{
                return false;
            }
        }

    }

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    // SETTER
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
public function setDb(PDO $conn){$this->_conn = $conn;}

// end
}
?>