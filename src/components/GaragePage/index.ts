import { getData } from '../../modules/index';
import Card from '../Card/index';
import './_garage.sass';

const settings = {
    limit: 5,
    page: 1,
}
const Garage = {
    settings,
    init(elem: HTMLElement) {
        const garageContainer = document.createElement('div');

        garageContainer.classList.add('garage__container');
        garageContainer.innerHTML = 'Cards';

        elem.innerHTML = '';
        elem.append(this.createForm(), garageContainer);
        this.renderCards(garageContainer);
    },
    createForm() {
        const form = document.createElement('form');

        form.classList.add('garage__form');
        form.innerHTML = 'Form controls';
        return form;
    },
    async renderCards(el: HTMLElement) {
        const h2 = document.createElement('h1');
        const page = document.createElement('p');
        const data = getData(`/garage`);
        const items = getData(`/garage?_page=${this.settings.page}&_limit=${this.settings.limit}`);

        h2.classList.add('title');
        page.innerText = `Page #${this.settings.page}`;
        data.then(async data => h2.innerText = `Garage(${(await data.json()).length})`);
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
            el.innerHTML = '';
            el.append(h2, page, ...arr);
        })
    }
}

export default Garage;