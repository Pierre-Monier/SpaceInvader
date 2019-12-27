/// <reference path='vector.ts'/>
/// <reference path='multisprites.ts'/>
/// <reference path='animatedobject.ts'/>

class Shield extends AnimatedObject{
    private pdv : number;
    constructor(canvas : HTMLCanvasElement,
        context : CanvasRenderingContext2D,
        src : string, nb_shield : number)
    {
        super(canvas,context,src);
        this.pos = new Vector(((canvas.width/4) * nb_shield) + 50, 300);
        this.width = 44;
        this.height = 32;
        this.pdv = 3;
    }
    hitShield()
    {
        this.pdv--;
        switch(this.pdv) {
            case 1:
              this.img.src = './images/shield2.png'
              break;
            case 2:
              this.img.src = './images/shield1.png'
              // code block
              break;
            case 0:
                this.setTo_delete(true);
              break;
            default:
              // code block
          } 
        if(this.pdv === 0){
            this.setTo_delete(true);
        }
    }    

}
