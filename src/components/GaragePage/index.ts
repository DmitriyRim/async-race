import { addCar, getData, updateCar } from '../../modules/index';
import { randomColor, randomName } from '../../modules/untils';
import Card from '../Card/index';
import './_garage.sass';

const settings = {
    limit: 7,
    page: 1,
}

const Garage = {
    settings,
    garageContainer: document.createElement('div'),
    h2: document.createElement('h1'),
    page: document.createElement('p'),
    updatedCarId: 0,
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
            this.createFormElement( addCar, 'create', false),
            this.createFormElement( updateCar, 'updete', true),
            this.createGeneralBlock()
        );
        return controlsBlock;
    },
    renderCards() {
        const data = getData(`/garage`);
        const items = getData(`/garage?_page=${this.settings.page}&_limit=${this.settings.limit}`);
        const paginationBox = document.createElement('div');
        const prevBtn = this.createBtn('Prev', 'btn');
        const nextBtn = this.createBtn('Next', 'btn');

        this.h2.classList.add('title');
        this.page.innerText = `Page #${this.settings.page}`;
        data.then(async data => {
            const elems = (await data.json()).length;
            this.h2.innerText = `Garage(${elems})`;
            prevBtn.addEventListener('click', () => {
                if (this.settings.page > 1) {
                    this.settings.page--;
                    this.renderCards();
                } 
            });
            nextBtn.addEventListener('click', () => {
                if (this.settings.page <= Math.floor(elems / this.settings.limit)) {
                    this.settings.page++;
                    this.renderCards();
                } 
            });
            paginationBox.append(prevBtn, nextBtn);
        });
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

            this.garageContainer.append(this.h2, this.page, ...arr, paginationBox);
        })
    },
    createFormElement(fun: {(id: number , data: { name: string; color: string; }): Promise<Response> }, btnText: string, state: boolean){
        const addedContainer = document.createElement('div');
        const input = document.createElement('input');
        const colorInput = document.createElement('input');
        const submit = document.createElement('input');

        input.type = 'text';
        input.placeholder = 'Car brand...';
        input.disabled = state;

        colorInput.type = 'color';
        colorInput.value = '#ffffff';
        colorInput.disabled = state;

        submit.classList.add('controls__btn', 'btn');
        submit.type = 'submit';
        submit.innerText = btnText;
        submit.disabled = state;
        if(btnText === 'create'){
            submit.addEventListener('click', () => {
                if(input.value){
                    fun(this.updatedCarId, {name: `${input.value}`,color: `${colorInput.value}`})
                    .then(() => {
                        this.renderCards();
                        input.value = '';
                        colorInput.value = '#ffffff';
                    });
                } 
            });
        } 
        if(btnText === 'updete'){
            submit.addEventListener('click', () => {
                if(input.value){
                    fun(this.updatedCarId, {name: `${input.value}`,color: `${colorInput.value}`})
                    .then(() => {
                        this.renderCards();
                        input.value = '';
                        colorInput.value = '#ffffff';
                        this.disabledFormUpdate();
                    });
                } 
            });
        } 

        addedContainer.classList.add('controls__elem', `controls__${btnText}`);
        addedContainer.append(input, colorInput, submit);
        return addedContainer;
    },
    createGeneralBlock() {
        const generalBlock = document.createElement('div');

        generalBlock.classList.add('controls__elem');
        generalBlock.append(
            //this.createElement('btn', 'Race', console.log),
            //this.createElement('btn', 'Reset', console.log),
            this.createElement('btn', 'Generate cars', this.generateRandomCars));
        return generalBlock;
    },
    createElement(cl: string, value: string, fun: { (): void; }) {
        const btn = document.createElement('button');
        btn.classList.add(cl);
        btn.textContent = value;
        btn.addEventListener('click', fun);
        return btn;
    },
    updatedCar(id: number) {
        const elems = document.querySelectorAll('.controls__updete > *');
        this.updatedCarId = id;
        elems.forEach(item => (item as HTMLInputElement).disabled = false);
    },
    disabledFormUpdate() {
        const elems = document.querySelectorAll('.controls__updete > *');
        this.updatedCarId = 0;
        elems.forEach(item => (item as HTMLInputElement).disabled = true);
    },
    generateRandomCars(){
        let a = addCar(1, {color: randomColor(), name: randomName()});
        for (let i = 0; i < 99; i++){
            a.then(() => {
                a = addCar(1, {color: randomColor(), name: randomName()});
            })
        }
        a.then(() => Garage.renderCards())
    },
    createBtn(str: string, cl: string){
        const btn = document.createElement('button');

        btn.classList.add(cl);
        btn.textContent = str;
        return btn;
    }
}

export default Garage;