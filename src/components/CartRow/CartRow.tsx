import Image from 'next/image'
import React from 'react'
import { AddToCartResponse, Product, Product2 } from '../addtocart/addtocart.interface'
import Link from 'next/link'
import UpdateCount from '@/app/cart/UpdateCount'
import DeleteButton from '@/app/cart/DeleteBtn'

export default function CartRow({prod}:{prod:Product}) {
    const { product:{category , imageCover , title ,_id , quantity } , price , count} = prod
  return (
<>
 <div className="flex my-10 gap-4 sm:gap-6">
                      <Link
                        className="relative shrink-0 group"
                        href={`/productDetails/${_id}`}
                      >
                        <div className="w-28 relative h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                          <Image
                            alt={title}
                            fill
                            className="w-full absolute  h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            src={imageCover}
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <svg
                            data-prefix="fas"
                            data-icon="check"
                            className="svg-inline--fa fa-check size-2 text-[8px]"
                            role="img"
                            viewBox="0 0 448 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                            />
                          </svg>
                          In Stock
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="mb-3">
                          <Link
                            className="group/title"
                            href="/products/6428ead5dc1175abc65ca0ad"
                          >
                            <h3 className="font-semibold text-gray-900 group-hover/title:text-emerald-600 transition-colors leading-relaxed text-base sm:text-lg">
{title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block px-2.5 py-1 bg-linear-to-r from-emerald-50 to-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              SKU: 5CA0AD
                            </span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-emerald-600 font-bold text-lg">
                            {price} EGP
                            </span>
                            <span className="text-xs text-gray-400">
                              per unit
                            </span>
                          </div>
                        </div>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center">
                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
<UpdateCount prodid={_id} count={count - 1} disabled={count <= 1}>
  <svg
                                  data-prefix="fas"
                                  data-icon="minus"
                                  className="svg-inline--fa  size-3.5 fa-minus text-xs"
                                  role="img"
                                  viewBox="0 0 448 512"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"
                                  />
                                </svg>

                           </UpdateCount>
                              
                              <span className="w-12 text-center font-bold text-gray-900">
                               {count}
                              </span>
                          
<UpdateCount prodid={_id} count={count + 1} disabled={count >= quantity}>
                              <svg
                                  data-prefix="fas"
                                  data-icon="plus"
                                  className="svg-inline--fa size-3.5 fa-plus text-xs"
                                  role="img"
                                  viewBox="0 0 448 512"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"
                                  />
                                </svg>
                          </UpdateCount>
                            
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-0.5">
                                Total
                              </p>
                              <p className="text-xl font-bold text-gray-900">
                                
                                <span className="text-sm font-medium text-gray-400">
                                 {price * count} EGP
                                </span>
                              </p>
                            </div>
                      <DeleteButton prodid={_id} name={title} />
                          </div>
                        </div>
                      </div>
                    </div>
</>
)
}
