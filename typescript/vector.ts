class Vector {
    private x : number;
    private y : number;
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    constructor(valX : number,
        valY : number)
        {
            this.x = valX;
            this.y = valY;
        }
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    public getX() 
    {
        return this.x;
    } 
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    public getY() 
    {
        return this.y;
    }  
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

    public setX(valX : number) 
    {
        this.x = valX;
    } 
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    public setY(valY : number) 
    {
        this.y = valY;
    }  
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    public setValues(valX : number, valY : number) 
    {
        this.x = valX;
        this.y= valY;
    } 
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    public addToX(valX : number) 
    {
        this.x += valX;
    } 
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    public addToY(valY : number) 
    {
        this.y += valY;
    } 
// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
}


// ZONE de test a decommenter une fois la classe ecrite //
// Une fois tester et fonctionnel, vous pouvez          //
// recommenter le code                                  //
// Pour tester, lancer le fichier index.html sur Chrome //
// et ouvrez la console.                                //

let v : Vector = new Vector(5,3);
v.setValues(12,9);
v.addToX(1);
v.addToX(-7);
v.addToY(11);
v.addToY(-19);


//////////////////