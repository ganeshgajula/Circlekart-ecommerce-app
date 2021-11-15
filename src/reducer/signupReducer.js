export const signupReducer = (state, action) => {
  switch (action.type) {
    case "FIRST_NAME":
      return { ...state, firstname: action.payload };

    case "LAST_NAME":
      return { ...state, lastname: action.payload };

    case "EMAIL":
      return { ...state, email: action.payload };

    case "PASSWORD":
      return { ...state, password: action.payload };

    default:
      return state;
  }
};
