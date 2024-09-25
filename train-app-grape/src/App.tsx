
import React, { useState, useEffect } from "react"
import type { DatePickerProps } from 'antd';
import './App.css';
import TrainTable from "./dumbComponents/TrainTable/index.tsx"
import UserInterface from "./dumbComponents/UserInterface/index.tsx";


interface DataType {
  from: string,
  to: string,
  sections: object | null,
}

function App() {
  const [travelDate, setTravelDate] = useState("")
  const [fetching, setFetching] = useState(false)
  const [trainData, setTrainData] = useState<DataType[]>([])

  const url = "http://transport.opendata.ch/v1/connections"

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setTravelDate(dateString)
  };


  const handleSubmit = async (values) => {
    try {
      setFetching(true)
      const {
        from,
        to,
      } = values || {}

      const tdate = travelDate.split(" ")[0] || ""
      const time = travelDate.split(" ")[1] || ""

      const response = await fetch(`${url}?from=${from}&to=${to}${tdate && `&date=${tdate}`}${time && `&time=${time}`}`)
      const data = await response.json()

      const {
        connections,
      } = data || {}
      
      let results: DataType[] = []


      for(let connection of connections) {

        let sections: object[] = []
        let lastArrivalTime = -1
        
        if(connection.sections && connection.sections.length > 0) {
          for(let section of connection.sections) {
            if(section.walk && section.walk.duration) {
              if(lastArrivalTime !== -1) {
                if(section?.departure?.departure !== lastArrivalTime) {
                  sections.push({
                    type: "Wait",
                  })
                }
              }
              
              lastArrivalTime = section.arrival.arrival

              sections.push({
                type: "Depart: Walk",
                station: section?.departure?.station?.name,
                time: section?.departure?.departure.split("T")[1],
              })

              sections.push({
                type: "Arrive",
                station: section.arrival.station.name,
                time: section.arrival.arrival.split("T")[1],
              })
              
            } else if(section.journey) {

              if(lastArrivalTime !== -1) {
                if(section?.departure?.departure !== lastArrivalTime) {
                  sections.push({
                    type: "Wait",
                  })
                }
              }
              
              lastArrivalTime = section.arrival.arrival
              

              sections.push({
                type: "Depart: Bus/Train",
                station: section?.departure.station.name,
                time: section?.departure?.departure.split("T")[1],
                carrierName: `${section.journey.category}${section.journey.number}`,
                direction: section.journey.to,
              })

              sections.push({
                type: "Arrive",
                station: section.arrival.station.name,
                time: section.arrival.arrival.split("T")[1],
              })
            }
          }
        }


        results.push({
          from: `${connection.from.station.name}`,
          to: `${connection.to.station.name}`,
          sections,
        })

        setTrainData(results)
        setFetching(false)
      }
      
    } catch(e) {
      console.log("error", e)
    }
  }


  return (
    <div className="App">
      <UserInterface  
        handleDateChange={onChange}
        handleSubmit={handleSubmit}
      />
      {fetching && trainData.length <= 0 ? (
        <p>Loading</p>
      ) : (
        <TrainTable
          trainData={trainData}
        />
      )}
    </div>
  );
}

export default App;
