import { Button } from '@/components/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface PaginationProps {
  totalItems: number | string
  handlePrevious: () => void
  handleNext: () => void
  ITEMS_PER_PAGE: number
}

function Pagination({ totalItems, handleNext, handlePrevious, ITEMS_PER_PAGE }: PaginationProps) {
  return (
    <div className="flex justify-between items-center gap-4 mx-4 my-3">
      <div className="flex items-center gap-2">
        <div className="text-gray-500 text-sm">
          Showing&nbsp;
          <span className="text-base font-medium">
            1-
            {ITEMS_PER_PAGE}
          </span>
            &nbsp;of&nbsp;
          <span className="text-base font-medium">{totalItems}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" iconBefore={<ArrowLeft className="w-4 h-4" color="white" />} onClick={handlePrevious}>Previous</Button>
        <Button variant="primary" iconAfter={<ArrowRight className="w-4 h-4" color="white" />} onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}

export default Pagination
