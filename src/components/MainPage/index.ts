import Garage from '../GaragePage/index';
import WinnerPage from '../WinnersPage/index';
import './_main-page.sass';

const MainPage = {
    body: document.querySelector('body'),
    btnGarage: document.createElement('button'),
    btnWinners: document.createElement('button'),
    header: document.createElement('header'),
    contentBox: document.createElement('div'),

    renderMainPage(){
        this.btnGarage.classList.add('header__btn');
        this.btnGarage.textContent = 'To Garage';
        this.btnGarage.addEventListener('click', () => Garage.init(this.contentBox));
    
        this.btnWinners.classList.add('header__btn');
        this.btnWinners.textContent = 'To Winners';
        this.btnWinners.addEventListener('click', () => WinnerPage.render(this.contentBox));
    
        this.header.classList.add('header');
        this.header.append(this.btnGarage, this.btnWinners)
    
        this.contentBox.classList.add('pages');
        if (this.body !== null) {
            this.body.append(this.header, this.contentBox);
        }
        Garage.init(this.contentBox);
    }
}

export default MainPage;