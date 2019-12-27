/// <reference path='vector.ts'/>
/// <reference path='multisprites.ts'/>
/// <reference path='sound.ts'/>

class Hero extends MultiSprites implements Speaking {
    public yeah : Sound;
    public laser_left : Boolean; 
    constructor(canvas : HTMLCanvasElement,
    context : CanvasRenderingContext2D,
    src : string)
    
    {
        super(canvas,context,src);
        this.speed = 20;
        this.width = 53;
        this.height = 53;
        this.pos = new Vector(this.canvas.width / 2 ,  this.canvas.height - (this.height + 10));
        this.dir = new Vector(1, 0);
        this.laser_left = false;
        this.yeah = new Sound('./sounds/yeah.mp3');
    }

    public drawObject()
    {
        super.drawObject(0, 0);
    }

    public moveRight()
    {
        super.setDirection(1, 0);
        super.move(false);
        this.laser_left = false;   
    }

    public moveLeft()
    {
        super.setDirection(-1, 0);
        super.move(false);
        this.laser_left = true;
    }

   
    public getPos()
    {
        return this.pos;
    }

}