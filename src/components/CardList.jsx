import React from 'react';
import { Col, Grid } from 'rsuite';
import Card from './Card/Card';

const CardList = ({ cards }) => {
  return (
    <Grid>
      {cards.map((row, rowKey) => (
        row.map((col, colKey) => (
          <Col key={colKey} xs={24} md={12} lg={row.length === 4 ? 6 : 8} style={{ padding: 10 }}>
            <Card
              number={(rowKey * row.length) + (colKey + 1)}
              content={col.content}
              color={col.color}
              action={col.action}
            />
          </Col>
        ))
      ))}
    </Grid>
  )
}

export default CardList
