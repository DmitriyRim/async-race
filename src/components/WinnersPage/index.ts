import './_winner.sass';
import { getData } from '../../modules/index';
import {getSVGCar} from '../../modules/untils';

type win = {
    id: number,
    wins: number,
    time: number,
}
const settings = {
    page: 2,
    limit: 4,
    sort: 'id',
    order: 'ASC',
    getQueryParams(){
        return `/winners/?_page=${this.page}&_limit=${this.limit}&_sort=${this.sort}&_order=${this.order}`;
    }
}
const WinnerPage = {
    settings,
    async render(el: HTMLElement) {
        const data = getData (this.settings.getQueryParams());
        const h2 = document.createElement('h2');
        const pageNumber = document.createElement('p');
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');

        getData('/winners').then(async data => h2.innerText = `Winners(${(await data.json()).length})`);
        pageNumber.classList.add('winners__page-number');
        pageNumber.innerText = `Page #${this.settings.page}`;
        table.classList.add('winners');
        table.innerHTML = `
        <thead>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time(s)</th>
        </thead>`;
        table.append(tbody);

        data.then(async data => {
            const items: win[] = await data.json();
            items.forEach(item => {
                const car = getData(`/garage/?id=${item.id}`);       
                car.then(async data => {
                    const carData = await data.json();
                    const tr =  `<tr><td>${item.id}</td><td>${getSVGCar(carData[0].color)}</td><td>${carData[0].name}</td><td>${item.wins}</td><td>${item.time}</td></tr>`;
                    tbody.innerHTML += tr;
                });
            })
        });
        el.innerHTML = '';
        el.append(h2, pageNumber, table);
    }
}

export default WinnerPage;