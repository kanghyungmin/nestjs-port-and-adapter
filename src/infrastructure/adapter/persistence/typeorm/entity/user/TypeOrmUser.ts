import { UserRole } from "@core/common/enum/UserEnums";
import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: 'users' })
export class TypeOrmUser {
    @PrimaryColumn()
    public id: string;

    @Column() 
    public firstName: string;

    @Column() 
    public lastName : string

    @Column() 
    public  email : string

    @Column() 
    public password: string;

    @Column() 
    public createdAt : Date;

    @Column({nullable: true})
    public role: UserRole;

    @Column({ nullable: true }) 
    public updatedAt : Date;

    @Column({ nullable: true }) 
    public removedAt : Date;

}