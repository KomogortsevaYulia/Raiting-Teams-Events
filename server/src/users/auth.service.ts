// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import {Repository } from 'typeorm';
// import { User } from './dto/user.entity';

// @Injectable()
// export class AuthService {

//     constructor(
//         @InjectRepository(User)  // user //,
//         private readonly usersRepository: Repository<User>
//     ) { }

//     // check permissions
//     async hasPermissions(userId: number, requiredPermissions: string[]) {

//         let userHaveAllPermissions = true
//         //  get user and its permissions
//         const user = await this.usersRepository.findOne({ where: { id: userId } })
//         // console.log("user", user.permissions, "req ", requiredPermissions)

//         // go throught req permissions
//         requiredPermissions.forEach((reqPermission) => {
//             let havePermission = false
//             //  go throught user permissions
//             for (let i = 0; i < user.permissions.length; i++) {
//                 if (user.permissions[i] === reqPermission) {
//                     havePermission = true
//                     break
//                 }
//             }
//             // if one from permissions not granted then return false
//             if (!havePermission) {
//                 userHaveAllPermissions = false
//                 return userHaveAllPermissions
//             }
//         })

//         return userHaveAllPermissions
//     }

// }
