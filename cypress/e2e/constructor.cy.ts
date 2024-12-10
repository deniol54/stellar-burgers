const url = 'https://norma.nomoreparties.space/api';
const ingredient = '[data-cy="643d69a5c3f7b9001cfa0943"]';//Соус фирменный Space Sauce
const constructor_list = '[data-cy="constructor_list"]';
const bun = '[data-cy="643d69a5c3f7b9001cfa093c"]';


beforeEach(() => {
    cy.intercept({
        method: 'GET',
        url: `${url}/ingredients`,
    }, {
        fixture: 'ingredients.json'
    });
    cy.intercept({
        method:'GET',
        url: `${url}/auth/user`,
    }, {
        fixture: 'user.json'
    });
    cy.intercept({
        method:'GET',
        url: `${url}/auth/login`,
    }, {
        fixture: 'user.json'
    });
    cy.viewport(1920,1080);
    cy.visit('/');
    cy.get('#modals').as('modal');
    cy.get(ingredient).as('ingredient');
});


describe('тестирование добавление ингредиента', () => {
  it('обновление счетчика ингредиента', () => {
      cy.get('@ingredient').children('button').click();
      cy.get('@ingredient').find('.counter__num').contains('1');
  });

  it('обновление списка ингридиенов в конструкторе', () => {
    cy.get('@ingredient').children('button').click();
    cy.get(constructor_list).find('.constructor-element__text').contains('Соус фирменный Space Sauce');
  })
}); 

describe('тестирование модальных окон', () => {
    it('открытие модального окна ингредиента', () => {
        cy.get('@modal').should('be.empty');
        cy.get('@ingredient').children('a').click();
        cy.get('@modal').should('be.not.empty');
        cy.get('[data-cy="ingredient_title"]').contains('Соус фирменный Space Sauce');
    });
    it('закрытие модального окна ингредиента по клику на крестик', () => {
        cy.get('@modal').should('be.empty');
        cy.get('@ingredient').children('a').click();
        cy.get('@modal').should('be.not.empty');
        cy.get('@modal').find('button').click();
        cy.get('@modal').should('be.empty');
    });
});

describe('тестирование оформление заказа', () => {
    beforeEach(() => {
        window.localStorage.setItem('refreshToken', 'deniolRefresh');
        cy.setCookie('accessToken', 'deniolAccess');
        cy.getAllLocalStorage().should('be.not.empty');
        cy.getCookie('accessToken').should('be.not.empty');
    });

    afterEach(() => {
        window.localStorage.clear();
        cy.clearAllCookies();
        cy.getAllLocalStorage().should('be.empty');
        cy.getAllCookies().should('be.empty');
    });
  
  
    it('отправка заказа c проверкой корректности ответа', () => {
        cy.get('@ingredient').children('button').click();
        cy.get(bun).children('button').click();
        cy.get('[data-cy="order_button"]').click();
        cy.intercept(
            {
                method:'POST',
                url: `${url}/orders`,
            }, {
            fixture: 'order.json'
          });
        cy.get('@modal').should('be.not.empty');
        cy.get('[data-cy="order_number"]').contains('57755');
        cy.get('@modal').find('button').click();
        cy.get('@modal').should('be.empty');
        cy.get(constructor_list).children('div').contains('Выберите начинку');
    });
  });