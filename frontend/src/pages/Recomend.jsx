import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trophy, Calendar, Code, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import axiosClient from '../utils/axiosClient';
import { useSelector } from 'react-redux';


const Recomend = ({  activeTab, setActiveTab }) => {
    const [recomendation, setRecomendation] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);
  
  
    useEffect(() => {
      if (setActiveTab) {
        setActiveTab('recomendations');
      }
    }, [setActiveTab]);
  
    useEffect(() => {
      const fetchRecomendation = async () => {
        try {
    
          const response = await axiosClient.get('/problem/recomendations');
          setRecomendation(response.data);
        } catch (err) {
          console.error("Error fetching POTD", err);
        } finally {
          setLoading(false);
        }
      };
      fetchRecomendation();
    }, []); 
  
    if (loading) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center bg-base-100">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      );
    }
  
    if (!recomendation) {
      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100 p-6 text-center">
          <h2 className="text-xl font-bold text-base-content/80">No Recomendation Available</h2>
          <p className="text-sm text-base-content/60 mt-1">Admin hasn't assigned a Recomendation yet. Check back later!</p>
        </div>
      );
    }
  
    return (
      <>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
        <div className="min-h-screen bg-base-200 text-base-content">
      
     
      <main >

      <div className="max-w-6xl mx-auto p-4 md:p-8">
       
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl border border-base-content/5">
          <table className="table table-zebra w-full">
            
            <thead className="bg-base-200">
              <tr>
                <th className="w-12">Status</th>
                <th>Problem</th>
                <th>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                 <tr>
                    <td colSpan="5" className="text-center py-10">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </td>
                 </tr>
              ) : filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => {
                  const isSolved = solvedProblems.some(sp => sp._id === problem._id);
                  return (
                    <tr key={problem.problemName} className="hover">
                      
                  
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {
                            <span key={problem.problemName} className="badge badge-outline badge-xs opacity-60">{problem.problemName}</span>
                          }
                        </div>
                      </td>
                          <td>
                        <div className="flex flex-wrap gap-1">
                          {
                            <span key={problem.description} className="badge badge-outline badge-xs opacity-60">{problem.description}</span>
                          }
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">No Recomendations.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> 

      
      </main>
    </div>
      </>
    );
  };

export default Recomend;