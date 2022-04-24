import ProfileQuery from "./ProfileQuery";

export default class ProfileSevice {
    private ProfileQuery : ProfileQuery
    constructor(){
        this.profileQuery = new ProfileQuery();
    }
    async profileUpdate(ctx){
        const authUserId = (ctx.auth.user).toJSON().id;
        console.log(authUserId);
        const updateData = {
            id:authUserId,
            ...ctx.request.all()
        }
        return await 
    }
}