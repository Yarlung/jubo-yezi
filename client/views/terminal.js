  Template.buffer.output = function () {
    if (Session.get('output'))
      return Session.get('output');
    else
      return "Meteor Shell 0.0.1\n\n"
            +"This is a basic terminal, it will run Linux/Unix commands on the server\n"
            +"and will print on the screen the output."
            +"\n\n"
            +"I did this software mainly to understand how the \"meteor deploy\"\n"
            +"PaaS/sandbox is done. Please don't do bad things :)"
            +"\n\n"
            +"source: http://github.com/grigio/meteor-shell\n"
            +"author: Luigi Maselli"
            +"\n\n"
            +"Known Bugs: some commands needs a page restart";
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



