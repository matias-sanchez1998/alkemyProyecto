import React from 'react'
import {Link} from 'react-router-dom'


function Title({moviments}) {



 let available = moviments.map((item) => {
  if (item.type == 'expenditure') {
    return -item.amount
  } else {
    return item.amount
  }
 })

  return (
    <div className='container'>
        <h1>Income and expense manager</h1>
        <h4>The amount of money available is: ${available.length && available.reduce((a,b) => a+b)}</h4>
        <Link to={'/new'}>
        <button className="button button-primary add-movement">Add</button>
        </Link>
    </div>
  )
}

export default Title