/// <reference path='sound.ts'/>
/// <reference path='monster.ts'/>
/// <reference path='laser.ts'/>

class Invaders {
    public tab: Array<Monster>;
    public canvas : HTMLCanvasElement;
    private i_tmp: number;
    private change_dir : boolean;
    private is_right : boolean;
    private Apos_y_tmp : number;
    private Bpos_y_tmp : number;
    private berger : number;
    constructor(deca: number, j: number, nb_m: number, canvas: HTMLCanvasElement, speed : number)
    {
        this.canvas = canvas;
        this.berger = 0;
        this.change_dir = false;
        this.tab = [];
        this.i_tmp = deca;
        for (let i: number = 0; i < nb_m; i++) {
            let monstre: Monster = new Monster(canvas, canvas.getContext('2d'), "./images/monstre.png", this.i_tmp, j, speed);
            this.i_tmp++;
            if (canvas.width / monstre.getWidth() - deca < this.i_tmp) {
                this.i_tmp = deca;
                j++;
            }
            this.tab.push(monstre);
        }
    }

    public shoot()
    {
        let rand = Math.floor((Math.random() * this.tab.length) + 1);
        let monster_pos = this.tab[rand].getPos();
        let evil_laser : Laser = new Laser(this.canvas, this.canvas.getContext('2d'), './images/laser.png', monster_pos.getX() + (this.tab[rand].getWidth()/2), monster_pos.getY(), true)
        return evil_laser; 
    }

    public move(tmp_monstres : Array<Monster>)
    {
        // ?
        let current_pos_y : number;
        // use to get the moment on impact
        let old_dir : number;
        let new_dir : number;
        // use to change the dir
        for(let i : number = 0; i< this.tab.length; i++){
            old_dir = this.tab[i].getDir().getX();
            this.tab[i].move(true);
            new_dir = this.tab[i].getDir().getX();

            if(old_dir != new_dir){
                current_pos_y = this.tab[i].getPos().getY();
                if(this.change_dir == false){
                    this.Apos_y_tmp = current_pos_y;
                    this.Bpos_y_tmp = this.Apos_y_tmp +32
                }                
                this.change_dir = true;
                if(new_dir == -1){
                    this.is_right = false
                }else{
                    this.is_right = true;
                }
            }

            if(this.tab[i].getTo_delete() == false){
                tmp_monstres.push(this.tab[i]);
            }  
            
            
        }
        for(let x : number = 0; x< this.tab.length; x++){

            if(this.change_dir == true){
                this.tab[x].getDir().setValues(0,1); 
                if(this.tab[x].getPos().getY() >= this.Bpos_y_tmp + (this.tab[x].getHpos() * 32)){
                    if(this.is_right == false){
                        this.tab[x].getDir().setValues(-1,0);
                        this.berger++    
                    }else{
                        this.tab[x].getDir().setValues(1,0);
                        this.berger++
                    }
                }
                if(this.berger == this.tab.length){
                    this.berger = 0;
                    this.change_dir = false;
                }              
            }
        }
        
    }
}
