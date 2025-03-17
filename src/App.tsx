import axios from 'axios';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import "./App.css";
// Set up your Socket.IO client connection
const socket = io('http://localhost:5000'); // Ensure this is the correct backend URL

const App = () => {
  const [numberOfVotes, setNumberOfVotes] = useState<number>(0);
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [candidates, setCandidates] = useState<any[]>([]); // To store list of candidates
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(''); // Dynamically set selected candidate ID

  // Function to fetch all candidates
  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/candidates'); // Assuming there's an endpoint to get all candidates
      setCandidates(response.data); // Update state with the list of candidates
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  // Function to fetch candidate data by ID
  const fetchCandidate = async (candidateId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/candidate?candidateId=${candidateId}`);
      setCandidate(response.data); // Update state with the fetched candidate data
      setNumberOfVotes(response.data.numberOfVotes); // Initialize votes
    } catch (error) {
      console.error('Error fetching candidate:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update votes and call the backend API
  const updateVotes = async (candidateId: string) => {
    try {
      await axios.post(`http://localhost:5000/api/voteForCandidate`, { candidateId });
      
      // Emit event to WebSocket after a successful vote update
      socket.emit("voteUpdate", { candidateId });
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  };

  useEffect(() => {
    fetchCandidates(); // Fetch all candidates when the component mounts
  }, []);

  

  useEffect(() => {
    socket.on("voteUpdated", (data: { candidateId: string; numberOfVotes: number }) => {
      console.log("Vote update received:", data);
  
      // Update the votes if the selected candidate matches
      if (data.candidateId === selectedCandidateId) {
        setNumberOfVotes(data.numberOfVotes);
      }
  
      // Update candidates list directly
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate._id === data.candidateId
            ? { ...candidate, numberOfVotes: data.numberOfVotes }
            : candidate
        )
      );
    });
  
    return () => {
      socket.off("voteUpdated");
    };
  }, [selectedCandidateId]);
  

  return (
    <div>
      <h1>Vote for a Candidate</h1>

      {/* Candidate Cards Section */}
      <div className="candidate-cards-container">
        {candidates.map((candidate: any) => (
          <div
            key={candidate.id}
            className={`candidate-card ${selectedCandidateId === candidate.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedCandidateId(candidate._id); // Select the candidate
              updateVotes(candidate._id); // Vote for the selected candidate
            }}
          >
            <h3>{candidate.firstName} {candidate.lastName}</h3>
            <p>Votes: {candidate.numberOfVotes}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default App;
