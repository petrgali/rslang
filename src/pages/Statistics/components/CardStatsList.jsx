import React from "react";
import { Grid, Col } from "rsuite";
import CardStats from "./CardStats/CardStats";

const CardStatsList = ({ data }) => {

  return (
    <Grid>
      {data.map(({ title, number }, colKey) => (
        <Col key={colKey} xs={24} md={data.length === 1 ? 24 : 12} lg={data.length === 3 ? 8 : data.length === 1 ? 24 : 12} style={{ padding: 10 }}>
          <CardStats
            title={title}
            number={number}
          />
        </Col>
      ))}
    </Grid>
  )
}

export default CardStatsList
