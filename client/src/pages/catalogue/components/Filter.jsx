/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import './filter.scss'
import Axios from'../../../utils/axios'


const Filter = ({ openedFilterAnim, ukrLang, setFilterOpt}) => {
    const [filterOpt, setFilterOpts] = useState()


    const fetchProduct = async () => {
        try {
          const { data } = await Axios.get(`/productsRoute/filterOpts/:${ukrLang ? 'type' : 'typeEng'}`);
          console.log(data);
          setFilterOpts(data.distinctValues)
          return data

        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
      };

      useEffect(() => {
        fetchProduct()
      },[])

  return (
      <div className={openedFilterAnim ? "filter_wrapper filter_wrapper_close" : "filter_wrapper "}>
        <div className="crosHairClose">
          <div className="line" />
          <div className="line secondLine" />
        </div>
          <div className="filter_inner">
            <h2>ВИД ТОВАРУ</h2>
            <div className="filterOpts">
                    <p 
                        onClick={() => setFilterOpt('all')}                    
                    >{ukrLang ? 'Усе' : 'All'}</p>
                {filterOpt?.map((opt) => (
                    <p 
                        onClick={() => setFilterOpt(opt)}                    
                    >{opt}</p>
                )) }
            </div>
        </div>
      </div>

  )
}

export default Filter
