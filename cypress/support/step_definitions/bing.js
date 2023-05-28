import { Given,When,Then, Before, After } from "@badeball/cypress-cucumber-preprocessor"


// Before(()=>{
//     cy.log("Before Hook....")
// })

// After(()=>{
//     cy.log("After Hook....")
// })

Given("User is on Bing home page",()=>{
    cy.visit('https://www.bing.com')
    cy.wait(3000)
})

When("User clicks on Search bar",()=>{
    cy.get("#sb_form_q").click()
})

When("user searches as {string}",(searches)=>{
    cy.get("#sb_form_q").type(searches, { delay: 1000 })
    cy.wait(2000)
})

When("click on search icon",()=>{
    cy.get("#search_icon").click()
})

Then("Search result should be displayed",()=>{
    cy.get
})