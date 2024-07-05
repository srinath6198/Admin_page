import React from 'react'
import { Navigate } from 'react-router-dom'

const Required = ({children}) => {

    if(!localStorage.getItem('token')){
        return <Navigate to={'/login'}/>
    }

    return children

}

export default Required