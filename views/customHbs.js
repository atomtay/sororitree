//const Handlebars = require('handlebars')

Handlebars.registerHelper('bold', function(options) {
    return new Handlebars.SafeString(
        '<div class="mybold">'
        + options.fn(this)
        + '</div>');
  });

Handlebars.registerHelper('list', function(items, options) {
    var out = "<ul>";
    var names = [];
    var letters = [];
    for(var i=0, l=items.length; i<l; i++) {
      name = items[i].name;
      if(name == ""){
          continue;
      }
      var firstLetter = name.substring(0,1);
      var arrayWithFirstLetter = names[firstLetter];
      if(arrayWithFirstLetter == null){
         names[firstLetter] = [];
         letters.push(firstLetter);
      }
      var firstName = name.indexOf(" ") == -1 ? name : name.substring(0,name.indexOf(" "));
      names[firstLetter].push(firstName)
    }

    for(var i=0; i < letters.length; i++) {
       out = out + "<li>" + letters[i] + "</li>";
       for(var k=0; k < names[letters[i]].length; k++){
         out = out + "<li>" + names[letters[i]][k] + "</li>";
       }
    }

    return out + "</ul>";
  });