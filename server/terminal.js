var future = Npm.require('fibers/future');
var exec = Npm.require('child_process').exec;


Meteor.methods({
  jsh: function (command) {
    var shell = new future();

    exec(command,function(error,stdout,stderr){
      if(error) 
        shell.return('' + error);
      else
        shell.return('' + stdout);
    });

    return shell.wait();
  }
});

