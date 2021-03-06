import React from "react";
import { connect } from "react-redux";
import {Navigate} from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    children
}) => {
    return isAuthenticated? (
        <Navigate replace to="/dashboard" />
    ):(
        <div>
        {children}
        </div>
        
    )
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)