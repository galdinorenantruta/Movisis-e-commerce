import React from 'react'
import storeData from "../data/storeData.json"
import { Col, Row } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'



const Store = () => {
  return (
  <>
  <h1>E-commerce Store</h1>
  <Row  md={2} xs={1} lg={3} className="g-3">
    {storeData.map( item=>(
      <Col key={item.id}>
      <StoreItem {...item}/>
      </Col>
    ))}
    
  </Row>
  </>
  )
}

export default Store