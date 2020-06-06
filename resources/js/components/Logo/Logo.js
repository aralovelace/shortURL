import React from 'react'
import { Link } from 'react-router-dom'
import HnbitLogo from '../../../../public/images/hn-bit-logo.png'

export const Logo = () => (
    <h1 className="text-lg">
        <Link className="text-white no-underline" to="/">
            <img src={HnbitLogo}  className="block h-80" />
        </Link>
    </h1>
)
