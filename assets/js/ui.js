class UI {
    constructor(game) {
        this.game = game;
        console.log("Created UI");

        this.currentWave = 0;
        this.maxWave = 0;
        this.money = 0;
        this.price = null;
        this.lives = 0;
        this.showCompleteCoverage = false;

        this.waveText = this.game.add.bitmapText(
            4, this.game.height - 32,
            'font1', 
            "",
            32);
        this.moneyText = this.game.add.bitmapText(
            this.game.width / 3, this.game.height - 32,
            'font1', 
            "",
            32);
        this.upgradePriceText = this.game.add.bitmapText(
            this.game.width / 3, this.game.height - 32,
            'font1', 
            "",
            32);
        this.liveText = this.game.add.bitmapText(
            this.game.width / 3 * 2, this.game.height - 32,
            'font1', 
            "",
            32);

        // Toggle button to show the complete coverage by all towers 
        this.buttonCoverage = this.game.add.button(0, 0, 'buttonCoverage', this.onToggleCoverage, this, 0, 0, 0);
        this.buttonCoverage.scale.setTo(tinydefence.scalefactor, tinydefence.scalefactor);
        this.buttonCoverage.x = this.game.width - this.buttonCoverage.width - 5;
        this.buttonCoverage.y = this.game.height - this.buttonCoverage.height - 2;
    }

    onToggleCoverage() {
        console.log("Coverage toggled");
        this.showCompleteCoverage = !this.showCompleteCoverage;
        
        if(this.showCompleteCoverage) {
            this.buttonCoverage.setFrames(1, 1, 1);
        } else {
            this.buttonCoverage.setFrames(0, 0, 0);
        }

    }

    setCurrentWave(wave) {
        this.currentWave = wave;
        this.waveText.setText(`Wave: ${this.currentWave}/${this.maxWave}`);
    }

    setMaxWave(wave) {
        this.maxWave = wave;
        this.waveText.setText(`Wave: ${this.currentWave}/${this.maxWave}`);
    }

    setMoney(money) {
        this.money = money;
        this.moneyText.setText(`$: ${this.money} ${this.price !== null ? ('(' + this.price + ')') : ''}`);
    }

    setPrice(price) {
        this.price = price;
        this.moneyText.setText(`$: ${this.money} ${this.price !== null ? ('(' + this.price + ')') : ''}`);
    }

    setLives(lives) {
        this.lives = lives;
        this.liveText.setText(`Lives: ${this.lives}`);
    }

    setFullText(text) {
        this.clearTexts();
        this.waveText.setText(text);
    }

    // TODO RefreshTexts Methode

    clearTexts()
    {
        this.waveText.setText("");
        this.moneyText.setText("");
        this.upgradePriceText.setText("");
        this.liveText.setText("");
    }
}