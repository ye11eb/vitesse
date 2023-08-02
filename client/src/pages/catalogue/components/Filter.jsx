/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './filter.scss'
import Axios from'../../../utils/axios'


const Filter = ({ openedFilterAnim, ukrLang, setFilterOpt, filterOpts}) => {

  return (
      <div className={openedFilterAnim ? "filter_wrapper filter_wrapper_close" : "filter_wrapper "}>
        <div className="crosHairClose">
          <div className="line" />
          <div className="line secondLine" />
        </div>
          <div className="filter_inner">
            <h2>{ukrLang ? 'ВИД ТОВАРУ' : 'PRODUCT TYPE'}</h2>
            <div className="filterOpts">
                    <p 
                        onClick={() => setFilterOpt({typeEng: 'all'})}                    
                    >{ukrLang ? 'Усе' : 'All'}</p>
                {filterOpts?.map((opt) => (
                    <p  
                      key={opt}
                      onClick={() => setFilterOpt(opt)}                    
                    >{ukrLang ? opt.type : opt.typeEng}</p>
                )) }
            </div>
        </div>
      </div>

  )
}

export default Filter
