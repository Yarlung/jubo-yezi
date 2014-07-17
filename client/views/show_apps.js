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
    
    showSetting: function(){
        console.log('get display',Session.get('display'));
        return Session.equals('display', 'getInApp');
    }
});

Template.showApps.events({
    'click #get-in-app' : function() {
        console.log('set getInApp');
        Session.set('display','getInApp');
        Session.set('hiddenApps','no');
    },
});
