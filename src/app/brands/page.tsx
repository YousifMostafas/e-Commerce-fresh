import React from 'react'
import { getAllBrands } from './brands.services'
import { Layers, Tag } from 'lucide-react'
import BrandsCard from '@/components/brandCard/BrandsCard'
import Link from 'next/link'

export default async function page() {
    const data=await getAllBrands()
  return (
    <>
    <div className="bg-linear-to-br  from-[#7F22FE] via-[#8E51FF] to-[#C27AFF]  text-white">    
      <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Brands</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            <Tag className='fill-white'/>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/80 mt-1">
Shop from your favorite brands

              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-5 px-6'>
<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
        {data.map((e)=>(<BrandsCard key={e._id}  brand={e} /> ))}

</div>
      </div>
    </>
  )
}
