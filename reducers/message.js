const message = (state,action) => {
    switch(action.type) {
        case 'show':
            return {
                'show':true,
                'code':action.code,
                'value':action.message
            };
        case 'hide':
            return {
                'show':false,
                'code' : '',
                'value' : ''
            };
        default:
            return {
                'show':false,
                'code' : '',
                'value' : ''
            };
    }
};

export default message;
