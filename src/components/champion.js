/* eslint-disable default-case */
import { names } from './names';
const levelOne = 5;
const levelTwo = 10;
const levelThree = 20;
const levelFour = 30;
const levelFive = 40;
const levelSix = 50;
function importAll(r) {
    return r.keys().map(r);
}

const mapChamp = () => {
    const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
    let champions = [];

    function getLevel(level) {
        champions = [];
        let size;
        switch (level) {
            case 1:
                size = levelOne;
                break;
            case 2:
                size = levelTwo;
                break;
            case 3:
                size = levelThree;
                break;
            case 4:
                size = levelFour;
                break;
            case 5:
                size = levelFive;
                break;
            case 6:
                size = levelSix;
                break;
        }
        for (let i = 0; i < size; i++) {
            const champ = { url: images[i], name: names[i] };
            champions.push(champ);
        }
        return shuffleChampions;
    }
    // for (let i = 0; i < images.length; i++) {
    //     const champ = { url: images[i], name: names[i] };
    //     champions.push(champ);
    // }
    function shuffleChampions() {
        for (let i = champions.length - 1; i > 0; i--) {
            // Generate random number
            let j = Math.floor(Math.random() * (i + 1));

            let temp = champions[i];
            champions[i] = champions[j];
            champions[j] = temp;
        }
        return champions;
    }
    return { getLevel };
}

export default mapChamp;