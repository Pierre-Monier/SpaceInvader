// Compiler option
// --target es5 --outDir ../javascript/

// Chargement des fichiers ".ts" qui seront utiles
/// <reference path='level.ts'/>
/// <reference path='sound.ts'/>
/// <reference path='htmlManager.ts'/>


class Game {
    // Attributs utiles pour l'affichage
    private canvas : HTMLCanvasElement;
    private context : CanvasRenderingContext2D;
    private htmlManager : htmlManager;

    // Attribut representant l'image de fond
    private background : HTMLImageElement;

    // Attributs gerant l'avancement du joueur
    private score : number;
    private vie : number;
    private niveau : number;
    private game_over : boolean;
    private playing : boolean;
    private beguining : boolean;
    private win : boolean;

    private player_score : Array<string>;
   // Attribut representant le niveau courant
    private level : Level;

    constructor(fps : number) {
        
        // Initialisation des variables d'affichage
        this.canvas = <HTMLCanvasElement> document.getElementById("game"); // Recupere l'element du HTML avec l'identifiant "game"
        this.canvas.width = 512; // Specifie la largeur de l'element, ici 512 pixels
        this.canvas.height = 400; // Specifie la hauteur de l'element, ici 480 pixels
        this.context = this.canvas.getContext('2d'); // Charge le context d'affichage du canvas
        this.htmlManager = new htmlManager('end', 'sub');
        // Initialisation de l'image de fond
        this.background = new Image(); // La classe "Image" est une classe deja existante
        this.background.src = "./images/background.png"; // Specifie le chemin de l'image a partir de index.html ("./" signifie le repertoire courant)

        // Initialisation des variables gerant l'avancement du joueur
        this.score = 0; // Au debut... pas de points
        this.vie = 3; // Au debut... le joureur n'a jamais perdu de vie
        this.niveau = 1; // Au debut... on commence au niveau 1
        this.game_over = false;
        this.playing = true;
        this.beguining = true; 
        this.player_score = [];  
        this.win = null; 
        // Initialisation relative au niveau courant
        this.level = null // Au debut... le joueur ne commence pas dans un niveau, il commence avec le menu. Donc pas de niveau.

        // Cette methode permet a notre classe de s'abonner aux evenements clavier
        // en d'autre terme, on specifie au systeme que nous voulons etre prevenu quand
        // l'utilisateur appuie sur une touche (n'importe laquelle)
        // Allez voir le code de la methode pour plus d'info
        this.registerKeyPress();       
        // Cette ligne specifie que nous souhaitons appeler la methode "loop()"
        // "fps" fois par seconde. Nous specifions donc que quand "1000ms / fps" millisecondes
        // ce sont ecoulees, nous appelons la methode "loop()"

        setInterval(() => { this.createLoop() }, 1000 / fps);
        // this.createLoop();
    }

    private registerKeyPress(){
        // Lorsque l'element "<body></body>" de la page capture une touche enfoncee (keydown),
        // nous demandons au system d'appeler la methode "keyDetected()" avec en argument le code
        // de la touche.
        // Exemple d'autre type d'evenement : 'keyup'
        document.body.addEventListener('keydown', (e: KeyboardEvent) => {this.keyDetected(e.keyCode)});
    }

    private keyDetected(keycode : number) {
        if (this.level != null) {
            // Si le niveau est non null alors, le joueur est en train de jouer.
            // Nous allons donc effectuer des actions specifiques pour les fleches
            // et la barre d'espace
            if (keycode == 39) {
                // Une fleche droite en cours de jeu, et nous appelons la methode
                // du niveau qui gere la fleche droite
                this.level.keyRight();
            } else if (keycode == 37) {
                // Une fleche gauche en cours de jeu, et nous appelons la methode
                // du niveau qui gere la fleche gauche
                this.level.keyLeft();
            }
            else if (keycode == 32) {
                // Une touche espace en cours de jeu, et nous appelons la methode
                // du niveau qui gere la barre espace
                this.level.keySpace();
            }
            else if (keycode == 9) {
                // this.level.kill();
                this.vie--;
            }
        } else {
            // Sinon le niveau est null alors, le joueur est dans le menu.
            // Pour commencer un niveau le joueur doit appuyer sur la touche entree
            if (keycode == 13) {
                if(this.beguining){
                    this.beguining = false;
                }
                this.startLevel();
            }
        }
    }

    private startLevel() {
        // Creation de l'objet niveau
        let canvas = <HTMLCanvasElement>document.getElementById("game");
        this.level = new Level(canvas, canvas.getContext('2d'), this.sendMonster(this.niveau), this.score, this.niveau);
    }

    private loop() {
        // Pour rappel cette methode est appele "fps" fois par seconde

        // A chaque "nouvelle image" de l'animation
        // Nous allons preparer le canvas, en effacant les dessin qu'il avait avant
        // et en re-dessinant le fond (l'image en arriere plan)
        this.initFrame();
        if (this.level != null) {
            // Si le niveau est non null alors, le joueur est en train de jouer.
            // Nous allons donc effectuer une mise a jour des objets a dessiner
            // (maj des positions, de l'etat du niveau, etc) ...
            this.level.updateObjects();
            this.score = this.level.getLevelScore();
            // ... et une fois mise a jour nous allons les dessiner
            this.level.drawObjects(0, 0);
            // Ensuite nous verifions l'etat du niveau
            // en on prepare le prochaine appel a la mnethode "loop"
            if (this.level.getLevelState() == "Gagné !") {
                // s'il est gagne, on revient au menu et on prepare le niveau suivant
                this.nextLevel();
            } else if (this.level.getLevelState() == "Perdu") {
                // s'il est perdu, on revient au menu et on re-initialise le niveau
                this.resetLevel();
            }
        } else if(this.vie > 0) {
            // Sinon le niveau est null alors, le joueur est dans le menu.
            // Nous affichons donc les instructions pour commencer au niveau suivant
            this.addInstructions(this.win);
        }
        // dans tous les cas, nous affichons le niveau courant, le score courant et le nombre de parties perdues
        if(this.vie > 0){
            this.addInformation();
        }else{
            this.endGame(this.game_over);
            this.playing = false;
        }
        
    }

    private initFrame() {
        this.clearCanvas();
        this.drawBackground();
    }

    private clearCanvas() {
        // Cette ligne efface tout ce qui a ete dessine sur le canvas (le rectangle du canvas devient blanc par defaut)
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawBackground() {
        // Cette ligne permet de dessiner l'image de fond dans le canvas
        this.context.drawImage(this.background, 0, 0);    
    }

    private addInstructions(win : boolean) {
        if(!this.beguining){
            this.context.fillStyle = "#fff";
            this.context.font = "27px arcadeclassicregular";
            this.context.textAlign = "center";
            this.context.font = "36px";
            this.context.textAlign = "center";
            if(win){
                this.context.fillText("You   Win !",(this.canvas.width/2),160);
            }else{
                this.context.fillText("You   Died !",(this.canvas.width/2),160);
            }
            this.context.fillText("Level  "+this.niveau,(this.canvas.width/2),210); 
            this.context.fillText("Press  Enter  to  Play !",(this.canvas.width/2),250);
        }
         
    }

    private addInformation() {
        // Affichage des informations sur la session du joueur
        // ... en blanc
        this.context.fillStyle = "#fff";
        this.context.font = "18px arcadeclassicregular";
        this.context.textAlign = "left";
        if(!this.beguining){
            this.context.fillText("Score : "+this.score,(this.canvas.width/12),60);
            this.context.fillText("Life : x"+this.vie,(this.canvas.width/12),90);
            this.context.font = "27px";
            this.context.fillText("Level  :  "+this.niveau,(this.canvas.width/12),440);
        }

    }


    private nextLevel() {
        // Preparation du prochain niveau
        // on passe au niveau suivant
        this.niveau++;
        this.win = true;
        // on ajoute le score du niveau au score courant
        this.score = this.score;
        // on precise que le joueur n'est plus dans le niveau
        this.stopLevel();
        // Comme le joueur a gagne le niveau courant
        // on joue une musique de victoire
        let soundtrack : Sound = new Sound("./sounds/win.mp3");
        soundtrack.playSound();
        // }
    }

    private resetLevel() {

        // Comme le joueur a perdu le niveau courant
        // on augmente le nombre de parties perdues de 1
        this.vie--;
        this.win = false;
        if(this.vie < 1){
            this.game_over = true;
        }
        // Re-initialisation du niveau courant
        // on precise que le joueur n'est plus dans le niveau
        this.stopLevel();


        // joue une musique de defaite

        let soundtrack : Sound = new Sound("./sounds/death.mp3");
        soundtrack.playSound();

    }

    private sendMonster(niveau : number)
    {
        if(niveau < 3){
            return 20;
        }else if(niveau < 5){
            return 40;
        }else{
            return 50;
        }
    }

    private endGame(game_over : boolean)
    {
        // victory sound
        this.initFrame();
        this.context.fillStyle = "#ff0000";
        this.context.font = "36px arcadeclassicregular";
        this.context.textAlign = "center";
        let img = document.getElementById('game_over') as HTMLImageElement;

        if(game_over){
            this.context.fillText("GAME",(this.canvas.width/2),150);
            this.context.fillText("OVER",(this.canvas.width/2),180);
            this.context.font = "27px arcadeclassicregular";
            this.context.fillStyle = "#fff";

            this.context.fillText("Your  Score  :  "+this.score,(this.canvas.width/2),250);
            this.context.font = "18px arcadeclassicregular"; 
            this.level = null;
        }
        // let soundtrack : Sound = new Sound("./sounds/yeah.wav");
        // soundtrack.playSound();
        this.htmlManager.show();
    }

    private homeScreen()
    {
        this.initFrame();
        this.context.fillStyle = "#fff";
        this.context.font = "36px arcadeclassicregular";
        this.context.textAlign = "center";
        this.context.fillText("Top  Player  :  ",(this.canvas.width/2),50);
        this.context.font = "27px arcadeclassicregular";
        this.context.textAlign = "left";
        this.htmlManager.getFromBack('http://localhost/SpaceInvader/serv/get.php', (score : object) =>{
            for(let i : number = 0; i<5; i++){
                if(score[i]){
                    this.player_score.push((i+1)+" -  "+score[i].player+"  :  "+score[i].score);
                }else{
                    this.player_score.push((i+1)+"- ");
                } 
            }  
        });
        if(this.player_score[0]){
            let y : number = 100;
            for(let i : number = 0; i<5; i++){
                this.context.fillText(this.player_score[i],(this.canvas.width/4),y);
                y+=40;
            }
        }else{
            this.context.fillText("Wait...",(this.canvas.width/4),100);
        }
        this.context.font = "36px arcadeclassicregular";
        this.context.fillText("Press  Enter  to  Play ->",(this.canvas.width/6),350);
    }

    private createLoop()
    {
        if(this.playing && !this.beguining){
            this.loop();
        }
        if(this.beguining){
            this.homeScreen();
        }
    }

    getScore(){return this.score;}
    getM(){return this.htmlManager;}

    sendDbPlayer()
    {
        this.htmlManager.initAjax(false);
            if(this.htmlManager.getInput().value.length === 0){
                this.htmlManager.getInput().value = "Timothy";
            }
            console.log('http://localhost/SpaceInvader/serv/add.php?player='+this.htmlManager.getInput().value+"&score="+this.score);
            this.htmlManager.getAjax().open("GET", 'http://localhost/SpaceInvader/serv/add.php?player='+this.htmlManager.getInput().value+"&score="+this.score, true);
            this.htmlManager.getAjax().send();
            this.htmlManager.getAjax().onreadystatechange = () => {
                if(this.htmlManager.getAjax().readyState == 4 && this.htmlManager.getAjax().status == 200){
                    this.htmlManager.Nice();
                }else if(this.htmlManager.getAjax().status != 200){
                    this.htmlManager.Error();
                }
            }
    }

    stopLevel()
    {
        this.level.getMusic().getSon().pause();
        this.level.getMusic().getSon().currentTime = 0;
        this.level = null;
    }
}

// Le debut de notre programme ne s'effectuera que lorsque la page html
// aura ete entierement chargee
window.onload = () => {
    // Creation du jeu dont le rafraichissement s'effectuera 30 fois par seconde
    let jeu = new Game(30);
    jeu.getM().getSub().onclick = (ev) => {
        ev.preventDefault();
        jeu.sendDbPlayer();
    }
};