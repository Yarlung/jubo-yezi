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
    var str = explode[0].split(' ');
    cli.command[0].cmd = str[0];
    cli.command[0].args = str.splice(1,str[str.length] === ' '?str.length--:str.length);
    cli.length = 1;
  } else if(explode.length == 2) {
    var begin = 0;
    var str = explode[0].split(' ');
    cli.command[0].cmd = str[0];
    cli.command[0].args = str.splice(1,str[str.length - 1] === ''?str.length--:str.length);

    str = explode[1].split(' ');
    str[0] === ''?begin = 1:begin = 0;
    cli.command[1].cmd = str[begin];
    cli.command[1].args = str.splice(begin + 1,str.length);

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
      var cmd = spawn(cli.command[0].cmd,cli.command[0].args);
      var nextCmd = spawn(cli.command[1].cmd,cli.command[1].args);

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

