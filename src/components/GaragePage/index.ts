import { addCar, getData } from '../../modules/index';
import Card from '../Card/index';
import './_garage.sass';

const settings = {
    limit: 5,
    page: 1,
}
const Garage = {
    settings,
    garageContainer: document.createElement('div'),
    h2: document.createElement('h1'),
    page: document.createElement('p'),
    init(elem: HTMLElement) {
        this.garageContainer.classList.add('garage__container');
        this.garageContainer.innerHTML = 'Cards';

        elem.innerHTML = '';
        elem.append(this.createForm(), this.garageContainer);
        this.renderCards();
    },
    createForm() {
        const controlsBlock = document.createElement('div');

        controlsBlock.classList.add('controls');
        controlsBlock.append(
            this.createFormElement( addCar, 'Create'),
            //this.createFormElement( addCar, 'Updete'),
        );
        return controlsBlock;
    },
    renderCards() {
        const data = getData(`/garage`);
        const items = getData(`/garage?_page=${this.settings.page}&_limit=${this.settings.limit}`);

        this.h2.classList.add('title');
        this.page.innerText = `Page #${this.settings.page}`;
        data.then(async data => this.h2.innerText = `Garage(${(await data.json()).length})`);
        items.then(async data => {
            const elems: {
                name: string,
                id: number,
                color: string
            }[] = await data.json();
            const arr = elems.map(item => {
                const card = new Card(item);
                return card.createCard();
            });
            this.garageContainer.innerHTML = '';
            this.garageContainer.append(this.h2, this.page, ...arr);
        })
    },
    createFormElement(fun: { (data: { name: string; color: string; }): Promise<Response>; (arg0: { name: string; color: string; }): Promise<any>; }, btnText: string): HTMLElement{
        const addedContainer = document.createElement('div');
        const input = document.createElement('input');
        const colorInput = document.createElement('input');
        const submit = document.createElement('button');

        input.type = 'text';
        input.placeholder = 'Car brand...';

        colorInput.type = 'color';
        colorInput.value = '#ffffff';

        submit.classList.add('controls__btn', 'btn');
        submit.innerText = btnText;
        submit.addEventListener('click', () => {
            if(input.value){
                fun({name: `${input.value}`,color: `${colorInput.value}`})
                .then(() => {
                    this.renderCards();
                    input.value = '';
                    colorInput.value = '#ffffff';
                });

            } 
        });

        addedContainer.classList.add('controls__elem');
        addedContainer.append(input, colorInput, submit);
        return addedContainer;
    }
}

export default Garage;