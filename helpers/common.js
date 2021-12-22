import jsonwebtoken from 'jsonwebtoken';

export function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

export function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.trim().charAt(0).toUpperCase() + s.slice(1);
};

// Returns response info
export const responseInfo = (rCode, rState, rData, rMessage) => {
  return { rCode, rState, rData, rMessage };
};

// Returns a Backend response object
export const responseObject = (response, code, state, data, message) => {
  if (state === 'error' || (state === 'success' && !data)) {
    return response.status(code).json({
      status: state,
      message: message
    });
  } else {
    return response.status(code).json({
      status: state,
      resultCount: data ? data.length : 0,
      data: data,
      message: message
    });
  }
};

export const camelCase2Words = (s) => {
  var wordsArr = s.split(/([A-Z][a-z]+)/).filter(function (e) {
    return e;
  });
  var words = wordsArr.join(' ');
  return capitalize(words);
};

export const errorObject = (response, statusCode, message) => {
  return response.status(statusCode).json({
    status: 'error',
    message: message
  });
};

// Issues JWT tokens to users
export const issueJwt = (user) => {
  const _id = user.id;

  const expiresIn = '1d';

  const payload = {
    userId: _id,
    email: user.email,
    roles: user.roles,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(
    payload,
    global.config.common.APP_PRIV_KEY,
    {
      expiresIn: expiresIn,
      algorithm: 'RS256'
    }
  );
  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  };
};

export const issueRefreshJwt = (user) => {
  const id = user.id;

  const expiresIn = '7d';

  const payload = {
    id,
    email: user.email,
    roles: user.roles,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, refreshTokenSecrtet, {
    expiresIn: expiresIn
  });

  return {
    token: +signedToken,
    expires: expiresIn
  };
};

export const sluggify = (s) => {
  if (!s) return '';
  return s
    .trim() //remove trailing white spaces
    .toLowerCase() //because we want case uniformity
    .replace(/ /g, '-') //convert any space to dash
    .replace(/[-]+/g, '-') //convert consecutive dashes to one dash (to avoid this--man turning to this---man)
    .replace(/[^\w-]+/g, ''); //remove any non-alphanum
};

export const generateRandomString = (len = 10, poolType = 'alphaNum') => {
  try {
    if (!['num', 'alpha', 'alphaNum'].includes(poolType))
      throw new Error('Invalid pool type');
    let pool;
    switch (poolType) {
      case 'num':
        pool = '0123456789';
        break;
      case 'alpha':
        pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
      case 'alphaNum':
      default:
        pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
    }
    let result = '';
    let i = len;
    for (; i > 0; --i) {
      result += pool[Math.round(Math.random() * (pool.length - 1))];
    }
    return result;
  } catch (err) {
    throw err.message;
  }
};
