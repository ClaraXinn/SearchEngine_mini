"use server";
import React from 'react'
import Ping from '@/components/Ping';
import { client } from '@/sanity/lib/client';
import { STARTUPS_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';

const view = async({id} : {id:string}) => {

  const {views: totalViews} = await client
  .withConfig({useCdn: false})
  .fetch(STARTUPS_VIEWS_QUERY, {id})

  await writeClient
    .patch(id)
    .set({views: totalViews +1})
    .commit();


  return (
    <div className='view-container'>
      <div className="absolute -top-2 -right-2">
        <Ping/>
      </div>

      <div className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </div>
      
    </div>
    

      
  )
}

export default view