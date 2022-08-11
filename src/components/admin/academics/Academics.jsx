import React, { useState } from 'react'

export const Academics = () => {
  const [iconOptions, setIconOptions] = useState("arrow_drop_up");

  return (
    <div className="ct">
      <div className="page-table">
        <div className="page-one">
          <a className="table" >
            Forex <i className="large material-icons">{iconOptions}</i>
          </a>
        </div>
      </div>
    </div>
  )
}
