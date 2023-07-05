import React from 'react'
import classes from "./PageContent.module.css"
const PageContent = ({title, children}) => {
  const {content} = classes
  return (
    <div className={content}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

export default PageContent
