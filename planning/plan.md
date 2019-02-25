# Bronze, Silver, and Gold Versions
## Bronze
* Two models: Sister and Family
* Following CRUD on both models
    * CREATE a new Family group or a single Sister item
    * READ name of Family/names of members of Family or all info from a Sister
    * UPDATE any info from a Sister, excluding Family membership
    * DELETE any Sister item (disaffiliations happen)

## Silver
* All above CRUD functionality, with additions:
    * UPDATE name of Family
    * DELETE a Family if and only if there are no members of that Family (returns an empty array)
    * UPDATE Sister item only if that particular Sister's associated User is logged in
    * Full CRUD on User
* Include and load image with Sister model (this includes file upload on Sister creation)
* User authentication (local) with User model

## Gold
* All above CRUD functionality, with additions:
    * UPDATE Sister's Family membership
* Optimize image storage
* User authentication (require school email address)
* Different tiers of users (Admin versus User)
* Additional models: Chapter, University, Sorority (to further expand application)

# Models (Bronze)
## Sister
* name: String
* year: Number
* pledge class: String
* big: Sister
* littles: [Sister] (can be added later and can be empty)

## Family
* name: String
* members: [Sister]

# RESTful routing (Bronze)

| URL | Path | Method | Action | Description |
|------|---|---|---| --- |
| /sisters| / | GET | #index | Show a list of all Sisters |
| /sisters/new | /new | GET | #new | Render form to add new Sister |
| /sisters | / | POST | #create | Add new Sister to database (can create new Family from here too) |
| /sisters/:id | /:id | GET | #show | Display information on one Sister |
| /sisters/:id/edit | /:id/edit | GET | #edit | Render form to update Sister information |
| /sisters/:id | /:id | PUT | #update | Put updates on Sister to database |
| /sisters/:id | /:id | DELETE | #delete | Remove a Sister object |
| /families | / | GET | #index | Show a list of all Families |
| /families/:id | /:id | GET | #show | Show all Sisters in a particular Family |
| /families/:id/edit | /:id/edit | GET | #edit | Render form to ask new name of Family |
| /families/:id | /:id | PUT | #update | Update Family name in database |