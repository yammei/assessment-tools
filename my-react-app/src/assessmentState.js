import { useState } from 'react';

export const useShowAssessment = () => {
  const [showAssessment, setShowAssessment] = useState(true);
  const [zIndex, setZIndex] = useState({ assessment: 10, assessment2: 1 });

  const switchToAssessment = () => {
    setShowAssessment(true);
    setZIndex({ assessment: 10, assessment2: 1 });
  };

  const switchToAssessment2 = () => {
    setShowAssessment(false);
    setZIndex({ assessment: 1, assessment2: 10 });
  };

  return { showAssessment, switchToAssessment, switchToAssessment2, zIndex };
};
