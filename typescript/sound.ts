interface Speaking {
    // A decommenter en temps voulu
    // soundtrack : Sound;
    // playSound();
}

class Sound {
    private son : HTMLAudioElement;

    constructor(src : string) {
        this.son = new Audio(src);
    }
    public playSound() {
        this.son.play();
    }
    public getSon()
    {
        return this.son;
    }
}