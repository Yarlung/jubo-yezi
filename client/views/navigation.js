Template.navigation.events({
    'click .navbar-logout' : function() {
        Meteor.logout();
        Session.set('hiddenApps',null);
        Session.set('display',null);
        return false;
    }
});
