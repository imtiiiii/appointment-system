import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class DashboarAdminsController {
    public async test(ctx: HttpContextContract) {
        return { msg: "dashboard running" }

    }
    public async requested(ctx: HttpContextContract) {
        const users = await User.query().where("status", "")
        // console.log(users[0]);
        return users
    }
    public async updateStatus(ctx: HttpContextContract) {
        // update users registration request
        /**
            * 0 -> pending
            * 1 -> accepted
            * 2 -> rejected
            */
        const data = ctx.request.all();
        console.log(data)
        const user = await User.query().where("id", "id")
            .update(data);
        return user
    }
}