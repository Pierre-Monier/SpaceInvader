/// <reference path='animatedobject.ts'/>
/// <reference path='sound.ts'/>
class Monster extends AnimatedObject  {
    public death_sound : Sound;
    private horizontal_pos : number;
    private x_sprite : number;
    private y_sprite : number;

    constructor(canvas : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        src : string, i_tmp : number, j : number, speed : number)
    {
        super(canvas,context,src);
        this.horizontal_pos = j;
        this.speed = speed;
        this.width = 30;
        this.height = 32;

        this.pos = new Vector(i_tmp * this.width, j * this.height);
        
        this.dir = new Vector(1, 0);
        this.death_sound = new Sound('./sounds/explosion.wav');
        this.x_sprite = 0;
        this.y_sprite = 0;

    }
    public move(update_dir : boolean)
    {
        super.move(update_dir);
    }

    public drawObject(x : number, y : number)
    {
        super.drawObject(x, y);
    }

    public getRandomInt(min : number, max : number) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    public getRandomDir()
    {
    let random : number = Math.round(Math.random());
            if(random == 0){
                return -1;
            }else{
                return 1;
            }
    }
    getHpos()
    {
        return this.horizontal_pos;
    }
    getXsprite()
    {
        return this.x_sprite;
    }
    setXsprite(x : number)
    {
        this.x_sprite = x;
    }

}