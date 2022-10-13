import React,{useState} from 'react';
import {useMutation,gql} from "@apollo/client";
import Link from "next/link";

export default function RegisterCountry() {

    const [country,setCountry] = useState('');
    const [year,setYear] = useState('');
    const [area,setArea] = useState('');
    const [totalPopulation,setTotalPopulation] = useState('')
    const [form_error,setFormError] = useState("");
    const [success_message,setSuccessMessage] = useState("");

    // create a graphql mutation query
    const REGISTER_COUNTRY = gql`
        mutation registerCountry($country: String, $year: Int, $area: Int, $totalPopulation: Int) {
  registerCountry(country: $country, year: $year, area: $area, totalPopulation: $totalPopulation) {
    id,
    country
    year
    area
    totalPopulation
  }
}
    `; 

    // instanciate useMutation
    const [registerCountry,{loading,data,error}] = useMutation(REGISTER_COUNTRY);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // reset error and success message fields.
        setSuccessMessage("");
        setFormError("");

        // check the fields.
        if(country && year && area && totalPopulation){


            registerCountry({variables:{
                country,
                year: parseInt(year, 10),
                area: parseInt(area, 10),
                totalPopulation: parseInt(totalPopulation, 10)
            }}).then( () => {
                //release state
                setCountry("");
                setYear("");
                setArea("");
                setTotalPopulation("");
                // set success message
                setSuccessMessage("Country successfully added");
                return;
            })
            .catch( () => {
                setFormError("An error occurred");
            });

        }else{
            setFormError("All fields are required");
        }
    }

    return ( 
        <div className=" flex justify-center items-center ">

            <div className="  text-gray-500  p-10 rounded-md border shadow">

                <form onSubmit={handleSubmit}>
                {
                    form_error ? (
                        <p className="">{form_error}</p>
                    ) : null
                }
                {
                    error ? (
                        <p className="">{error.message}</p>
                    ) : null
                }
                {
                    success_message ? (
                        <p className="">{success_message}. Go to <Link href="/countries"><a className=' text-violet-700 font-bold cursor-pointer'>Countries</a></Link>
                        </p>
                    ) : null
                }
                <div className=" my-2">
                    {/* <label className=' font-bold mx-2'>Country name</label> */}
                    <input className=' border px-3 py-2 outline-none ' type="text" value={country} placeholder="Country name" onChange={ (e) => setCountry(e.target.value)}  />
                </div>

                <div className=" my-2">
                    {/* <label className=' font-bold mx-2'>Year</label> */}
                    <input className=' border px-3 py-2 outline-none ' type="number" value={year} placeholder="Year" onChange={ (e) => setYear(e.target.value)} />
                </div>

                <div className="my-2">
                    {/* <label className=' font-bold mx-2'>Area</label> */}
                    <input className=' border px-3 py-2 outline-none ' type="number" value={area} placeholder="Area" onChange={ e => setArea(e.target.value)} />
                </div>

                <div className=" my-2">
                    {/* <label className=' font-bold mx-2'>Total population</label> */}
                    <input className=' border px-3 py-2 outline-none ' type="number" value={totalPopulation} placeholder="Total population" onChange={ e => setTotalPopulation(e.target.value)} />
                </div>
                
                <div className="my-2">
                    <button className='mt-4 bg-violet-700 p-3 w-40 flex justify-center items-center rounded-md text-white hover:bg-violet-500' type="submit">
                        {
                            loading ? 'Loading' : "Register Country"
                        }
                    </button>
                </div>
   
                </form>

            </div>

           
        </div>
    )
}

