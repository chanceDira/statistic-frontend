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
        <div className="">

            <div className="">

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
                        <p className="">{success_message}. Go to <Link href="/"><a>home</a></Link>
                        </p>
                    ) : null
                }
                <div className="">
                    <label>Country name</label>
                    <input type="text" value={country} placeholder="Country name" onChange={ (e) => setCountry(e.target.value)}  />
                </div>

                <div className="">
                    <label>Year</label>
                    <input type="number" value={year} placeholder="Year" onChange={ (e) => setYear(e.target.value)} />
                </div>

                <div className="">
                    <label>Area</label>
                    <input type="number" value={area} placeholder="Area" onChange={ e => setArea(e.target.value)} />
                </div>

                <div className="">
                    <label>Total population</label>
                    <input type="number" value={totalPopulation} placeholder="Total population" onChange={ e => setTotalPopulation(e.target.value)} />
                </div>
                
                <div className="">
                    <button type="submit">
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

