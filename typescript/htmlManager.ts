class htmlManager{
    private div : HTMLElement;
    private ajax : XMLHttpRequest;
    private input: HTMLInputElement;
    private sub_btn : HTMLElement;

    constructor(id : string, sub_btn_id : string){
        this.div = document.getElementById(id);
        this.div.style.display = 'none';

        this.ajax = this.initAjax(true); 


        this.sub_btn = document.getElementById(sub_btn_id);
        this.input = document.querySelector('input[name=player]'); 
    }

    public show()
    {
        this.div.style.display = 'block';
        this.div.style.opacity = '1';
    }

    public getFromBack(url : string, callback)
    {
        this.ajax.open("GET", url, true);
        this.ajax.onreadystatechange = () => {
            if (this.ajax.readyState == 4 && this.ajax.status == 200) {
                    let score : object = JSON.parse(this.ajax.responseText);
                    callback(score);
            }
          }
        this.ajax.send();

        // return this.data;
    }

    initAjax(retourn : boolean)
    {
        this.ajax = new XMLHttpRequest();
        if(retourn){
            return this.ajax;
        }
    }

    Nice()
    {
        document.querySelector('label').style.display = 'none';
        this.input.style.cssText = "display: none; opacity: 0";
        this.sub_btn.style.cssText = "display: none; opacity: 0";
        let nice : HTMLElement = document.createElement('p')
        nice.style.color = 'green';
        let text : Text = document.createTextNode("Your score has been saved correctly ;)"); 
        nice.append(text);
        this.div.append(nice);
        setTimeout(() => { location.reload(); }, 1500);
    }

    Error()
    {
        let error : HTMLElement = document.createElement('p')
        error.style.color = 'red';
        let text : Text = document.createTextNode("Sorry, but there is a problem and your score can't be saved :("); 
        error.append(text);
        this.div.append(error);
        document.querySelector('.replay-btn').classList.remove('hide-btn');
    }

    getInput(){return this.input;}
    getSub(){return this.sub_btn;}
    getAjax(){return this.ajax;}
    getDiv(){return this.div;}

}