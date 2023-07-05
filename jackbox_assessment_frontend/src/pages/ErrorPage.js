import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNav from '../components/MainNav';
import PageContent from './PageContent';
const ErrorPage = () => {
  const error = useRouteError()
  console.log('error :>> ', error);
  let message = "Something went wrong"
  let title = "An Error occured"
  if(error.status === 500){
    message = "Something went wrong"
  }
  if(error.status === 404){
    title = "Not found"
    message = "Could not find resource or page"
  }
  console.log('error :>> ', error);
  return (
    <>
    <MainNav />
      <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
    </>
  )
}

export default ErrorPage
