class UI {
    constructor(game) {
        this.game = game;
        console.log("Created UI");

        this.currentWave = 0;
        this.maxWave = 0;
        this.money = 0;
        this.price = null;
        this.priceColor = 'white';
        this.lives = 0;

        this.waveText = this.game.add.bitmapText(
            5, this.game.height - 32,
            'font_white', 
            "",
            32);
        this.moneyText = this.game.add.bitmapText(
            this.game.width / 2, this.game.height - 32,
            'font_white', 
            "$: xxx",
            32);
        this.priceText = this.game.add.bitmapText(
            0, this.game.height - 32,
            'font_green', 
            "",
            32);
        this.liveText = this.game.add.bitmapText(
            this.game.width, this.game.height - 32,
            'font_white', 
            "",
            32);

        // Center moneyText only once
        this.moneyText.x = this.game.width / 2 - this.moneyText.textWidth / 2;
    }

    setCurrentWave(wave) {
        this.currentWave = wave;
        this.updateTexts();
    }

    setMaxWave(wave) {
        this.maxWave = wave;
        this.updateTexts();
    }

    setMoney(money) {
        this.money = money;
        this.updateTexts();
    }

    setPrice(price, color) {
        this.price = price;
        if (color === 'green' || color === 'red')
        {
            this.priceColor = color
        }
        else
        {
            this.priceColor = 'white';
        }
        this.updateTexts();
    }

    setLives(lives) {
        this.lives = lives;
        this.updateTexts();
    }

    setFullText(text) {
        this.clearTexts();
        this.waveText.setText(text);
    }

    updateTexts()
    {
        this.waveText.setText(`Wave: ${this.currentWave}/${this.maxWave}`);
        this.moneyText.setText(`$: ${this.money}`);
        this.priceText.font = 'font_' + this.priceColor;
        this.priceText.setText(`${this.price !== null ? ('(' + this.price + ')') : ''}`);
        this.liveText.setText(`Lives: ${this.lives}`);

        // reposition texts
        this.priceText.x = this.moneyText.x + this.moneyText.textWidth + 10;
        this.liveText.x = this.game.width - this.liveText.textWidth - 5;
    }

    clearTexts()
    {
        this.waveText.setText("");
        this.moneyText.setText("");
        this.upgradePriceText.setText("");
        this.liveText.setText("");
    }
}