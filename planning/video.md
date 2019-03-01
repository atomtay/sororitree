# Video plan
[Link to video](https://youtu.be/fnMTDSBUOHw)
* A description and demo of your app
    * Create Alison and Annabelle Sister records
    * Delete Alison to show relationship between Morgan and me
    * View sisters by last name versus by family
* A code sample explaining one thing you're proud of
    * /controllers/sister.js > delete
    * Nested queries to go up and update the linked list
    * Show model: Sisters have references to other Sisters
    * Start by saving the ID of the deleted sister
    * Set the deleted sister's Big's Little to equal to deleted sister's Little (if there)
    * Find the deleted sister's old Little and set her Big to be the deleted sister's Big
    * Finally, find the deleted sister's Family and remove her ObjectId from the members array
* One thing you would do differently next time
    * Spend more time reading the documentation first
    * Main example: MongoDB tree structure (https://docs.mongodb.com/manual/applications/data-models-tree-structures/)
    * I may have been able to set up my Sister hierarchy in its final form if I spent longer learning this structure
    * I avoided it because I wanted to jump straight into coding; oops
* The next feature you would like to implement
    * Further logic constraining the Sister/Family relationship
    * When creating a new Sister, be able to create a matriarch with no Big
    * When selecting a Family for a new Sister, only populate the potential Bigs within that Family
    * DELETE a Family iff all associated Sisters are deleted