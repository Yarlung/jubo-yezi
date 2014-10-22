Template.showApps.helpers({
    showApp: function(){
        if(!Session.get('hiddenApps'))
            return true;

        return false;
    },

    applications: function() {
      var allApp = apps.find({priority:{$ne:0}});
        if(allApp) return allApp;
        else return "0";
    },

    showSetting: function(){
        return Session.equals('display', 'setting');
    },

    showTerminal: function(){
        return Session.equals('display', 'terminal');
    }
});

Template.showApps.events({
    'click #goto-setting' : function() {
        Session.set('display','setting');
        Session.set('hiddenApps','no');
    },

    'click #goto-terminal' : function() {
        Session.set('display','terminal');
        Session.set('hiddenApps','no');
    }
});
