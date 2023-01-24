import './_card.sass';
import {getSVGCar, flag} from '../../modules/untils';
import { removeCar } from '../../modules/index';
import Garage from '../GaragePage/index';

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
        const cardControls = document.createElement('div');
        const model = document.createElement('span');
        const track = document.createElement('div');

        model.classList.add('card__model');
        model.textContent = this.data.name;
        cardControls.classList.add('card__control');
        cardControls.append(this.createSelectBtn(), this.createRemoveBtn(), model);

        track.classList.add('card__track');
        track.innerHTML = `
            <button class="card__btn btn">A</button>
            <button class="card__btn btn">B</button>
            <div class="card__race">
                ${getSVGCar(this.data.color)}
                ${flag}
            </div>
        `;
        cardBox.classList.add('card');
        cardBox.append(cardControls, track);
        return cardBox;
    }
    createSelectBtn(){
        const btn = document.createElement('button');

        btn.classList.add('card__btn', 'btn');
        btn.dataset.id = `${this.data.id}`;
        btn.textContent = 'Select';
        btn.addEventListener('click', (event) => {
            const id = (event.currentTarget as HTMLButtonElement).dataset.id;
            Garage.updatedCar(Number(id));
        })

        return btn;
    }
    createRemoveBtn(){
        const btn = document.createElement('button');

        btn.classList.add('card__btn', 'btn');
        btn.textContent = 'Remove';
        btn.addEventListener('click', async () => {
            removeCar(this.data.id, '/garage/').then(() => {
                Garage.renderCards();
            });
            removeCar(this.data.id, '/winners/').then(() => {
                Garage.renderCards();
            });
        });

        return btn;
    }
}

export default Card;