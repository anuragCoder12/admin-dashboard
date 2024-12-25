import React from 'react'
import styles from "../../components/dashboard/dashboard.module.css";
import Card from '@/components/dashboard/ui/cards/card';
import Right from '@/components/dashboard/ui/rightSide/right';
import Table from '@/components/dashboard/ui/table/table';
import Chart from '@/components/dashboard/ui/chart/chart';

function DashBoard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Table />
        <Chart />
      </div>
      <div className={styles.right}>
        <Right />
        <Right />
      </div>
    </div>
  );
}

export default DashBoard;