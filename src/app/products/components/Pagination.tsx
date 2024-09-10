import { Button } from '@/components/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'

function Pagination() {
  return (
    <div className="flex justify-between items-center gap-4 mx-4 my-3">
      <div className="flex items-center gap-2">
        <div className="text-gray-500 text-sm">
          Showing&nbsp;
          <span className="text-base font-medium">1-20</span>
            &nbsp;of&nbsp;
          <span className="text-base font-medium">2290</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" iconBefore={<ArrowLeft className="w-4 h-4 text-gray-500" />}>Previous</Button>
        <Button variant="primary" iconAfter={<ArrowRight className="w-4 h-4 text-gray-500" />}>Next</Button>
      </div>
    </div>
  )
}

export default Pagination
