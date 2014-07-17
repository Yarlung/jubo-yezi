Template.launch.helpers({
    needLaunch: function(){
        var launched = launch.find();
        console.log('launch',launched);
        if(launched) return true;
        else return false;
    }
});


