![alt logo](https://raw.githubusercontent.com/Milchreis/tinydefence2/master/assets/images/logo.png)

After approximately 5 years I want to create a more modern version of my first [TinyDefence](https://github.com/Milchreis/TinyDefence) game. Here is the result of my little hackathon.
TinyDefence 2 is a simple implementation of the tower defence principe (build towers to fight against the incoming enemies). Now it's build with the [phaser game engine](http://phaser.io/), which I also used for my platformer game [I Hate Zombies](https://github.com/Milchreis/I-Hate-Zombies). The game is hosted on github and is ready to play.

![alt screenshot](https://raw.githubusercontent.com/Milchreis/tinydefence2/master/assets/images/screenshot.png)

**[Play it here](https://milchreis.github.io/tinydefence2/index.html)**

## Improvements over TinyDefence 1
 - playable in modern browser
 - sprites and animations
 - maps are creatable with `Tiled`
 - automatic way detection

## Create your own level
You want to change the waves to make the game more difficult or easy? Than open up the file `assets/js/maps.js`. There is each wave for the first map defined.

If you want to create a complete new map than install the map editor `Tiled` and create a copy of `assets/maps/map.tmx`. With Tiled you can open up your copy and create your own map. After that export your map as JSON file next to your copy and intergate it into the `assets/js/maps.js`. 

Share your map with other people and start a pull request.
