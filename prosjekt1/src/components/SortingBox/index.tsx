import React, { useEffect, useState } from 'react';
import styles from './SortingBox.module.css';

interface SortingBoxProps {
  onSortChange: (sortOption: string) => void;
  disabled: boolean;
}

const SortingBox: React.FC<SortingBoxProps> = ({ onSortChange, disabled }) => {
  const defaultOption = 'carousel';
  const [sortOption, setSortOption] = useState<string>(() => {
    const savedOption = sessionStorage.getItem('sortOption');
    return savedOption ? savedOption : defaultOption;
  });

  useEffect(() => {
    onSortChange(sortOption);
    sessionStorage.setItem('sortOption', sortOption);
  }, [sortOption, onSortChange]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <div className={styles.sortingContainer}>
      <label htmlFor="sortOptions" className={styles.sortLabel}>
        Display Options
      </label>
      <select
        id="sortOptions"
        className={styles.hiddenSelect}
        value={sortOption}
        onChange={handleSortChange}
        disabled={disabled}>
        <option value="rating">Rating</option>
        <option value="carousel">Carousel</option>
      </select>
    </div>
  );
};

export default SortingBox;
