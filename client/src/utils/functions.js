const postColors = ["#FEEFD0", "#C0D3EE", "#DDB8B9", "#AFCFB6", "#94A2B7", "#82BEB7"];

// GENERATE POST BG COLORS
export const generatePostColor = (i) => {
  switch (i % postColors.length) {
    case 0:
      return postColors[0];
    case 1:
      return postColors[1];
    case 2:
      return postColors[2];
    case 3:
      return postColors[3];
    case 4:
      return postColors[4];
    case 5:
      return postColors[5];
    default:
      break;
  }
};

// GENERATE RANDOM SINGLE POST COLOR
export const generateRandomColor = () => {
  const filteredColors = ["#FEEFD0", "#C0D3EE", "#AFCFB6"];

  const randomNum = Math.floor(Math.random() * filteredColors.length);

  return filteredColors[randomNum];
};
