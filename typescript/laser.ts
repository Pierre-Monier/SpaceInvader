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
        src : string, x : number, y : number, is_monster : boolean, level : number)
    {
        super(canvas,context,src);
        this.is_monster = is_monster;
        if(is_monster && level > 6){
            this.speed = 15;
        }else if(level > 12){
            this.speed = 25;
        }else if(is_monster){
            this.speed = 10;
        }else{
            this.speed = 25;
        }
        this.speed = 25;
        if(src === './images/laser3.png'){
            this.width = 48;
            this.height = 14;
        }else{
            this.width = 6;
            this.height = 20;
        } 
        this.pos = new Vector(x, y);
        if(this.is_monster === false){
            this.dir = new Vector(0, -1);
        }else{
            this.dir = new Vector(0, 1);
        }
        this.soundtrack = new Sound(this.getSoundFile(src));
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

    public getSoundFile(src : string)
    {
        if(this.is_monster){
            switch(src){
                case './images/laser3.png': 
                    return './sounds/evil_laser2.mp3'
                default:
                    return './sounds/evil_laser1.mp3';
            }
        }else{
            return './sounds/shoot.wav';
        }

    }
}