/// <reference path='vector.ts'/>
/// <reference path='animatedobject.ts'/>

class MultiSprites extends AnimatedObject
{
    
    public _sprite_pos : Vector;

    constructor(canvas : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        src : string)
    {
        super(canvas,context,src);
        this._sprite_pos = null;
    }
    public  setSpritePosition(x : number, y : number)
    {
        let pos : Vector = new Vector(x,y);
        this._sprite_pos = pos;
    }
    public  drawObject(x : number, y : number)
    {
       super.drawObject(x, y);
    }
}