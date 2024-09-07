import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'



const ActionCard = ({value, label, icon, description}: ActionCardProps) => {
  return (
   <Card className='w-64 h-48 rounded-'>
    <CardContent>
        <div className='font-inter items-start p-5  '>
           {icon && <Image src={icon} alt={label} width={50} height={50} />}
            <h2 className='h3-bold mt-4'>{label}</h2>
            <p className='text-gray-600'>{description}</p>

        </div>
    </CardContent>

   </Card>
  )
}

export default ActionCard