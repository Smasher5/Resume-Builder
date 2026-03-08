import { LayoutTemplate } from 'lucide-react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProfileInfoCard } from './Cards'
import { UserContext } from '../context/UserContext'
import { landingPageStyles } from '../assets/dummystyle'

const Navbar = () => {
    const { user } = useContext(UserContext)

  return (
    <div className='h-24 bg-white/70 background-blur-xl border-b border-violet-100/50 py-2.5 px-4 md:px-0 sticky top-0 z-50'>
        <div className='max-w-6xl mx-auto flex items-center justify-between gap-5'>
            <Link to='/' className='flex items-center gap-3'>
              <div className='flex items-center gap-3 pb-6'>
                <div className={`mt-4 ${landingPageStyles.logoIcon}`}>
                    <LayoutTemplate className={landingPageStyles.logoIconInner}/>
                </div>

                <span className='text-xl sm:text-2xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mt-4'>
                    ResumeXpert
                </span>
              </div>
            </Link>
            {user && <ProfileInfoCard/>}
        </div>

    </div>
  )
}

export default Navbar