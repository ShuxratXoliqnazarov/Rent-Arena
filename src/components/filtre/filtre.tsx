'use client'

import { useState } from 'react'
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Button,
  Slider,
} from '@mui/material'

const features = ['Искусственное покрытие', 'Освещение', 'Раздевалки', 'Душ', 'Парковка']

export default function SidebarFilters({
  onChange,
  onPriceChange,
}: {
  onChange: (filters: string[]) => void
  onPriceChange: (price: number[]) => void
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [price, setPrice] = useState<number[]>([100, 1000])

  const toggle = (feature: string) => {
    const updated = selected.includes(feature)
      ? selected.filter(f => f !== feature)
      : [...selected, feature]
    setSelected(updated)
    onChange(updated)
  }

  const reset = () => {
    setSelected([])
    setPrice([100, 1000])
    onChange([])
    onPriceChange([100, 1000])
  }

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPrice(newValue)
      onPriceChange(newValue)
    }
  }

  return (
    <div className=" md:w-[40%] p-5 rounded-2xl shadow-lg bg-white border border-gray-200 sticky top-6 transition-all duration-300">
      <Typography variant="h6" className="mb-4 font-bold text-gray-800">
        Фильтры
      </Typography>

      <div className="mb-6">
        <Typography variant="subtitle1" className="mb-2 text-sm text-gray-700">
          Цена (сомони)
        </Typography>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          sx={{
            color: '#facc15', // Tailwind yellow-400
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(250,204,21,0.2)',
              },
            },
          }}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{price[0]} с.</span>
          <span>{price[1]} с.</span>
        </div>
      </div>

      <Divider className="my-4" />

      <FormControl component="fieldset">
        <FormGroup>
          {features.map(f => (
            <FormControlLabel
              key={f}
              control={
                <Checkbox
                  checked={selected.includes(f)}
                  onChange={() => toggle(f)}
                  sx={{
                    color: '#9ca3af', // Tailwind gray-400
                    '&.Mui-checked': {
                      color: '#facc15', // Tailwind yellow-400
                    },
                  }}
                />
              }
              label={<span className="text-sm text-gray-700">{f}</span>}
            />
          ))}
        </FormGroup>
      </FormControl>

      {selected.length > 0 || price[0] !== 100 || price[1] !== 1000 ? (
        <>
          <Divider className="my-4" />
          <Button
            onClick={reset}
            variant="outlined"
            color="error"
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            Сбросить фильтр
          </Button>
        </>
      ) : null}
    </div>
  )
}
