import CheckBox from '@/components/ui/CheckBox'

function TableHeader({ tableTitle }: { tableTitle: string[] }) {
  const thStyle = 'text-left p-4 text-xs font-medium bg-gray800 text-gray500'

  return (
    <thead>
      <tr className="bg-gray700">
        <th className={thStyle}>
          <CheckBox />
        </th>
        {tableTitle.map(item => (
          <th className={thStyle} key={item}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
