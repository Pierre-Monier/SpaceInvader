/// <reference path='animatedobject.ts'/>
/// <reference path='sound.ts'/>

class Laser extends AnimatedObject implements Speaking {
    playSound() {
        throw new Error("Method not implemented.");
    }
    public soundtrack : Sound;
    constructor(canvas : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        src : string, x : number, y : number, to_left : Boolean)
    {
        super(canvas,context,src);
        this.speed = 30;
        this.width = 32;
        this.height = 8;
        this.pos = new Vector(x, y);
        if(to_left == true){
            this.dir = new Vector(-1, 0);
        }else{
            this.dir = new Vector(1, 0);
        }
        this.soundtrack = new Sound('./sounds/shoot.wav');
        this.soundtrack.getSon().volume = 0.5;
    }
    public move(update_dir : Boolean)
    {
        let limit : number = this.canvas.width - this.width;
        super.move(false);
        if(this.pos.getX() + this.width >= limit || this.pos.getX() <= 0){
            this.setTo_delete(true);
        }
    }
}