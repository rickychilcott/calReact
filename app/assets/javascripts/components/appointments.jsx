var Appointments = React.createClass({
  getInitialState: function() {
    return ({
      appointments: this.sortDates(this.props.appointments),
      title: "Team Startup meeting",
      appt_time: "Tomorrow at 9am"
    })
  },

  handleUserInput: function(obj) {
    this.setState(obj)
  },

  handleFormSubmit: function() {
    var appt = {
      title: this.state.title,
      appt_time: this.state.appt_time
    }

    // Figure out how to post
    fetch('/appointments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({appointment: appt})
    }).then((response) => response.json()).then((responseJson) => {
      this.addNewAppointment(responseJson);
    });
  },

  // TODO: Determine if this is good.
  sortDates: function(appointments) {
    return appointments.sort(function(a, b) {
      return new Date(a.appt_time) - new Date(b.appt_time)
    })
  },

  addNewAppointment: function(appointment) {
    var appointments = React.addons.update(this.state.appointments, {$push: [appointment]})
    this.setState({appointments: this.sortDates(appointments)})
  },

  render: function() {
    return (
      <div>
        <AppointmentForm title={this.state.title} appt_time={this.state.appt_time} onUserInput={this.handleUserInput} onFormSubmit={this.handleFormSubmit}/>
        <AppointmentsList appointments={this.state.appointments}/>
      </div>
    )
  }
})
