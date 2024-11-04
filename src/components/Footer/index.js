import React from 'react'

export default function index() {
    const year = new Date().getFullYear()
    return (
        <div className='container-fluid bg-secondary py-2'>
            <div className="row">
                <div className="col">
                    <p className='mb-0 text-white text-center'>
                        &copy; {year} All Rights Reserved By KM Production.
                    </p>
                </div>
            </div>
        </div>
    )
}
