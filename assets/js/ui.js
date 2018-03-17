class UI {
    constructor(game) {
        this.game = game;
        console.log("Created UI");

        this.currentWave = 0;
        this.maxWave = 0;
        this.money = 0;
        this.price = 0;
        this.lives = 0;

        this.waveText = this.game.add.bitmapText(
            4, this.game.height - 16,
            'font1', 
            "",
            16);
        this.moneyText = this.game.add.bitmapText(
            this.game.width / 3, this.game.height - 16,
            'font1', 
            "",
            16);
        this.upgradePriceText = this.game.add.bitmapText(
            this.game.width / 3, this.game.height - 16,
            'font1', 
            "",
            16);
        this.liveText = this.game.add.bitmapText(
            this.game.width / 3 * 2, this.game.height - 16,
            'font1', 
            "",
            16);
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
        this.moneyText.setText(`$: ${this.money} ${this.price}`);
    }

    setPrice(price) {
        this.price = price;
        this.moneyText.setText(`$: ${this.money} ${this.price}`);
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