import './_garage.sass';

const Garage = {
    init(elem: HTMLElement) {
        const garageContainer = document.createElement('div');

        garageContainer.classList.add('garage__container');
        garageContainer.innerHTML = 'Cards';

        elem.innerHTML = '';
        elem.append(this.createForm(), garageContainer);
    },
    createForm() {
        const form = document.createElement('form');

        form.classList.add('garage__form');
        form.innerHTML = 'Form controls';
        return form;
    },
    renderCards(el: HTMLElement) {
        el.innerHTML = '';

        el.append();
    }
}

export default Garage;