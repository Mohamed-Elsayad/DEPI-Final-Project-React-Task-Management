import React from 'react';
import styles from './TaskStats.module.css';
import { FiThumbsUp, FiFlag, FiClock } from 'react-icons/fi';

const TaskStats = ({ tasks = [], user, onCardClick }) => {
  // Calculate counts by status
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const doneCount = tasks.filter(t => t.status === 'done').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;

  const stats = [
    {
      label: 'Task done',
      value: doneCount,
      icon: <FiFlag size={48} />, // green
      color: '#2ee59d',
      bg: '#e6faf3',
      status: 'done',
    },
    {
      label: 'Task in progress',
      value: inProgressCount,
      icon: <FiClock size={48} />, // orange
      color: '#ff9f43',
      bg: '#fff',
      status: 'in-progress',
    },
    {
      label: 'Task left this month',
      value: pendingCount,
      icon: <FiThumbsUp size={48} />, // red
      color: '#ff5b5b',
      bg: '#ffeaea',
      status: 'pending',
    },
  ];

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.title}>All task tracker <span role="img" aria-label="briefcase">💼</span></h2>
      <p className={styles.subtitle}>
        <span style={{ fontWeight: 600, color: '#222b45' }}>Welcome back, {user?.name || 'there'}!</span> <br />
        Ready to be productive today?
      </p>
      <div className={styles.cardsRow}>
        {stats.map((stat, idx) => (
          <div
            className={styles.card}
            style={{ background: stat.bg, borderColor: stat.color, cursor: onCardClick ? 'pointer' : 'default' }}
            key={idx}
            onClick={() => onCardClick && onCardClick(stat.status)}
          >
            <div className={styles.cardHeader}>{stat.label}</div>
            <div className={styles.cardBody}>
              <span className={styles.value} style={{ color: stat.color }}>{stat.value}</span>
              <span className={styles.icon} style={{ color: stat.color }}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStats; 