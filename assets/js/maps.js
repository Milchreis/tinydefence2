var tinydefence = tinydefence || {};


tinydefence.maps = [
    
    {
        // Key for this map
        key: 'train',
        // Path to map data
        data: 'assets/maps/Train/map.json',
        // Path to map sprite
        sprite: 'assets/maps/Train/map.png',
        // Readable name for this map/level
        name: 'Train',
        // Start point for the enemies
        start: {x: 8, y: 2},
        // End point for the enemies
        end: {x: 1, y: 13},
        // Waves
        waves: [
            {dropInMillis: 1500, maxEnemies: 2,  enemyHealth: 10, enemySpeed: 10, points: 5, type: 'enemy'},
            {dropInMillis: 1500, maxEnemies: 4,  enemyHealth: 20, enemySpeed: 20, points: 5, type: 'enemy'},
            {dropInMillis: 2000, maxEnemies: 6,  enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            {dropInMillis: 1500, maxEnemies: 8,  enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            {dropInMillis: 1000, maxEnemies: 10, enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            {dropInMillis: 1000, maxEnemies: 15, enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            {dropInMillis: 800,  maxEnemies: 20, enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            // Add more waves here
        ]
    },
    {
        // Key for this map
        key: 'level1',
        // Path to map data
        data: 'assets/maps/Level1/map.json',
        // Path to map sprite
        sprite: 'assets/maps/Level1/map.png',
        // Readable name for this map/level
        name: 'Level 1',
        // Start point for the enemies
        start: {x: 0, y: 1},
        // End point for the enemies
        end: {x: 16, y: 14},
        // Waves
        waves: [
            {dropInMillis: 1500, maxEnemies: 2,  enemyHealth: 10, enemySpeed: 10, points: 5, type: 'enemy'},
            {dropInMillis: 1500, maxEnemies: 4,  enemyHealth: 20, enemySpeed: 20, points: 5, type: 'enemy'},
            {dropInMillis: 2000, maxEnemies: 6,  enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            {dropInMillis: 1500, maxEnemies: 8,  enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            {dropInMillis: 1000, maxEnemies: 10, enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            {dropInMillis: 1000, maxEnemies: 15, enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            {dropInMillis: 800,  maxEnemies: 20, enemyHealth: 20, enemySpeed: 30, points: 5, type: 'enemy'},
            // Add more waves here
        ]
    },
    {
        // Key for this map
        key: 'BeachDefense',
        // Path to map data
        data: 'assets/maps/BeachDefense/map.json',
        // Path to map sprite
        sprite: 'assets/maps/BeachDefense/map.png',
        // Readable name for this map/level
        name: 'Beach Defense',
        // Start point for the enemies
        start: {x: 1, y: 10},
        // End point for the enemies
        end: {x: 28, y: 10},
        // Waves
        waves: [
            {dropInMillis: 1500, maxEnemies: 2,  enemyHealth: 10, enemySpeed: 10, points: 5, type: 'crab'},
            {dropInMillis: 1500, maxEnemies: 4,  enemyHealth: 15, enemySpeed: 20, points: 5, type: 'crab'},
            {dropInMillis: 2000, maxEnemies: 6,  enemyHealth: 15, enemySpeed: 30, points: 5, type: 'crab'},
            {dropInMillis: 1500, maxEnemies: 10,  enemyHealth: 15, enemySpeed: 30, points: 5, type: 'crab'},
            {dropInMillis: 1000, maxEnemies: 10, enemyHealth: 15, enemySpeed: 30, points: 5, type: 'crab'},
            {dropInMillis: 1000, maxEnemies: 14, enemyHealth: 20, enemySpeed: 30, points: 5, type: 'crab'},
            {dropInMillis: 800,  maxEnemies: 18, enemyHealth: 20, enemySpeed: 30, points: 5, type: 'crab'},
            // Add more waves here
        ]
    },
];