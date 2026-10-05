import { sub } from '@/app/CategoryDetailes/subCategory.interface'
import { FolderClosed, MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SubCategoryCard({sup}:{sup:sub}) {
    const {name , _id}=sup
  return (
    <>
      <Link
            className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1"
            href={`/shop?subcategory=${_id}`}
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
          <FolderClosed className="text-emerald-600 fill-emerald-600"/>
            </div>
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors mb-2">
     {name}
            </h3>
            <div className="flex items-center gap-2 font-medium text-sm text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Browse Products</span>
          <MoveRight/>
            </div>
          </Link> 
    </>
   )
}
