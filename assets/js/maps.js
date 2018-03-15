var tinydefence = tinydefence || {};


tinydefence.maps = [
    {
        key: 'level1',
        data: 'assets/maps/map1.json',
        name: 'Level 1',
        start: {x: 0, y: 1},
        end: {x: 16, y: 14},
        waves: [
            {dropInMillis: 1500, maxEnemies: 1,  enemyHealth: 10, enemySpeed: 10, points: 5},
            {dropInMillis: 1500, maxEnemies: 2,  enemyHealth: 50, enemySpeed: 20, points: 5},
            {dropInMillis: 2000, maxEnemies: 5,  enemyHealth: 50, enemySpeed: 20, points: 5},
            {dropInMillis: 1500, maxEnemies: 2,  enemyHealth: 50, enemySpeed: 20, points: 5},
            {dropInMillis: 1000, maxEnemies: 10, enemyHealth: 50, enemySpeed: 20, points: 5},
            {dropInMillis: 1000, maxEnemies: 15, enemyHealth: 30, enemySpeed: 50, points: 5},
            {dropInMillis: 800,  maxEnemies: 20, enemyHealth: 60, enemySpeed: 20, points: 5},
        ]
    },

    // {
    //     name: 'Level 2',
    //     // Currently only straight lines are supported 
    //     waypoints: [[,], [,], [,]],
    //     waves: [
    //         // enemyDropTimeInMillis, maxEnemies, enemyHealthOffset, enemySpeedOffset, pointOffset
    //         [],
    //     ]
    // },
];