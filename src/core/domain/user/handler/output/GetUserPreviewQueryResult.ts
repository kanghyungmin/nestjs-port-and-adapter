import { User } from "@core/domain/user/entity/User";

export class GetUserPreviewQueryResult {

    public readonly id: string;
    public readonly firstName : string;
    public readonly lastName : string;
    public readonly email : string;

    constructor(user: User) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail()
    }

    public static new(user: User) : GetUserPreviewQueryResult {
        return new GetUserPreviewQueryResult(user);
    }
}