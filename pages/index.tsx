import type { NextPage } from 'next'
import {useQuery,gql, useMutation} from "@apollo/client";
import Link from "next/link";
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';


const Home: NextPage = () => {
















  return (



   
<div className="flex justify-center items-center min-h-full ">   
<div className='flex flex-col w-1/2 text-gray-500'>

  
  <div className='mt-32'>
  Welcome to Statistic House !! here we will help you registering countries. you need to provide Country Name, Year, Area (square kilometres), and Total population() 
  </div>


  <div className='mt-4 bg-violet-700 p-3 w-40 flex justify-center items-center rounded-md text-white hover:bg-violet-500'>
    <div className=''><Link href="/countries">Get Started</Link></div>
  </div>

  </div> 
    
    </div>

 
  )
}
export default Home;