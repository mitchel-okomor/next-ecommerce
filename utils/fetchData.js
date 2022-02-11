const baseURl = process.env.BASE_URL;

export const getData = async (url, token) => {
  const res = await fetch(`${baseURl}/api/${url}`, {
    method: 'GET',
    headers: {
      Authorization: token
    }
  });
  const data = await res.json();
  return data;
};

export const postData = async (url, body, token) => {
  const res = await fetch(`${baseURl}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return data;
};

export const putData = async (url, body, token) => {
  const res = await fetch(`${baseURl}/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return data;
};

export const patchData = async (url, body, token) => {
  const res = await fetch(`${baseURl}/api/${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (url, token) => {
  const res = await fetch(`${baseURl}/api/${url}`, {
    method: 'DELETE',
    headers: {
      Authorization: token
    }
  });

  const data = await res.json();
  return data;
};
