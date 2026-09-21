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
   
    const hasSolvedToday = user?.hasSolvedToday || false;
  
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
        
      </>
    );
  };

export default Recomend;