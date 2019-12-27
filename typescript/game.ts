// Compiler option
// --target es5 --outDir ../javascript/

// Chargement des fichiers ".ts" qui seront utiles
/// <reference path='level.ts'/>
/// <reference path='sound.ts'/>


class Game {
    // Attributs utiles pour l'affichage
    private canvas : HTMLCanvasElement;
    private context : CanvasRenderingContext2D;

    // Attribut representant l'image de fond
    private background : HTMLImageElement;

    // Attributs gerant l'avancement du joueur
    private score : number;
    private death : number;
    private niveau : number;

    // Attribut representant le niveau courant
    private level : Level;

    constructor(fps : number) {
        
        // Initialisation des variables d'affichage
        this.canvas = <HTMLCanvasElement> document.getElementById("game"); // Recupere l'element du HTML avec l'identifiant "game"
        this.canvas.width = 512; // Specifie la largeur de l'element, ici 512 pixels
        this.canvas.height = 480; // Specifie la hauteur de l'element, ici 480 pixels
        this.context = this.canvas.getContext('2d'); // Charge le context d'affichage du canvas

        // Initialisation de l'image de fond
        this.background = new Image(); // La classe "Image" est une classe deja existante
        this.background.src = "./images/background.png"; // Specifie le chemin de l'image a partir de index.html ("./" signifie le repertoire courant)

        // Initialisation des variables gerant l'avancement du joueur
        this.score = 0; // Au debut... pas de points
        this.death = 0; // Au debut... le joureur n'a jamais perdu de vie
        this.niveau = 1; // Au debut... on commence au niveau 1




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
        setInterval(() => { this.loop() }, 1000 / fps);
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
                console.log("   -> touche 'droite'");
                // Une fleche droite en cours de jeu, et nous appelons la methode
                // du niveau qui gere la fleche droite
                this.level.keyRight();
            } else if (keycode == 37) {
                console.log("   -> touche 'gauche'")
                // Une fleche gauche en cours de jeu, et nous appelons la methode
                // du niveau qui gere la fleche gauche
                this.level.keyLeft();
            }
            else if (keycode == 32) {
                // Une touche espace en cours de jeu, et nous appelons la methode
                // du niveau qui gere la barre espace
                this.level.keySpace();
            }
        } else {
            // Sinon le niveau est null alors, le joueur est dans le menu.
            // Pour commencer un niveau le joueur doit appuyer sur la touche entree
            if (keycode == 13) {
                this.startLevel();
            }
        }
    }

    private startLevel() {
        // Creation de l'objet niveau
        let canvas = <HTMLCanvasElement>document.getElementById("game");
        this.level = new Level(canvas, canvas.getContext('2d'), 25);
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
        } else {
            // Sinon le niveau est null alors, le joueur est dans le menu.
            // Nous affichons donc les instructions pour commencer au niveau suivant
            this.addInstructions();
        }
        // dans tous les cas, nous affichons le niveau courant, le score courant et le nombre de parties perdues
        this.addInformation();
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

    private addInstructions() {
        // Affichage des instructions pour commencer au niveau suivant
        // ... en blanc
        this.context.fillStyle = "#fff";
        // ... en Arial police 27
        this.context.font = "27px Arial";

        this.context.fillText("Niveau "+this.niveau,150,210); 
        this.context.fillText("Appuyer sur Entree pour commencer !",45,250); 
    }

    private addInformation() {
        // Affichage des informations sur la session du joueur
        // ... en blanc
        this.context.fillStyle = "#fff";
        // ... en Arial police 27
        this.context.font = "23px Arial";

        this.context.fillText("Score : "+this.score,40,60);
        this.context.fillText("Death : "+this.death,40,90);
        this.context.fillText("Niveau : "+this.niveau,40,440);
    }


    private nextLevel() {
        // Preparation du prochain niveau
        // on passe au niveau suivant
        // (x++  equivalent a x=x+1)
        this.niveau++;
        // on ajoute le score du niveau au score courant

        this.score += this.score;

        // on precise que le joueur n'est plus dans le niveau
        this.level = null;

        // Comme le joueur a gagne le niveau courant
        // on joue une musique de victoire
        let soundtrack : Sound = new Sound("./sounds/son_victoire.wav");
        soundtrack.playSound();
    }

    private resetLevel() {
        // Re-initialisation du niveau courant
        // on precise que le joueur n'est plus dans le niveau
        this.level = null;

        // Comme le joueur a perdu le niveau courant
        // on augmente le nombre de parties perdues de 1
        // (x++  equivalent a x=x+1)
        this.death++;
        // joue une musique de defaite
        let soundtrack : Sound = new Sound("./sounds/son_defaite.wav");
        soundtrack.playSound();
    }
}

// Le debut de notre programme ne s'effectuera que lorsque la page html
// aura ete entierement chargee
window.onload = function() {
    // Creation du jeu dont le rafraichissement s'effectuera 30 fois par seconde
    let jeu = new Game(30);
};