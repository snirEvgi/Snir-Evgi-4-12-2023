export const toggleTheme = () => ({
    type: 'TOGGLE_THEME',
  });
  
  const initialState = {
    theme: 'light', 
  };
  
  export const themeReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme); 
        return { ...state, theme: newTheme };
      default:
        return state;
    }
  };
  