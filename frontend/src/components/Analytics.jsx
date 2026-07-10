import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/analytics');
        if (!response.ok) {
          throw new Error('Failed to load analytics data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-primary">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-textMain font-bold tracking-widest uppercase text-sm">Loading Insights...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-textMain">Dataset Analytics</h2>
        <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
        <p className="text-lg text-textMuted max-w-2xl mx-auto font-light leading-relaxed">
          Explore patterns and trends from the historical IMDb India movie dataset.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Rating Distribution */}
        <div className="bg-card p-6 sm:p-8 rounded-2xl border border-black/5 shadow-sm border-t-4 border-t-primary">
          <h3 className="text-lg font-bold text-textMain mb-6">Rating Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.distribution} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
                <XAxis dataKey="range" stroke="#6B6B6B" fontSize={12} tickMargin={10} />
                <YAxis stroke="#6B6B6B" fontSize={12} />
                <Tooltip 
                  cursor={{fill: '#00000005'}}
                  contentStyle={{backgroundColor: '#FFFFFF', border: '1px solid #00000010', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  itemStyle={{color: '#C5A059', fontWeight: 'bold'}}
                />
                <Bar dataKey="count" fill="#C5A059" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-textMuted text-center mt-4">The majority of movies fall between 5.0 and 7.0 IMDb ratings.</p>
        </div>

        {/* Top Genres */}
        <div className="bg-card p-6 sm:p-8 rounded-2xl border border-black/5 shadow-sm border-t-4 border-t-primary">
          <h3 className="text-lg font-bold text-textMain mb-6">Top Rated Genres (Average)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.genres} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00000010" horizontal={false} />
                <XAxis type="number" domain={[0, 10]} stroke="#6B6B6B" fontSize={12} />
                <YAxis dataKey="genre" type="category" stroke="#6B6B6B" fontSize={12} width={100} />
                <Tooltip 
                  cursor={{fill: '#00000005'}}
                  contentStyle={{backgroundColor: '#FFFFFF', border: '1px solid #00000010', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  itemStyle={{color: '#C5A059', fontWeight: 'bold'}}
                />
                <Bar dataKey="rating" fill="#2D2D2D" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-textMuted text-center mt-4">Average ratings for the highest-performing movie genres.</p>
        </div>
      </div>

      {/* Yearly Trends */}
      <div className="bg-card p-6 sm:p-8 rounded-2xl border border-black/5 shadow-sm border-t-4 border-t-primary">
        <h3 className="text-lg font-bold text-textMain mb-6">Average Rating Trends (Last 20 Years)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.yearly} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00000010" vertical={false} />
              <XAxis dataKey="year" stroke="#6B6B6B" fontSize={12} tickMargin={10} />
              <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} stroke="#6B6B6B" fontSize={12} />
              <Tooltip 
                contentStyle={{backgroundColor: '#FFFFFF', border: '1px solid #00000010', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                itemStyle={{color: '#C5A059', fontWeight: 'bold'}}
              />
              <Legend wrapperStyle={{paddingTop: '20px'}}/>
              <Line type="monotone" dataKey="rating" name="Avg Rating" stroke="#C5A059" strokeWidth={3} dot={{r: 4, fill: '#FFFFFF', strokeWidth: 2}} activeDot={{r: 6, fill: '#C5A059'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
