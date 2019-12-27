/// <reference path='animatedobject.ts'/>
/// <reference path='sound.ts'/>
class Monster extends AnimatedObject  {
    public death_sound : Sound;
    private horizontal_pos : number;

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
    }
    public move(update_dir : Boolean)
    {
        super.move(update_dir = true);
    }
    public drawObject(x : number, y : number)
    {
        super.drawObject(0, 0);
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
    getPos()
    {
        return this.pos
    }
    getWidth()
    {
        return this.width;
    }
    getDir()
    {
        return this.dir;
    }
    getHpos()
    {
        return this.horizontal_pos;
    }

}