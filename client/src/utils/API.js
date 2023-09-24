export const createUser = async (userData) => {

  console.log(userData);

  return await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};


export const loginUser = async (userData) => {
  return await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const setListing = (listing) => {
  return fetch('/api/listings/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listing),
  });
}

export const getListing = async (search) => {
  return await fetch('/api/listings/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(search),
  });
}

export const deleteListing = async (listing) => {
  return await fetch('/api/listings/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listing),
  });
}