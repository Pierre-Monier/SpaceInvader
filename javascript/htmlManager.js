var htmlManager = /** @class */ (function () {
    function htmlManager(id, sub_btn_id) {
        this.div = document.getElementById(id);
        this.div.style.display = 'none';
        this.ajax = this.initAjax(true);
        this.sub_btn = document.getElementById(sub_btn_id);
        this.input = document.querySelector('input[name=player]');
    }
    htmlManager.prototype.show = function () {
        this.div.style.display = 'block';
        this.div.style.opacity = '1';
    };
    htmlManager.prototype.getFromBack = function (url, callback) {
        var _this = this;
        this.ajax.open("GET", url, true);
        this.ajax.onreadystatechange = function () {
            if (_this.ajax.readyState == 4 && _this.ajax.status == 200) {
                var score = JSON.parse(_this.ajax.responseText);
                callback(score);
            }
        };
        this.ajax.send();
        // return this.data;
    };
    htmlManager.prototype.initAjax = function (retourn) {
        this.ajax = new XMLHttpRequest();
        if (retourn) {
            return this.ajax;
        }
    };
    htmlManager.prototype.Nice = function () {
        document.querySelector('label').style.display = 'none';
        this.input.style.cssText = "display: none; opacity: 0";
        this.sub_btn.style.cssText = "display: none; opacity: 0";
        var nice = document.createElement('p');
        nice.style.color = 'green';
        var text = document.createTextNode("Your score has been saved correctly ;)");
        nice.append(text);
        this.div.append(nice);
        // setTimeout(() => { location.reload(); }, 3000);
    };
    htmlManager.prototype.Error = function () {
        var error = document.createElement('p');
        error.style.color = 'red';
        var text = document.createTextNode("Sorry, but there is a problem and your score can't be saved :(");
        error.append(text);
        this.div.append(error);
        document.querySelector('.replay-btn').classList.remove('hide-btn');
    };
    htmlManager.prototype.getInput = function () { return this.input; };
    htmlManager.prototype.getSub = function () { return this.sub_btn; };
    htmlManager.prototype.getAjax = function () { return this.ajax; };
    htmlManager.prototype.getDiv = function () { return this.div; };
    return htmlManager;
}());
