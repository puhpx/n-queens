/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(0);
    }
    solution.push(row);
  }
  for (var i = 0; i < n; i++) {
    solution[i][i] = 1;
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({n: n});
  var addPiece = function(rowIndex) {
    for (var i = 0; i < n; i++) {
      solution.attributes[rowIndex][i] = 1;
      if (!solution.hasColConflictAt(i)) {
        if (rowIndex !== n - 1) {
          addPiece(rowIndex + 1);
        } else {
          solutionCount++;
        }
      }
      solution.attributes[rowIndex][i] = 0;

    }
  };
  addPiece(0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // EDGE CASES
  if (n === 0) {
    return [];
  } else if (n === 2) {
    return [
      [0, 0],
      [0, 0]
    ];
  } else if (n === 3) {
    return [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }
  // ELSE WE DO RECURSION
  var solution = new Board({n: n});
  var solution1;

  var correct = false;
  var addPiece = function(rowIndex) {
    for (var i = 0; i < n; i++) {
      solution.togglePiece(rowIndex, i);
      if (!solution.hasAnyQueensConflicts()) {
        if (rowIndex !== n - 1) {
          addPiece(rowIndex + 1);
        } else {
          var results = solution.rows();
          solution1 = JSON.stringify(solution.rows());
          var correct = true;
          return results;
        }
      }
      solution.togglePiece(rowIndex, i);
    }
  };
  addPiece(0);
  return JSON.parse(solution1);
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }
  var solutionCount = 0;
  var solution = new Board({n: n});
  var addPiece = function(rowIndex) {
    for (var i = 0; i < n; i++) {
      solution.attributes[rowIndex][i] = 1;
      if (!solution.hasColConflictAt(i)
      && !solution.hasAnyMajorDiagonalConflicts(i, rowIndex)
      && !solution.hasAnyMinorDiagonalConflicts(i, rowIndex)) {
        if (rowIndex !== n - 1) {
          addPiece(rowIndex + 1);
        } else {
          solutionCount++;
        }
      }
      solution.attributes[rowIndex][i] = 0;

    }
  };
  addPiece(0);
  return solutionCount;
};


/**   |||||||||||||||| TIME COMPLEXITY ||||||||||||||||
 *
 *    findNRooksSolution:     O(n^2)
 *    countNRooksSolutions:   O(n^n)
 *    findNQueensSolution:    O(n^n)
 *    countNQueensSolutions:  O(n^n)
 */