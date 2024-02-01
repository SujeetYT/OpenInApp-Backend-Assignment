// function to calculate priority
function calculatePriority(dueDate){
  const now = Date;
  const timeDifference = dueDate - now;


  if (timeDifference < 0) return -1;
  if (timeDifference <= 1 * 24 * 60 * 60 * 1000) return 0;
  if (timeDifference <= 2 * 24 * 60 * 60 * 1000) return 1;
  if (timeDifference <= 4 * 24 * 60 * 60 * 1000) return 2;
  if (timeDifference <= 5 * 24 * 60 * 60 * 1000) return 3;

  return 4; // For tasks due more than 5 days from now
};


module.exports = {calculatePriority};