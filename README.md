# Sororitree
A web-based GUI for organizing sorority sisters and keeping track of Big/Little relationships as a chapter grows.

## Installation
To access the public-facing version of this application (currently containing my alma mater's chapter), simply visit [sororitree.herokuapp.com](https://sororitree.herokuapp.com/). Alternatively, you can download and host your own local version by following these command line prompts:

```git clone https://github.com/annabelle-t-taylor/sororitree.git
cd sororitree
npm install
node db/seed.js
node index.js
```

Open app in *localhost:1874* in your web browser of choice. If you'd like to host your local version on another port, you can edit that on line 12 of **/index.js**.

## Technologies Used
* HTML5
* CSS3
* JavaScript (Node.js)
* MongoDB
* The following npm packages:
    * [Express](https://www.npmjs.com/package/express)
    * [Method Override](https://www.npmjs.com/package/method-override)
    * [Body Parser](https://www.npmjs.com/package/body-parser)
    * [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
    * [HBS](https://www.npmjs.com/package/hbs)
    * [Mongoose](https://www.npmjs.com/package/mongoose)
    * [Nodemon](https://www.npmjs.com/package/nodemon) (not necessary to run, but helpful in development)

## Development Process
I spent a solid two hours planning this project's architecture, and in retrospect I could have saved a lot of headache by spending an additional couple of hours. Writing out my RESTful routing table made the basic MVC setup a breeze, but writing out the controller callback functions proved far more difficult. For example, deleting a sister doesn't just involve removing one object from my database—as I describe below, it also involves updating two other sisters *and* a family instance. Needless to say, more pseudo-code (and patience) would have served me well.

Throughout the actual development, I found GitHub issues and branching to be incredibly helpful. Whenver I had a wandering thought of "Oh, it'd be neat to implement XYZ" or "I should really refactor ABC," I quickly wrote it down as an issue. This allowed me to focus on one thing at a time without worry that I might forget something later. Further, branching let me get a bit messy with my code when trying to implement a new feature; there were multiple points where I branched off, completely broke everything, and was able to safely go back to the master branch to try something else for awhile instead of working in circles.

## Highlights
### Self-Referential Models
If you take a look at **/models/Sister.js** you'll notice that each sister contains references to two other instances of the Sister model. This is to ensure that each sister is linked to their Big and, if applicable, their Little. I only link the ObjectId, meaning I only need to maintain one instance of each sister. This makes updating sister information much simpler, but does complicate matters when deleting a sister. The nested queries in the delete callback of my **/controllers/sister.js** file handle this special case: whenever a sister is deleted, find the IDs of her Big and her Little. Update the Big and Little's respective fields to link these two sisters, thus repairing the lineage.

In less abstract terms, consider this example: Alice is Barbara's big, and Barbara is Claire's big. Barbara disaffiliates, so Alice becomes Claire's new big and Claire is Alice's little.

### Alphabetically-sorted sisters
I would have liked to perform some more complex sorting in order to better organize information on the "index" pages (when displaying all sisters or all families), but ran out of time. However, I was able to perform an alphabetical sort on the last names of all sisters on line 5 of **/controllers/sisters.js**, which then feeds into the **/views/sister/index.hbs** view. To further organize my data, I set up a simple table that evenly distributes sisters between three columns by using CSS grid.

## Future Goals
### User authentication
On a grand scale, I'd love to expand this application so that many users can maintain their own chapter databases. Individual sisters could update their own information, and chapters within the same university could read the lineages of other chapters, but only chapter admins could add/delete sisters from their own chapters. As a smaller "step one" goal, though, I'd like to add in simple authentication for myself so that anyone visiting the Heroku site can view my data, but only I can edit it.

### Expanded Sister/Family relation logic
Currently, you can add and remove sisters to and from families, but I want to flesh that out. I considered adding the ability to delete a family, but I'd like to enforce the logic that only families with no sisters can be deleted. Further, I want to drill down on Sister creation so that once a user selects a family, only sisters from that family are available as potential Bigs.

### Proper tree structure in the database
As it stands, each sister can have one big and one little. At least in my chapter, though, sisters could have up to two littles. Expanding this functionality would require restructuring how I store the big/little ObjectIds for each sister, changing what is currently a linked list into a proper tree. MongoDB has [extensive documentation for building tree relationships](https://docs.mongodb.com/manual/applications/data-models-tree-structures/), but I would still need to figure out how to display that data structure with Mongoose.

## Acknowledgements
* Thanks to [Eric and Kathryn Meyer](https://meyerweb.com/eric/tools/css/reset/) for providing an excellent CSS "reset" stylesheet for the public domain.
* Thanks to [Kolbma](https://github.com/kolbma) for verbalizing [a tricky Mongoose issue](https://github.com/Automattic/mongoose/issues/6997) and making sure it got fixed.
* Thanks to my General Assembly instructors, [Zakk Fleishmann](https://github.com/ZakkMan) and [Hammad Malik](https://github.com/tomatohammado), for their ongoing support, knowledge, and encouragement. 
* And of course, so many thanks in IIKE to my own home chapter of [Gamma Phi Beta at the University of Rochester](http://rochestergammaphi.weebly.com/). You inspired this project and continue to push me to aspire towards [the highest type of womanhood](http://gammaphibetahistory.org/to-inspire-the-highest-type-of-womanhood/), both personally and professionally.

![alt text](https://github.com/annabelle-t-taylor/sororitree/blob/master/public/chapter.jpg "The Stardust family of Gamma Phi Beta, 2017")
*The Stardust family of Gamma Phi Beta, 2017*