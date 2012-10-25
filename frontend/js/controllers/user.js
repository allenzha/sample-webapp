
define(["toolbox", "views/user/login"], function(Toolbox, View){
    return Toolbox.Base.extend({
       loginAction: function(params) {
           var view = new View();
           view.render();
       }
    });
});