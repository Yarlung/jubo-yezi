var future = Npm.require('fibers/future');
var spawn = Npm.require('child_process').spawn;

function execCmd(data,cli,next) {
  var cmd = spawn(cli.cmd,cli.args);
  if(next) {
  }
  else {
    cmd.
  }

  if(data) 
    cmd.stdin.write(data);
  else {
    cmd.stdout.on('data',function(data) {
      if(next)
    });
  }

  cmd.stdout.on('data', function(data) {
    if(next) {
      cmd1 = spawn(next.cmd,next.args);
      cmd1.stdin.write(data);
      cmd1.stdout.on('data', function(data) {
        if(third)
      });
    }
  });
}

Meteor.methods({
  jsh: function (command) {
    console.log("service exec cmd");
    var cmds
      var explode = command.split(' ');
      var cmd = explode[0];
      var args = explode.splice(1, explode.length);
      console.log("e:"+cmd+JSON.stringify(args));

      var shell = new future();

    cmd = spawn(cli[0].cmd,cli[0].args);
    cmd.stdout.on('data',function(data) {
      
    });
    if(cli.length === 2) {
    } else {
    }
  /*_.each(cmdLines, function(cli) {
    cmd = spawn(cli.cmd,cli.args);
    cmd.stdout.on('data', function(data) {

    });
  });
  */
    for(i = 0; i < cli.length; i ++) {
      var cmd = spawn(cli[i].cmd,cli[i].args);
      cmd.
    }

      if (args.length == 0)
        ls    = spawn(cmd);
      else
        ls    = spawn(cmd , args);

      ls.stdout.on('data', function (data) {
        console.log(''+data);
        shell.return(''+data);
      });

      ls.stderr.on('data', function (data) {
        console.log(''+data);
        shell.return(''+data);
      });

      return fut.wait();
  }
});

