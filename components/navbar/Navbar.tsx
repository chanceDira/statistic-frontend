import React from 'react'
import Link from "next/link"


export default function Navbar() {
    return (
        <div className=''>
            <nav>
                <div className=' text-red-500'>
                    Statistic app
                </div>
                <div className=''>
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
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