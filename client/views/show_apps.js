Template.showApps.helpers({
    applications: function() {
        console.log("find app");
        var allApp = apps.find();
        if(allApp) return allApp;
        else return "0";
    }
});
