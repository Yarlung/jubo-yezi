Template.setting.helpers({
    showDevice: function(){
        if(!Session.get('displaySetting'))
            return true;

        return false;
    },

    showAccount: function(){
        return Session.equals('displaySetting', 'account');
    },

    showWifi: function(){
        return Session.equals('displaySetting','wifi');
    }
});


Template.setting.events({
    'click #setting-device' : function() {
        Session.set('displaySetting',null);
    },

    'click #setting-account' : function() {
        Session.set('displaySetting','accout');
    },

    'click #setting-wifi' : function() {
        Session.set('displaySetting','wifi');
    }
});



