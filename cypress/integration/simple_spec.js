describe('Cypress', function () {
  it('successfully visits the home page', function () {
    cy.visit('/');
  });
});

describe('Page Elements', function () {
  before(function () {
    cy.visit('/');
  });

  it('has a headline', function () {
    cy.get('h1')
      .should('be.visible')
      .should('have.text', 'Markdown Preview')
  });

  it('has a source text field', function () {
    cy.get('textarea#source')
      .should('be.visible');
  });

  it('has a preview area', function () {
    cy.get('div#preview')
      .should('be.visible');
  });

  it('has a "render" button', function () {
    cy.get('button#render')
      .should('be.visible');
  });
});

describe('The Render button', function () {
  it('converts markdown to some kind of text', function () {
    cy.get('textarea#source').type('# Hello');
    cy.get('button').click();
    cy.get('div#preview').should('be.visible');
    cy.get('div#preview').then((el) => {
      assert.include(el.text().trim(), 'Hello');
    });
    console.log(cy.get('div#preview'));
  });

  it('converts markdown to html', function () {
    cy.get('textarea#source').clear();
    cy.get('textarea#source').type('# Hello\n* bullet');
    cy.get('button').click();
    cy.get('div#preview').within(($div) => {
      cy.get('h1').should('have.text', 'Hello');
      cy.get('li').should('have.text', 'bullet');
    });
  });
});

describe('Automatic Rendering', function() {
  
  beforeEach(()=>{
    cy.get('textarea#source').clear();
    cy.get('div#preview').invoke('empty'); // https://api.jquery.com/empty/
  });

  it('happens eventually', function() {
    
    // would be this if synchronous:
    // cy.get('div#preview h1').should.not.have.text('Hello');
    // but it's really this:
    cy.get('div#preview h1').should('not.have.text', 'Hello');

    cy.get('textarea#source').type('# Hello\n* bullet');

    cy.get('div#preview h1').should('have.text', 'Hello');
    cy.get('div#preview li').should('have.text', 'bullet');
  });
});
