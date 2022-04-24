import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ProfileService from './ProfileService'
import ProfileValidator from './ProfileValidatior'

export default class ProfileController {
    private profileService : ProfileService
    private profileValidator : ProfileValidator

    constructor (){
        this.profileService = new ProfileService()
        this.profileValidator = new ProfileValidator()
    }

    async getProfileDetails(ctx : HttpContextContract){
        const userId = ctx.request.params().id;
        let userInfo = await User.query().where('id',userId).first();
        // delete userInfo.password;
        userInfo = userInfo?.toJSON();
        delete userInfo?.password;
        console.log(userInfo);
        return ctx.response.send(userInfo);
    }

    async updateProfile(ctx: HttpContextContract){
        try{
            await this.profileValidator.profileUpdateValidator(ctx);
        }catch(error){
            return ctx.response.status(422).send({
                status:'BAD',
                message: error,
                results:[],
            });
        }
        return await this.profileService.profileUpdate(ctx)
        
    }
}