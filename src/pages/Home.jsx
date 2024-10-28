import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    const handleLogOut = () => {
        sessionStorage.clear()
        navigate('/')
    }
    return (
        <div style={{ marginTop: '50px' }} className="container-fluid">

            <div className="row">
                <div className="col-lg-4">
                    <h1 className='text-center mt-5'>Welcome <span className='text-warning'>User</span>,</h1>
                    <div className=' d-flex align-items-center justify-content-center w-100' style={{ height: "300px" }}>
                        <button type="button" className='btn bg-warning rounded text-light me-4'>List Users</button>
                        <button type="button" className='btn bg-warning rounded text-light'>View your details</button>
                    </div>
                    <button type="button" onClick={handleLogOut} className='btn bg-warning rounded text-light w-100'>LogOut</button>

                </div>

                <div className="col-lg-8">
                    <img src="https://media.istockphoto.com/id/1396807850/video/collage-of-different-multiethnic-people.jpg?s=640x640&k=20&c=hbBHWnwzvvYhVVjDiaYsfCvVZP2V6ozCVlkpyL1ajYs=" alt="" width={'100%'} />
                </div>
            </div>


        </div>
    )
}

export default Home
