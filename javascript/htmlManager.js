var htmlManager = /** @class */ (function () {
    function htmlManager(id) {
        this.div = document.getElementById(id);
        this.div.style.display = 'none';
    }
    htmlManager.prototype.show = function () {
        this.div.style.display = 'block';
        this.div.style.opacity = '1';
        console.log('in');
    };
    return htmlManager;
}());
