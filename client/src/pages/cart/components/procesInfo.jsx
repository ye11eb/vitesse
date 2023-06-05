import React from 'react'
import './cartComponents.scss'

const ProcesInfo = ({activeStage}) => {
  return (
    <div className='ProccesInfoBox'>
      <div className={`dotForAnim dotForAnim${activeStage}`} />
      <div className={activeStage === 1 ? "imgActive imgWrapper" : "imgWrapper"}>
        <img src={activeStage === 1 ? "./img/accountOrderProccesActive.svg" : "./img/accountOrderProcces.svg"} alt="" />
      </div>
      <div className="line"></div>
      <div className={activeStage === 2 ? "imgActive imgWrapper" : "imgWrapper"}>
        <img src={activeStage === 2 ? "./img/truckOrderProccesActive.svg" : "./img/truckOrderProcces.svg"} alt="" />
      </div>
      <div className="line"></div>
      <div className={activeStage === 3 ? "imgActive imgWrapper" : "imgWrapper"}>
        <img src={activeStage === 3 ? "./img/visaOrderProccesActive.svg" : "./img/visaOrderProcces.svg"}alt="" />
      </div>
      <div className="line"></div>
      <div className={activeStage === 4 ? "imgActive imgWrapper" : "imgWrapper"}>
        <img src={activeStage === 4 ? "./img/sucssesOrderProccesActive.svg" : "./img/sucssesOrderProcces.svg"} alt="" />
      </div>
    </div>
  )
}

export default ProcesInfo
