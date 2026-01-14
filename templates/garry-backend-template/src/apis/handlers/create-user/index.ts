import type { JSONSchemaType } from 'ajv';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MESSAGES } from '../../../common/messages/error';
import { INFO_MESSAGES } from '../../../common/messages/info';
import { FILE_NAMES } from '../../../common/fileNames';
import { OPERATIONS } from '../../../common/operations';
import type { ApiResult } from '../../common/interfaces';
import type { CreateUserRequest, UserAttributes } from '../../common/types';
import { loggerError, loggerInfo } from '../../common/utils/loggerUtils';
import { withWrap } from '../../withWrap';
import {
  ValidationError,
  validateRequest,
  validateResponse,
} from '../../common/utils/validationUtils';
import { businessValidation } from './logic/businessValidation';
import { dbOperation } from './logic/dbOperation';
import { postOperation } from './logic/postOperation';
import { preOperation } from './logic/preOperation';
import requestSchemaJson from './schema/requestSchema.json';
import responseSchemaJson from './schema/responseSchema.json';

const requestSchema = requestSchemaJson as JSONSchemaType<CreateUserRequest>;
const responseSchema = responseSchemaJson as JSONSchemaType<ApiResult<UserAttributes>>;

const handler = withWrap(async (req, res) => {
  try {
    const requestPayload = validateRequest(requestSchema, req.body);
    const isValid = businessValidation(requestPayload);
    if (!isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: ERROR_MESSAGES.INVALID_PAYLOAD });
    }

    const prepped = await preOperation(requestPayload);
    const result = await dbOperation(prepped);
    const postProcessed = await postOperation(result);
    const responsePayload: ApiResult<UserAttributes> = { ok: true, data: postProcessed };
    validateResponse(responseSchema, responsePayload);

    loggerInfo(
      INFO_MESSAGES.REQUEST_OK,
      { id: responsePayload.data?.id },
      OPERATIONS.USERS_CREATE,
      FILE_NAMES.USERS_HANDLER,
      'createUser'
    );
    return res.status(StatusCodes.CREATED).json(responsePayload);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: ERROR_MESSAGES.INVALID_PAYLOAD });
    }
    loggerError(
      ERROR_MESSAGES.UNEXPECTED,
      err,
      OPERATIONS.USERS_CREATE,
      FILE_NAMES.USERS_HANDLER,
      'createUser'
    );
    throw err;
  }
});

export default handler;
