import React from 'react';
import { Col, Grid, Row } from 'rsuite';
import Card from './Card/Card';

const CardList = ({ cards }) => {
  return (
    <Grid>
      {cards.map((row, rowKey) => (
        <Row key={rowKey} className="show-grid">
          {row.map((col, colKey) => (
            <Col key={colKey} xs={24} md={12} lg={6} style={{ padding: 10 }}>
              <Card
                content={col.content}
                color={col.color}
                link={col.link}
              />
            </Col>
          ))}
        </Row>
      ))}
    </Grid>
  )
}

export default CardList
