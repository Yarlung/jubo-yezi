Template.navigation.helpers({

});

Template.navigation.events({
    'click .navbar-logout' : function() {
        Meteor.logout();
        Session.set('hiddenApps',null);
        Session.set('display',null);
        Router.go('home');
        return false;
    }
});
