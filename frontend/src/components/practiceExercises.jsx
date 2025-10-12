import React, {useState} from 'react'

export default function PracticeExercises() {

     const [showSolution, setShowSolution] = useState(false)

  return (
     <div className="sidebar-widget">
          <h3>Practice Exercises</h3>
          <div className="exercise">
            <h4>Closure Challenge</h4>
            <p>
              Create a counter function that maintains its state using closures.
            </p>
            <button
              type="button"
              className="btn btn-small"
              onClick={() => setShowSolution((s) => !s)}
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolution && (
              <div id="solution1" className="solution">
                <pre>
                  <code className="javascript">{`function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`}</code>
                </pre>
              </div>
            )}
          </div>
          </div>
  )
}
