import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/add/", "TimeSlots/TimeSlotsController.add")
    Route.post("/available","TimeSlots/TimeSlotsController.availableSlots")
}).prefix("time-slots")