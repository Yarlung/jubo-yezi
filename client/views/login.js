function onLogin(err){
    if(err){
        console.log("loginForm events loginWithPassword error",err.reason);
        //Session.set('displayMessage','Login Error &' + err.reason);
        return;
    }

    console.log("login successful");
    Session.set('loginForm',false);
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
    loginForm: function(){
        if(!Session.get('formView'))
            return true;
    },

    createAccount: function(){
        return Session.equals('formView', 'createAccountForm');
    }

});


Template.loginForm.events({
    'submit #login-form' : function(e,t){
        e.preventDefault();
        var username = t.find('#login-username').value;
        var password = t.find('#login-password').value;

        console.log("loginForm events");
        if(isNotEmpty(password,'loginError'))
        {
            console.log("loginForm events loginWithPassword");
            Meteor.loginWithPassword(username,password,function(err){
                onLogin(err);
            });
        }
        return false;
    },

    'click #create-account' : function(e, t) {
        Session.set('formView', 'createAccountForm');
    },
});

Template.loginForm.destroyed = function(){
      Session.set('formView', null);
};

Template.createAccountForm.events({
    'submit #register-form' : function(e, t) {
    var username = t.find('#account-username').value;
    var password = t.find('#account-password').value;
                                 
    if (isNotEmpty(username, 'accountError') && isNotEmpty(password, 'accountError'))
    {
        Session.set('loading', true);
        console.log("create account");
        Accounts.createUser({username: username, password : password}, function(err){
            if (err && err.error === 403) {
                Session.set('displayMessage', 'Account Creation Error &' + err.reason);
                Session.set('loading', false);
            } 
        });
    }
    }
});
