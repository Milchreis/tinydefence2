function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOverButton(x, y, button) {
    return (
        x >= button.x && x <= button.x + button.width &&
        y >= button.y && y <= button.y + button.height
    );
}

function getWaypoints(start, end, tilemap) {
    let waypoints = [];
    let current = start;
    let last = undefined;
    
    waypoints.push([current.x * tilemap.twidth, current.y * tilemap.theight]);

    // while(true) {
    //     // get next positions
    //     let tiles = [];
    //     tiles.push({x: current.x, y: current.y-1, tile: tilemap.getTile(current.x, current.y-1, tilemap.waypointData)});
    //     tiles.push({x: current.x, y: current.y+1, tile: tilemap.getTile(current.x, current.y+1, tilemap.waypointData)});
    //     tiles.push({x: current.x+1, y: current.y, tile: tilemap.getTile(current.x+1, current.y, tilemap.waypointData)});
    //     tiles.push({x: current.x-1, y: current.y, tile: tilemap.getTile(current.x-1, current.y, tilemap.waypointData)});
    //
    //     // keep way tiles
    //     tiles = tiles.filter(obj => obj.tile !== 0);
    //
    //     // remove last position
    //     if(last !== undefined) {
    //         let tiles2 = tiles;
    //         tiles = tiles.filter(obj => !(obj.x === last.x && obj.y === last.y));
    //     }
    //
    //     // Save current position as last position
    //     last = current;
    //
    //     // select next position
    //     if(tiles.length === 0 || (current.x === end.x && current.y === end.y)) {
    //         break;
    //     }
    //     else {
    //         current = tiles[0];
    //         waypoints.push([current.x * tilemap.twidth, current.y * tilemap.theight]);
    //     }
    // }

    return waypoints;
}