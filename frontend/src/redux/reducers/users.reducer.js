import { 
    GET_USERS,
    ADMIN_UPDATE_USER 
} from "../actions/users.actions";

const initialSate = {};

export default function usersReducer (state = initialSate, action){
    switch (action.type) {
        case GET_USERS :
            return [...action.payload];
        case ADMIN_UPDATE_USER : 
        console.log(action.payload[0])
        console.log(action.payload[1].data)
        console.log(state)
            return state.map((user) => {
                if (user._id === action.payload[0]){
                    return{
                        ...user,
                        firstName : action.payload[1].data.firstName,
                        lastName : action.payload[1].data.lastName,
                        bio : action.payload[1].data.bio,
                        photo : action.payload[1].data.photo
                    }
                }else {
                    return user
                }
            })

        default : 
            return state
    }
}