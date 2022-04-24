import { schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidatior {
    async profileUpdateValidator(ctx:HttpContextContract){
        const profileSchema = schema.create({
            firstName: schema.string.optional({trim:true}),
            lastName: schema.string.optional({trim:true}),
            dept: schema.string.optional({trim:true}),
            course: schema.string.optional({trim:true}),
            studentId: schema.number.optional(),
        });

        try {
            const payload = await ctx.request.validate({schema:profileSchema});
            return payload;
        } catch (error) {
            throw 'Request Validation Fail'
        }
    }
}