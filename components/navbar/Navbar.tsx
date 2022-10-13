import React from 'react'
import Link from "next/link"


export default function Navbar() {
    return (
        <div className=' w-full p-10 px-20'>
            <nav className='flex flex-row justify-between '>
                <div className=' text-violet-700 font-bold text-4xl border-l-8 border-violet-700 px-4'>
                <Link href="/">Statistic app</Link>
                </div>
                <div className=' '>
                    <ul className='flex flex-row text-xl text-gray-500'>
                        <li className='mx-4 hover:text-violet-700 font-bold'>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className='mx-4 hover:text-violet-700 font-bold'>
                            <Link href="/countries">
                                <a>Countries</a>
                            </Link>
                        </li>
                        <li className='mx-4 hover:text-violet-700 font-bold'>
                            <Link href="/register-country">
                                <a>Register a country</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}