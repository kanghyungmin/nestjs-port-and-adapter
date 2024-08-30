import { GetUserPreviewQuery} from '@core/domain/user/handler/input/GetUserPreviewQuery';
import { GetUserPreviewQueryResult } from '@core/domain/user/handler/output/GetUserPreviewQueryResult';
import { QueryHandler } from '@core/common/message/QueryHandler';


export interface GetUserPreviewQueryHandler extends QueryHandler<GetUserPreviewQuery, GetUserPreviewQueryResult> {}
