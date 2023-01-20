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
    
        this.btnWinners.classList.add('header__btn');
        this.btnWinners.textContent = 'To Winners';
    
        this.header.classList.add('header');
        this.header.append(this.btnGarage, this.btnWinners)
    
        this.contentBox.classList.add('pages');
        if (this.body !== null) {
            this.body.append(this.header, this.contentBox);
        }
    }
}

export default MainPage;