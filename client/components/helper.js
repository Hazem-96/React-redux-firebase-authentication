/**
 * Created by hazem on 18/01/2018.
 */
import {auth} from '../Firebase';

const getInitialState = () => {

    auth.onAuthStateChanged((user) => {
            if (user) {
                return   {
                    isFetching: false,
                    isAuthenticated: true,
                    user: user
                };
                console.log('user Found')
            }else {
                return   {
                    isFetching: false,
                    isAuthenticated: false,
                    user: null
                };
                console.log('user Not Found')
            }

        }

    );
}
export default getInitialState;