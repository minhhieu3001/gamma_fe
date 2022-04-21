const INITIAL_STATE = {
  inputXml: null,
  isLoading: false,
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CREATE_INPUT_XML':
      return { ...state, inputXml: action.value };
    case 'SPIN_LOADING':
      return { ...state, isLoading: action.value };
    default:
      return state;
  }
}
