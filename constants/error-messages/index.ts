export const error_messages = {
  // 400
  unauthorized: {
    code: '403',
    message: 'You are not authorized to access this resource.',
  },

  // 500
  'internal-server-error': {
    code: '500',
    message: 'Internal server error. Please, try again.',
  },

  // 600
  'missing-required-body': {
    code: '600',
    message: 'The request is missing required body information.',
  },
  'missing-required-query-string': {
    code: '601',
    message: 'The request is missing required query string parameters.',
  },
  'missing-access-token': {
    code: '602',
    message: 'Missing access token in the request headers.',
  },
};
