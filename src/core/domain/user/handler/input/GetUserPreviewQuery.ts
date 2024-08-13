

export class GetUserPreviewQuery {
    by : {id: string};

    private constructor(by: {id: string})  {
        this.by = by
    }

    public static new(by: {id: string}) : GetUserPreviewQuery {
        return new GetUserPreviewQuery(by);
    }

}   