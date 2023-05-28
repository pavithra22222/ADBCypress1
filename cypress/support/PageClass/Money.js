class Money{
    getMoneyTab(){
        return cy.contains('Money')
    }
    getAddAccountBtn(){
        return cy.get('.sc-iUAfDI > [data-test="Button-ButtonStyled"]')
    }
    getContinueBtn(){
        return cy.contains('Continue')
    }
    getStartedBtn(){
        return cy.contains('Get started')
    }
    clickArrow(){
        return cy.get('[data-test="PaymentMain-WalletWrapper"] > [data-test="Wallet-WalletWrapper"] > [data-testid="card"] > .sc-gwpYQS > [data-test="Button-ButtonStyled"] > [data-test="Container"] > [data-test="Component"]')
    }
}

export default Money