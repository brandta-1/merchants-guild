export const createUser = async (userData) => {
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

export const logoutUser = async () => {
  return await fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const setListing = async (listing) => {
  const res = await fetch('/api/listings/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listing),
  });
  return res.json();
}

export const getListing = async (search) => {
  const res = await fetch('/api/listings/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(search),
  });
  return res.json();
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


export const isLoggedIn = async () => {
  const res = await fetch('/api/users/auth', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return res.json();
}