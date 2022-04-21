import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboarAdminsController {
    public async test(ctx: HttpContextContract) {
        return { msg: "dashboard running" }

    }
}
