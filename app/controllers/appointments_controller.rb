class AppointmentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @appointments = Appointment.all
    @appointment = Appointment.new
  end

  def create
    @appointment = Appointment.new(appointment_params)

    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entitity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:title, :appt_time)
  end
end
