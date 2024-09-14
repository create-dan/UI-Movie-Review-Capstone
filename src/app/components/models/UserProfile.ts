export class UserProfile {
    userId: number
    userName: string
    userEmail: string
    userPassword: string
    userRole: string
    jwtToken:String

    constructor() {
        this.userId = 0,
        this.userName = ''
        this.userEmail = ''
        this.userPassword = ''
        this.userRole = ''
        this.jwtToken=''
    }
}