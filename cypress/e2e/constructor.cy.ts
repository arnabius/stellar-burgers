/// <reference types="cypress" />

describe('добавление ингредиента из списка в конструктор', function () {
  this.beforeEach(function () {
    // Настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('добавление булок', function () {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun1]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=constructor-bun2]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });
});

// тестируем открытие модального окна ингредиента, закрытие по кнопке
describe('работа модальных окон', function () {
  this.beforeEach(function () {
    // Настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  it('открытие модального окна ингредиента', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    // Проверяем, что в модальном окне именно тот ингредиент
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
  });

  it('закрытие по клику на крестик', function () {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    // Проверяем, что окно закрылось
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

// Тестирование оформления заказа
describe('Тестирование оформления заказа', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'ingredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    // Подставляем моковые токены, иначе неавторизованному пользователю не даст заказать бургер
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshToken-test')
    );
    cy.setCookie('accessToken', 'accessToken-test');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });

  // очищаем после выполнения теста
  this.afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Тестирование оформления заказа, закрытия модального окна заказа, очистки конструктора ', function () {
    // собираем бургер
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-submit]').click();

    // Проверяем, что модальное окно показало номер заказа
    cy.get('[data-cy=order-number]').contains('123456').should('exist');

    // закрываем окно и проверяем, что оно закрылось
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get('[data-cy=constructor-bun1]')
      //.contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get('[data-cy=constructor-ingredient]')
      //.contains('Биокотлета из марсианской Магнолии')
      .should('not.exist');
    cy.get('[data-cy=constructor-ingredient]')
      //.contains('Соус Spicy-X')
      .should('not.exist');
    cy.get('[data-cy=constructor-bun2]')
      //.contains('Краторная булка N-200i')
      .should('not.exist');
  });
});
