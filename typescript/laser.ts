/// <reference path='animatedobject.ts'/>
/// <reference path='sound.ts'/>

class Laser extends AnimatedObject implements Speaking {
    playSound() {
        throw new Error("Method not implemented.");
    }
    public soundtrack : Sound;
    private is_monster : boolean;
    constructor(canvas : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        src : string, x : number, y : number, is_monster : boolean)
    {
        super(canvas,context,src);
        this.is_monster = is_monster;
        this.speed = 30;
        this.width = 6;
        this.height = 20;
        this.pos = new Vector(x, y);
        if(this.is_monster === false){
            this.dir = new Vector(0, -1);
        }else{
            this.dir = new Vector(0, 1);
        }
        
        this.soundtrack = new Sound('./sounds/shoot.wav');
        this.soundtrack.getSon().volume = 0.5;
    }
    public move(update_dir : Boolean)
    {
        let limit : number = this.canvas.height - this.height;
        super.move(false);
        if(this.pos.getY() + this.width >= limit || this.pos.getY() <= 0){
            this.setTo_delete(true);
        }
    }
    public getIs_monster()
    {
        return this.is_monster;
    }
}