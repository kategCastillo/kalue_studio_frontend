export interface User{
      
            _id: string,
            name: string,
            nickname: string,
            email: string,
            password: string,
            role: string,
            status: boolean,
            avatar: string,
            contacts: [],
            createdAt: string,
            updatedAt: string
        }



export interface ResponseUsers {
    msg: string,
    data: [User]
}