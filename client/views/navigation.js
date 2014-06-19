Template.navigation.helpers({

});

Template.navigation.events({
    'click .navbar-logout' : function() {
        Meteor.logout();
        return false;
    }
});
