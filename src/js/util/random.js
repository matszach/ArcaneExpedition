module.exports = {

    seed(rng) {
        const chars = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
        const seed = rng.choices(chars, 12, false).join('');
        return seed;
    }

}