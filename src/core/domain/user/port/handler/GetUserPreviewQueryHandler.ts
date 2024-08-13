import { GetUserPreviewQuery} from '@core/domain/user/handler/input/GetUserPreviewQuery';
import { GetUserPreviewQueryResult } from '@core/domain/user/handler/output/GetUserPreviewQueryResult';
import { QueryHandler } from '@core/common/message/QueryHandler';
import { Optional } from '@core/common/type/CommonType';


export interface GetUserPreviewQueryHandler extends QueryHandler<GetUserPreviewQuery, GetUserPreviewQueryResult> {}
