import type { NextPage } from 'next'
import {useQuery,gql, useMutation} from "@apollo/client";
import Link from "next/link";
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';

const Home: NextPage = () => {
  const [updateModel, setUpdateModel] = useState(false);
  const [countryId, setCountryId] = useState('')

  const [country,setCountry] = useState('');
  const [year,setYear] = useState('');
  const [area,setArea] = useState('');
  const [totalPopulation,setTotalPopulation] = useState('')

  const GetCountries = gql`
    query getCountries {
  getAllCountries {
    id,
    country,
    year,
    totalPopulation,
    area
  }
}
  `;

const DELETE_COUNTRY = gql`
mutation deleteCountry($deleteCountryId: ID) {
  deleteCountry(id: $deleteCountryId)
}
`; 

const SINGLE_COUNTRY = gql`
query GetSingleCountry($getSingleCountryId: ID) {
  getSingleCountry(id: $getSingleCountryId) {
    id
    country
    year
    area
    totalPopulation
  }
}
`

const UPDATE_COUNTRY = gql`
mutation UpdateCountry($updateCountryId: ID, $country: String, $year: Int, $area: Int, $totalPopulation: Int) {
  updateCountry(id: $updateCountryId, country: $country, year: $year, area: $area, totalPopulation: $totalPopulation) {
    id
    country
    year
    area
    totalPopulation
  }
}
`

  const {loading,error,data} = useQuery(GetCountries);  

  const [deleteCountry, {}] = useMutation(DELETE_COUNTRY);
  const [updateCountry, {loading: loading2,error: error2,data: data2}] = useMutation(UPDATE_COUNTRY);
  const {loading: loading3,error: error3,data: data3, refetch} = useQuery(SINGLE_COUNTRY, {
    variables: {getSingleCountryId: countryId}
  });
  // const [getSingleCountry, { loading: loading4,error: error4,data: data4, refetch: refetch2 }] = useLazyQuery(SINGLE_COUNTRY);
  // const { loading: loading3,error: error3,data: data3 } = useQuery(SINGLE_COUNTRY);


  const handleCountryDelete = (id: any) => {
    console.log("id ", id)

      deleteCountry({variables:{
        deleteCountryId: id,
      }}).then(() => {
        alert('Country deleted !!')
        window.location.reload();
      }).catch((err) => {
        alert('Error occured')
        console.log("err ", err)
      })
  }

  const handleCountryUpdate = () => {
    updateCountry({variables:{
      updateCountryId: countryId,
      country,
      year: parseInt(year, 10),
      area: parseInt(area, 10),
      totalPopulation: parseInt(totalPopulation, 10)
    }}).then(() => {
      alert('Successfully updated !!')
      setUpdateModel(false)
    }).catch((err) => {
      alert('Error occured during update')
      console.log("err ", err)
    })
  }

  const handleShowActions = (id: any) => {
    setCountryId(id)
    // if(!loading3) {
      // console.log("before ", data3)
    // }
  }

  const handleUpdateModel = (id: any) => {
   setCountryId(id)
    // if(loading3) {
    //   getSingleCountry({variables: {
    //     getSingleCountryId: id
    //   }})
    //   refetch({ getSingleCountryId: id })
  
    //   console.log(data3)
    // }
    if(!loading3) {
      console.log("after ", data3.getSingleCountry)
      setCountry(data3.getSingleCountry.country)
      setYear(data3.getSingleCountry.year)
      setArea(data3.getSingleCountry.area)
      setTotalPopulation(data3.getSingleCountry.totalPopulation)
    }
    

    setUpdateModel(!updateModel);
  };

  const handleClodeModel = (e: any) => {
    e.preventDefault()
    setCountry('')
    setYear('')
    setArea('')
    setTotalPopulation('')
    setUpdateModel(!updateModel);
  }

  return (
   <>

    {/* =========================== Start::  Connecting walletModel =============================== */}
    <div
        className={`min-h-screen w-screen right-0 top-0 z-30 fixed bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center px-4 ${
          updateModel === true ? "block" : "hidden"
        }`}
      >
        <div className="bg-white dark:bg-dark-bg w-full sm:w-3/4 md:w-1/2  xl:w-4/12 rounded-lg p-4 pb-8">
          <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
            <h3 className="font-bold text-sm text-center w-11/12">
              Update country
            </h3>
            <div
              className=" bg-secondary-100 p-2 rounded-full cursor-pointer"
              onClick={(e) => handleClodeModel(e)}
            >
             X
            </div>
            <hr className=" bg-primary border-b my-3 w-full" />
          </div>
          <div className="card-body">
            <div className="flex flex-col justify-center items-center mx-10">
              <div className=" text-primary-600 font-bold text-2xl my-2">
                <div className="">
                  {/* <img className=" w-20 h-20" src={hivelogo} /> */}
                </div>
              </div>
              <div className="m-4 w-full">
                <div className="flex flex-row items-center p-2 my-2 rounded-2xl border border-secondary-100">
                  <div>
                    {/* <img src={usernamesvg} alt="search" /> */}
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      className=" outline-none w-full"
                      placeholder="Country"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center p-2 my-2 rounded-2xl border border-secondary-100">
                  <div>
                    {/* <img src={lock} alt="search" /> */}
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      className=" outline-none w-full"
                      placeholder="Year"
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center p-2 my-2 rounded-2xl border border-secondary-100">
                  <div>
                    {/* <img src={lock} alt="search" /> */}
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      className=" outline-none w-full"
                      placeholder="Area"
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center p-2 my-2 rounded-2xl border border-secondary-100">
                  <div>
                    {/* <img src={lock} alt="search" /> */}
                  </div>
                  <div className="mx-2 w-full">
                    <input
                      className=" outline-none w-full"
                      placeholder="Total population"
                      type="number"
                      value={totalPopulation}
                      onChange={(e) => setTotalPopulation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col">
           

                <div
                  onClick={handleCountryUpdate}
                  className="flex justify-center border-2 border-primary-600 hover:bg-primary-100 p-4 rounded-md mx-1 mt-2 cursor-pointer"
                >
                  <h3 className=" text-primary-600 font-bold">
                  {
                            loading2 ? 'Loading' : "Update"
                        }
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* =========================== End::  Connecting wallet Model =============================== */}

   
<div className="">    
      {
        loading ? (
          <h2>Loading</h2>
        ) : (
          error ? (
            <h2>{error.message}</h2>
          ) : (
              data.getAllCountries.length > 0 ? (
                  data.getAllCountries.map((oneCountry:any,index:any) => {
                    return (
                        <div key={index} className='m-4 border-2 w-72 p-3'>
                        {/* <Link href={`/posts/${oneCountry['id']}`}> */}
                            <a>{oneCountry['country']}</a>
                            {/* </Link> */}
                        <p>{oneCountry['year']}</p>
                        <div className='flex flex-row cursor-pointer'>
                          <div onClick={() => handleShowActions(oneCountry['id'])}>Show actions</div>
                          <div onClick={() => handleUpdateModel(oneCountry['id'])} className='mx-2 text-blue-700'>Update</div>
                          <div onClick={() => handleCountryDelete(oneCountry['id'])} className='mx-2 text-red-700'>Delete</div>
                        </div>
                        </div>
                    )
                  })
              ) : (
                  <h2>No registered countries found</h2>
              )           
          )
        )
      }
    </div>
   </>
 
  )
}
export default Home;