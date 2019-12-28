class htmlManager{
    private div : HTMLElement;
    private ajax : XMLHttpRequest;

    constructor(id : string){
        this.div = document.getElementById(id);
        this.div.style.display = 'none';
    }

    public show()
    {
        this.div.style.display = 'block';
        this.div.style.opacity = '1';
        console.log('in');
    }
}