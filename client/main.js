Template.body.helpers({
    needLaunch: function(){
        /*
        console.log('launch',launched);
        var launched = launch.find();
        if(launched) return true;
        else return false;
        */
        return false;
    }
});

Template.launch.events({
    'click #create-wifi' : function(e,t) {
        var wifiName = t.find('#launch-wifi-name').value;
        var pwd = t.find('#launch-new-password').value;
        var tpwd = t.find('#launch-new-password-again').value;
        if(isNotEmpty(wifiName,'emptyWifiName') &&
            isNotEmpty(pwd,'emptyPassword') && isNotEmpty(tpwd,'emptyPassword'))
        {
            //TODO if pwd != tpwd log error
            //TODO set wifi name (ssid)
            //TODO set system user password
            Session.set('loading',true);
            Accounts.createUser({username: 'jubo',password: pwd},function(err){
                if(err && err.error === 403){
                    console.log('create user error');
                }
            });
            Session.set('loading',false);
        }

        return false;
    }
});



