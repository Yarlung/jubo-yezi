  Template.buffer.output = function () {
    if (Session.get('output'))
      return Session.get('output');
    else
      return "JuBo Shell 0.0.1\n\n"
            +"This is a basic terminal, it will run Linux/Unix commands on the server\n"
            +"and will print on the screen the output."
            +"\n\n"
            +"\n\n"
            +"Thanks Meteor Shell"
            +"source: http://github.com/grigio/meteor-shell\n"
            +"author: Luigi Maselli"
            +"\n\n"
            +"Known Bugs: cd dir command can't use";
  }

  Template.input.events({

    'keypress input#cmd': function (evt) {
      if (evt.which === 13) { // enter key
        var cmd  = $('#cmd').val();
        console.log('exec: '+cmd );
        Meteor.call('jsh', cmd, function (err, data) {
          console.log("output:",data);
          $('#cmd').val('');
          Session.set('output', data );
        });
      }
    }

  });



