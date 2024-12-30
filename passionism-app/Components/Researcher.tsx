import React, { useState, useEffect } from 'react';
import { ResearcherClass } from '../src/classes';


function Researcher() {
    const [subject, setSubject] = useState('');
    const [playerClass, setPlayerClass] = useState<ResearcherClass | null>(null);
    const [isResearching, setIsResearching] = useState(false);
    const [researchTime, setResearchTime] = useState(0);

    const handleResearchToggle = () => {
        setIsResearching(!isResearching);
    };

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (isResearching) {
            interval = setInterval(() => {
                setResearchTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isResearching]);
  
    const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(event.target.value);
    };
  
    const handleClassAssignment = (subject: string) => {
      const researcher = new ResearcherClass(subject);
      setPlayerClass(researcher);
    };

    return (
<>
{playerClass && (
  <div className="research-menu">
    <h3>{playerClass.subject}</h3>
    <button onClick={handleResearchToggle}>
            {isResearching ? 'Stop Research' : 'Start Research'}
          </button>
          {isResearching && <p>Researching for: {researchTime} seconds</p>}
  </div>
)}

<input type="text" value={subject} onChange={handleSubjectChange} />
<button onClick={() => handleClassAssignment(subject)}>Assign Class</button>
</>
    )
}

export default Researcher;