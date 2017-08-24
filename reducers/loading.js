const loading = (state,action) => {
    switch(action.type) {
        case 'show_loading':
            return {
                'show':true,
            };
        case 'hide_loading':
            return {
                'show':false,
            };
        default:
            return {
                'show':false,
            };
    }
};

export default loading;
