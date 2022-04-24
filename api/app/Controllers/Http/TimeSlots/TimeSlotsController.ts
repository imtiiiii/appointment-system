import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TimeSlotsController {
    public async add(ctx: HttpContextContract) {
        const data = ctx.request.all();
        console.log("data=", data)
    }
}
