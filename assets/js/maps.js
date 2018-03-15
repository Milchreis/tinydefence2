var tinydefence = tinydefence || {};


tinydefence.maps = [
    {
        // Key for this map
        key: 'level1',
        // Path to map data
        data: 'assets/maps/map1.json',
        // Readable name for this map/level
        name: 'Level 1',
        // Start point for the enemies
        start: {x: 0, y: 1},
        // End point for the enemies
        end: {x: 16, y: 14},
        // Waves
        waves: [
            {dropInMillis: 1500, maxEnemies: 2,  enemyHealth: 10, enemySpeed: 10, points: 5},
            {dropInMillis: 1500, maxEnemies: 4,  enemyHealth: 20, enemySpeed: 20, points: 5},
            {dropInMillis: 2000, maxEnemies: 6,  enemyHealth: 20, enemySpeed: 30, points: 5},
            {dropInMillis: 1500, maxEnemies: 8,  enemyHealth: 20, enemySpeed: 30, points: 5},
            {dropInMillis: 1000, maxEnemies: 10, enemyHealth: 20, enemySpeed: 30, points: 5},
            {dropInMillis: 1000, maxEnemies: 15, enemyHealth: 20, enemySpeed: 30, points: 5},
            {dropInMillis: 800,  maxEnemies: 20, enemyHealth: 20, enemySpeed: 30, points: 5},
            // Add more waves here
        ]
    },
    // Add more maps here
];