import './_card.sass';
import {getSVGCar, flag} from '../../modules/untils';

type dataCar = {
    name: string,
    id: number,
    color: string
}
class Card {
    data: dataCar;
    constructor(data: dataCar){
        this.data = data;
    }
    createCard() {
        const cardBox = document.createElement('div');

        cardBox.classList.add('card');
        cardBox.innerHTML = `
        <div class="card__control">
            <button class="card__btn btn">Select</button>
            <button class="card__btn btn">Remove</button>
            <span class="card__model">${this.data.name}</span>
        </div>
        <div class="card__track">
            <button class="card__btn btn">A</button>
            <button class="card__btn btn">B</button>
            <div class="card__race">
                ${getSVGCar(this.data.color)}
                ${flag}
            </div>
        </div>
        `
        return cardBox;
    }
}

export default Card;