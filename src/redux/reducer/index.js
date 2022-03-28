const INITIAL_STATE = {
  inputXml: null,
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CREATE_INPUT_XML':
      return { ...state, inputXml: action.value };
    default:
      return state;
  }
}
