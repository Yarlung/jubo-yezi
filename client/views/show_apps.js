Template.showApps.helpers({
    showApp: function(){
        if(!Session.get('hiddenApps'))
            return true;

        return false;
    },

    applications: function() {
        var allApp = apps.find();
        if(allApp) return allApp;
        else return "0";
    },
    
    showSystem: function(){
        console.log('showSystem',Session.get('display'));
        return Session.equals('display', 'getInApp');
    }
});

Template.showApps.events({
    'click #get-in-app' : function() {
        Session.set('display','getInApp');
        Session.set('hiddenApps',true);
    },
});
