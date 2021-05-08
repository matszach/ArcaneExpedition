module.exports = {

    seed(rng) {
        const chars = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
        const seed = rng.choices(chars, 12, false).join('');
        return seed;
    },

    spacedOutPoints(rng, xMin, yMin, xMax, yMax, nofPoints, minRange) {
        const points = [];
        while(points.length < nofPoints) {
            const nx = rng.int(xMin, xMax);
            const ny = rng.int(yMin, yMax);
            let matching = true;
            for(let [ex, ey] of points) {
                if(Math.sqrt((ex - nx)**2 + (ey - ny)**2) < minRange) {
                    matching = false;
                    break;
                }
            }
            if(matching) {
                points.push([nx, ny])
            }
        }   
        return points;
    }

}