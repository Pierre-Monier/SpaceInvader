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

console.log("Debut - Test de la classe Vector");
let v : Vector = new Vector(5,3);
console.log("vx , vy =", v.getX(),",",v.getY()," (attendu: 5 , 3 )");
v.setValues(12,9);
console.log("vx , vy =", v.getX(),",",v.getY()," (attendu: 12 , 9 )");
v.addToX(1);
console.log("vx =", v.getX()," (attendu: 13 )");
v.addToX(-7);
console.log("vx =", v.getX()," (attendu: 6 )");
v.addToY(11);
console.log("vy =", v.getY()," (attendu: 20 )");
v.addToY(-19);
console.log("vy =", v.getY()," (attendu: 1 )");
console.log("Fin - Test de la classe Vector");


//////////////////