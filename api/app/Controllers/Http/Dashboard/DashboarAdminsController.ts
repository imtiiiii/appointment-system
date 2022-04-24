import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class DashboarAdminsController {
    public async test(ctx: HttpContextContract) {
        return { msg: "dashboard running" }

    }
    public async requested(ctx: HttpContextContract) {
        const users = await User.query().where("status", "0")
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
        const id = data.id;
        const status = data.status;
        const user = await User.query().where("id", id)
            .update({ status: status });
        return user
    }
    // get all students list
    public async studentList(ctx: HttpContextContract) {
        const users = await User.query().where("user_type", "student");
        return users;

    }
    // get all teachers list
    public async teacherList(ctx: HttpContextContract) {
        const users = await User.query().where("user_type", "teacher");
        return users;

    }
}
