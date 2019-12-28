/// <reference path='sound.ts'/>
/// <reference path='monster.ts'/>

class Bonus extends AnimatedObject{

    constructor(canvas : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        src : string)
    {
        super(canvas,context,src);
        this.pos = new Vector(10, 200);
        this.dir = new Vector(1, 0);
        this.width = 30;
        this.height = 32;
        this.speed = 4;
    }

    move_bonus(update_dir  :  boolean, old_dir : number)
    {
        super.move(update_dir);
        if(old_dir != this.getDir().getX()){
            this.setTo_delete(true);
        }
        console.log(this.getTo_delete());
    }
}