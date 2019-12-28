/// <reference path='sound.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>
class Boss extends Monster{
    private pdv : number;
    constructor(canvas : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        src : string, i_tmp : number, j : number, speed : number,)
    {
        super(canvas,context,src, i_tmp, j, speed);
        this.width = 60;
        this.height = 64;
        this.pdv = 100;
    }

}
