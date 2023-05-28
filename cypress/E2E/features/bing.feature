Feature: Bing Test Suite
    This feature file will validate title of home page and search functionality

    Background: setupblock
        Given User is on Bing home page

    Scenario: Search Validation
        It will validate the search functionality

        When User clicks on Search bar
        And user searches as "cypress"
        And click on search icon
        Then Search result should be displayed

    Scenario: display the Search results
        It will validate the search results
    
        Then dispaly the no. of search results


    