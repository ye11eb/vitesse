import React, { useEffect, useState } from 'react'
import './pageAnim.scss'

const PageAnim = ({data}) => {
    const [visibleTransition, setVisibleTransition] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            if (data) {
                setVisibleTransition(false)
            }
        },280)
    },[data])
   return (
    <>
    {visibleTransition &&     
    <div className={data ? 'visiblePageAnim unVisiblePageAnim' : 'visiblePageAnim'}>
    </div>}
    </>

  )
}

export default PageAnim
