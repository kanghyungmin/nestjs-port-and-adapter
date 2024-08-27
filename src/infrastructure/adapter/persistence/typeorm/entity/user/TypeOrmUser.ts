import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'users' })
export class TypeOrmUser {
    @PrimaryGeneratedColumn()
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

    @Column() 
    public updatedAt : Date;

    @Column() 
    public removedAt : Date;

}