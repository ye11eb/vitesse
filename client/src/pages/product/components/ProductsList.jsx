import React, { useState } from 'react'

const ProductsList = ({ item }) => {
    const [questionsOpened, setQuestionsOpened] = useState(true)
    // info_options_opened[info_options.indexOf(item)]?.['opened']

  return (
    <div>
        <li>
            <div
                onClick={() => setQuestionsOpened(!questionsOpened)}
            >
                <p>{item.caption}</p> 
                <div className={ questionsOpened ? "arrow_questions_closed arrow_questions" : "arrow_questions"}>
                    <div className="line" />
                    <div className="line secondLine" />
                </div>
            </div>
            <div className={questionsOpened ? "dropDownList_closed dropDownList_text" : "dropDownList_text"}>
                <p>{item.info}</p>
            </div>
            <div className="outline" />
        </li>
    </div>
  )
}

export default ProductsList
