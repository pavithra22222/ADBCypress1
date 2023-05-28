import LoginPage from "../support/PageClass/LoginPage";
import Money from "../support/PageClass/Money";

const loginVer=new LoginPage()
const money=new Money()

describe('Money',()=>{

    it('Add Account',()=>{

        loginVer.login()
        money.getMoneyTab().click()
        money.clickArrow().click()
        money.getAddAccountBtn().click()
        money.getContinueBtn().click()
        cy.wait(3000)
        // cy.get("iframe.demo-frame").its("0.contentDocument.body").then(childPage=>{
        //     cy.wrap(childPage).find(".ui-spinner-up").click()

        //#plaid-link-iframe-1
        cy.get("iframe").each(($frame, $index, $allframes)=>{
                cy.wrap($frame).title().then(txt=>{
                    cy.log("Frame: " + $index + " = " + txt)
                })
        })

        /*
        cy.get('#unified-runner > div iframe#plaid-link-iframe-1').its("0.contentDocument.body").then(childPage=>{
            cy.wait(3000)
            cy.wrap(childPage).title().then(txt=>{cy.log("iFrame Title = "+ txt)})
            cy.wrap(childPage).contains('Get started').click()
        })*/


        cy.get('iframe').eq(9).its("0.contentDocument.body").then(childPage=>{
            cy.wait(3000)
            cy.wrap(childPage).title().then(txt=>{cy.log("iFrame Title = "+ txt)})
            cy.wrap(childPage).contains('Get started').click()
        })
    })
})