import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as chartjs} from 'chart.js/auto'

function LineChart({chartData,setDays,days}) {
    const arr = [
        { name: '24h' },
        { name: '30d' },
        { name: '3m' },
        { name: '1y' }
    ]
  return (
    <>
    <Line data={chartData} options={{
        elements:{
            point:{
                radius:1,
            }
        }
    }}/>
    <div style={{marginTop:30, display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h3 >Set TimeFrame</h3>
        <div>
    {arr.map(x => <button key={x.name} style={{ backgroundColor: days === x.name ? 'pink' : '', width: 80 }} onClick={() => setDays(x.name)}>{x.name}</button>)}
        </div>

    </div>
    </>
  )
}

export default LineChart