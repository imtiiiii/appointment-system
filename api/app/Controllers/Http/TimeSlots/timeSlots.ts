import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/add/", "TimeSlots/TimeSlotsController.add")
}).prefix("time-slots")