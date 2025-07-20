import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { searchAlumniByquery } from '@/services/AlumService';
interface Alumni {
  id: string;
  fullName: string;
  email: string;
  
}

const AlumniSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Alumni[]>([]);
    const [error, setError] = useState("");
  const handleSearch = () => {
    if (!query) {
      setError("Please enter a name");
      return;
    }

    searchAlumniByquery(query)
      .then((response) => {
        setResults(response.data);
        setError("");
      })
      .catch(() => {
        setError("Search Not Found");
        setResults([]);
      });
  };

    return ( <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-2">Search Alumni</h2>
      <input
        type="text"
        placeholder="Enter name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul className="mt-4 space-y-2">
        {results.map((alumni) => (
          <li key={alumni.id} className="border p-2 rounded shadow-sm">
            <strong>{alumni.fullName}</strong> – {alumni.email}
          </li>
        ))}
      </ul>
    </div>
  );

}
export default AlumniSearch;