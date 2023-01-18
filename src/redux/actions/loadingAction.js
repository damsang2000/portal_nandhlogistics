// eslint-disable-next-line import/prefer-default-export
export const CHANGE_LOADING = 'CHANGE_LOADING';

export const Changeloading = ({ loading }) => ({
        type: CHANGE_LOADING,
        payload: {
            loading,
        },
    });
