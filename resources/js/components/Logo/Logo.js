import React from 'react'
import { Link } from 'react-router-dom'
import arabitLogo from '../../../../public/images/ara-bit-logo.png'
import ReactDOM from 'react-dom';

export const Logo = () => (
    <h1 className="text-lg">
        <Link className="text-white no-underline" to="/">
            <img src={arabitLogo}   className="block h-85 logo" />
        </Link>
    </h1>
)
