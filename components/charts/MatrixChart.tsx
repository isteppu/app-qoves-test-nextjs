'use client';

import React from 'react';
import styles from './css/MatrixChart.module.scss';

interface MatrixChartProps {
    isHovered: boolean;
}

export default function MatrixChart({ isHovered }: MatrixChartProps) {
    const rows = 10;
    const cols = 10;

    const defaultTarget = { x: 6, y: 2 };
    const hoverTarget = { x: 4, y: 1 };
    const activeTarget = isHovered ? hoverTarget : defaultTarget;

    const getCellClass = (c: number, r: number) => {
        const dx = Math.abs(c - activeTarget.x);
        const dy = Math.abs(r - activeTarget.y);
        const distance = Math.max(dx, dy);

        if (distance === 0) return styles.cellCenter;
        if (distance === 1) {
            return dx * dy > 0 ? styles.cellNeighbor : styles.cellNeighbor2
        };;
        if (distance === 2) {
            return dy % dx > 0 ? styles.cellNeighbor2 : styles.cellNeighbor3
        };
        if (distance === 3) {
            return dx / dy > 0 ? styles.cellNeighbor3 : styles.cellNeighbor4
        };
        return styles.cellDefault;
    };

    return (
        <div>
            <div className={styles.matrixWrapper}>
                <span className={`${styles.label} ${styles.labelTop}`}>BOLD</span>
                <span className={`${styles.label} ${styles.labelBottom}`}>SUBTLE</span>
                <span className={`${styles.label} ${styles.labelLeft}`}>FEMININE</span>
                <span className={`${styles.label} ${styles.labelRight}`}>MASCULINE</span>

                <div className={styles.crosshairVertical} />
                <div className={styles.crosshairHorizontal} />

                <div className={styles.grid}>
                    {Array.from({ length: rows }).map((_, r) => (
                        Array.from({ length: cols }).map((_, c) => (
                            <div
                                key={`${r}-${c}`}
                                className={`${styles.cell} ${getCellClass(c, r)}`}
                            />
                        ))
                    ))}
                </div>

            </div>
            <p className={styles.cardFooterTextAlt}>
                {isHovered ? "Brows shift toward feminine characteristics."
                    : "Brows fall in the top 20% for natural fullness."}
            </p>
        </div>
    );
}