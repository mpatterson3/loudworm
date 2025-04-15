const mockUsers = [];
const mockOrders = [];

export const signup = (email, password) => {
  const userExists = mockUsers.find((user) => user.email === email);
  if (userExists) {
    return { success: false, message: 'User already exists.' };
  }
  mockUsers.push({ email, password });
  return { success: true, message: 'Signup successful.' };
};

export const login = (email, password) => {
  const user = mockUsers.find((user) => user.email === email && user.password === password);
  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }
  return { success: true, message: 'Login successful.' };
};

export const saveOrder = (order) => {
  mockOrders.push(order);
  console.log('Order saved:', order);
};

export const getOrders = () => {
  return mockOrders;
};