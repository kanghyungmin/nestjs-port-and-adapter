import { UserRole } from "@core/common/enum/UserEnums";
import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: 'users' })
export class TypeOrmUser {
    @PrimaryColumn()
    public id: string;

    @Column({nullable: true})
    public firstName: string;

    @Column({nullable: true})
    public lastName : string

    @Column({nullable: true})
    public  email : string

    @Column({nullable: true}) 
    public password: string;

    @Column({nullable: true}) 
    public createdAt : Date;

    @Column({nullable: true})
    public role: UserRole;

    @Column({ nullable: true }) 
    public updatedAt : Date;

    @Column({ nullable: true }) 
    public removedAt : Date;

}