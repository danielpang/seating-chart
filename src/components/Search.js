const consecutiveMatch = (input, target) => {
    input = input.toLowerCase();
    target = target.toLowerCase();
    
    // If input is empty, don't match anything
    if (!input.trim()) {
      return false;
    }

    // Try to find a consecutive match starting at each position in target
    for (let i = 0; i <= target.length - input.length; i++) {
      let matches = true;
      for (let j = 0; j < input.length; j++) {
        if (target[i + j] !== input[j]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        return true;
      }
    }
    
    return false;
};

export default consecutiveMatch;