
export class GetUserPreviewQueryResult {

    public readonly id: string;
    public readonly name : string;

    constructor(id : string, name : string) {
        this.id = id;
        this.name = name;
    }

    public static new(id : string, name : string) : GetUserPreviewQueryResult {
        return new GetUserPreviewQueryResult(id, name);
    }
}