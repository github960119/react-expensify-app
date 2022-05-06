import React from "react"
import { Link } from 'react-router-dom';


const ExpenseItem = ({ description, amount, createdAt, id} = {}) => (
    <div>
        <nav>
        <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
            <p>{amount} - {createdAt}</p>
            
        </nav>
    </div>
)

export default ExpenseItem; 