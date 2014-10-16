var future = Npm.require('fibers/future');
var spawn = Npm.require('child_process').spawn;

function parseCommand(command) {
  var cli = {
    length: 0,
    command: [
      {cmd: '', args:[]},
      {cmd: '', args:[]}]
  };
  var explode = command.split('|');

  if(explode.length == 1) {
    var str = explode.split(' ');
    cli.command[0].cmd = str[0];
    cli.command[0].args = str.splice(1,str.length);
    cli.length = 1;
  } else if(explode.length == 2) {
    var str = explode[0].split(' ');
    cli.command[0].cmd = str[0];
    cli.command[0].args = str.splice(1,str.length);

    str = explode[1].split(' ');
    cli.command[1].cmd = str[0];
    cli.command[1].args = str.splice(1,str.length);

    cli.length = 2;

  }

  return cli;
}

Meteor.methods({
  jsh: function (command) {
    var shell = new future();
    var cli = parseCommand(command);

    if(cli.length === 1) {
      var cmd = spawn(cli.command[0].cmd,cli.command[0].args);
      cmd.stdout.on('data', function(data) {
        shell.return('' + data);
      });

      cmd.stderr.on('data', function(data) {
        shell.return('' + data);
      });
  } else if(cli.length === 2) {
      var nextCmd = spawn(cli[1].cmd,cli[1].args);
      cmd.stdout.on('data', function(data) {
        nextCmd.stdin.write(data);
      });

      cmd.stderr.on('data', function(data) {
        shell.return('' + data);
      });

      cmd.on('close', function(code) {
        nextCmd.stdin.end();
      });

      nextCmd.stdout.on('data', function(data) {
        shell.return('' + data);
      });

      nextCmd.stderr.on('data', function(data) {
        shell.return('' + data);
      });
    } else {
      shell.return('' + 'Invalid command');
    }

    return shell.wait();
  }
});

