import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from './AuthService';
import AuthValidator from './AuthValidator';


export default class AuthController {
  private authService : AuthService
  private authValidator : AuthValidator
  
  constructor () {
    this.authService =  new AuthService()
    this.authValidator =  new AuthValidator()
  }
  /** 
   * Registration Controller
   * Example Body:
   *  {
          "firstName": "ak",
          "lastName":"Kmk",
          "email":"akashcsemu4@gmail.com",
          "password":"123123",
          "password_confirmation":"123123",
          "userType":"teacher",
          "studentId":23, // Optional -> Depend on userType.Ommit studentId if userType is student or admin
          "dept":"math"
      }
   */
  async register(ctx : HttpContextContract){
    try {
      await this.authValidator.validateSignupSchema(ctx)
    } catch (error) {
      const errorObject = JSON.parse(error);
      // console.log(errorObject);
      return ctx.response.status(422).send({
        status:'BAD',
        message:errorObject,
        result:[]
      })
    }
    // await this.authValidator.validateSignupSchema(ctx)
    return this.authService.register(ctx);
  }
  /**
   * Login Controller 
   * Example Post Body:
   *  {
        "uid":"ak_Kmk", // uid also accept Email Address
        "password":"123123"
      }
   */
  async login(ctx : HttpContextContract){
    try {
      await this.authValidator.validateLoginSchema(ctx)  
    } catch (error) {
      const errorObject = JSON.parse(error);
      return ctx.response.status(422).send({
        status:'BAD',
        message:errorObject,
        result:[]
      })
    }
    // await this.authValidator.validateLoginSchema(ctx)
    let data = ctx.request.all();
    try {
      const userStatus:String = await this.authService.userStatus(data.uid);
      if(userStatus === 'active'){
        return await ctx.auth.use('web').attempt(data.uid, data.password)
      }else{
        return await ctx.response.status(200).send({
          status:'OK',
          message:'User is registerd and not varified yet by Admin',
          result:[
            {
              user_status: userStatus
            }
          ]
        });
      }
      //  return await ctx.auth.use('web').attempt(data.uid, data.password)
    } catch (error) {
      return ctx.response.status(403).send({
        status: 'BAD',
        message:'username or email or password was incorrect',
        result:[]
      });
    }
    // return await ctx.auth.use('web').attempt(data.uid, data.password)
  }
  
  async getUser(ctx:HttpContextContract){
    try{
      // return ctx.auth.use('web').authenticate();
      if(ctx.auth.isLoggedIn){
        return await ctx.auth.use('web').authenticate();
      }
      throw 'May Session Expired'
      
    }catch(error){
      return ctx.response.status(403).send({
        status: 'BAD',
        message:'May session Expired Or User is Logout',
        result:[]
      });
    }
  }
  /**
   * Only Logged In User Can access this Route
   */
  async logout({auth,response}){
    // return auth.logout()
    await auth.logout()
    return response.status(200).send({
      status:'OK',
      message:'User is logged out successfully!!',
      result:[]
    })
  }
  
  async verifyEmail(ctx: HttpContextContract) {
    try{
      let validateData = await this.authValidator.validateVerificationData(ctx)
       let data =ctx.request.all()
       data.verificationCode =validateData.verificationCode
       data.email =validateData.email
       return this.authService.verifyEmail(ctx)
    }catch(error){
     return ctx.response.status(422).send(error.messages)
    }
     
   }
 async sendResetToken(ctx : HttpContextContract){
   try {
     let validatedData = await this.authValidator.validateResetSchema(ctx)
     return this.authService.sendResetToken(ctx,validatedData)
   } catch (error) {
     return ctx.response.status(422).send(error.messages)
   }
  }


 async verifyCode(ctx: HttpContextContract) {
   try {
     let validatedData = await this.authValidator.validateTokenData(ctx)

     return this.authService.verifyCode(ctx, validatedData)
   } catch (error) {
     return ctx.response.status(422).send(error.messages)
   }

 }

 async passwordReset(ctx: HttpContextContract) {
   try {
     let validatedData = await this.authValidator.validateNewPasswordData(ctx)
     return this.authService.passwordReset(ctx, validatedData)
   } catch (error) {
     return ctx.response.status(422).send(error.messages)
   }

 }
   
   
   

}
