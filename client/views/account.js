function onLogin(err){
    if(err){
        console.log("loginForm events loginWithPassword error",err.reason);
        //Session.set('displayMessage','Login Error &' + err.reason);
        return;
    }

    Session.set('login',false);
    Session.set('display','apps');
}

function isNotEmpty(val,field){
    if(!val || val === ''){
        //Session.set('displayMessage','Error & Please fill in all required fields.');
        console.log('displayMessage','Error & Please fill in all required fields.');
        return false;
    }
    return true;
}

Template.loginForm.helpers({
    login: function(){
        if(!Session.get('display'))
            return true;
    },

    createAccount: function(){
        return Session.equals('display', 'createAccountForm');
    },

    recoveryPassword: function(){
        return Session.equals('display', 'recoveryPasswordForm');
    }
});


Template.loginForm.events({
    'submit #login-form' : function(e,t){
        e.preventDefault();
        var username = t.find('#login-username').value;
        var password = t.find('#login-password').value;

        if(isNotEmpty(password,'loginError'))
        {
            Meteor.loginWithPassword(username,password,function(err){
                onLogin(err);
            });
        }
        return false;
    },

    'click #forgot-password' : function() {
        Session.set('display','recoveryPasswordForm');
    },

    'click #create-account' : function() {
        Session.set('display', 'createAccountForm');
    },
});

Template.loginForm.destroyed = function(){
      Session.set('display', null);
};

Template.createAccountForm.events({
    'submit #register-form' : function(e, t) {
    var username = t.find('#account-username').value;
    var password = t.find('#account-password').value;
                                 
    if (isNotEmpty(username, 'accountError') && isNotEmpty(password, 'accountError'))
    {
        Session.set('loading', true);
        Accounts.createUser({username: username, password : password}, function(err){
            if (err && err.error === 403) {
                Session.set('displayMessage', 'Account Creation Error &' + err.reason);
                Session.set('loading', false);
            } 
        });
    }
    }
});

/*
Template.recoveryPasswordForm.helpers({
    resetToken: function(){
        return Session.get(recoveryPassword);
    }
});
*/

Template.recoveryPasswordForm.events({
    'submit #new-password-form' : function(e,t) {
        var password = t.find('#new-password').value;
        if(isNotEmpty(password,'accountError'))
        {
            Session.set('loading',true);
            Accounts.resetPassword(Session.get('resetPassword'), password, function(err){
                if(err)
                    Session.set('displayMessage', 'Password Reset Error & '+ err.reason);
                else
                    Session.set('resetPassword', null);

               Session.set('loading', false);
            });
        }

        return false;
    }
});
