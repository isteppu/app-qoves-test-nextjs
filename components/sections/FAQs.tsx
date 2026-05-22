'use client';

import React, { useState } from 'react';
import { FAQ_DATA } from '@/utils'

import styles from './css/FAQs.module.scss';

export default function FAQs() {
  const [activeCat, setActiveCat] = useState<string | null>(null); 
  const [activeQuery, setActiveQuery] = useState<number | null>(0);

  const handleCategoryToggle = (catId: string) => {
    if (activeCat === catId) {
      setActiveCat(null);
      setActiveQuery(null);
    } else {
      setActiveCat(catId);
      setActiveQuery(null); 
    }
  };

  const handleQueryToggle = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation(); 
    setActiveQuery(activeQuery === idx ? null : idx);
  };

  return (
    <section className={styles.faqSectionWrapper}>
      <div className={styles.container}>
      <div className={styles.headerBlock}>
        <span className={styles.badge}>YOUR QUESTIONS</span>
        <h2 className={styles.title}>Frequently asked <span>questions</span></h2>
        <p className={styles.subtitle}>
          If you have any further questions, please use the chat box in the bottom right or contact<br />
          us by email at <span className={styles.email}>hello@qoves.com</span>
        </p>
      </div>

      <div className={styles.accordionContainer}>
        {FAQ_DATA.map((category) => {
          const isCatOpen = activeCat === category.id;

          return (
            <div 
              key={category.id} 
              className={`${styles.categoryWrapper} ${isCatOpen ? styles.categoryOpen : styles.categoryClosed}`}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className={styles.categoryHeader}>
                <h3>{category.title}</h3>
                <span className={styles.toggleIcon}>
                  {isCatOpen ? '×' : '+'}
                </span>
              </div>

              {isCatOpen && (
                <div className={styles.nestedQueriesList}>
                  {category.questions.map((item, idx) => {
                    const isQueryOpen = activeQuery === idx;

                    return (
                      <div 
                        key={idx} 
                        className={`${styles.queryRow} ${isQueryOpen ? styles.queryOpen : ''}`}
                        onClick={(e) => handleQueryToggle(idx, e)}
                      >
                        <div className={styles.queryHeader}>
                          <h4>{item.q}</h4>
                          <span className={styles.subToggleIcon}>
                            {isQueryOpen ? '−' : '+'}
                          </span>
                        </div>
                        
                        <div className={`${styles.answerContent} ${isQueryOpen ? styles.answerExpanded : ''}`}>
                          <p>{item.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}