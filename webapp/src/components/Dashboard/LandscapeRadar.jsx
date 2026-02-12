import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { getScoreColor } from '../../utils/scoring';

const LandscapeRadar = ({ data, overallScore }) => {
  if (!data) return <div className="h-[350px] flex items-center justify-center text-gray-400 text-xs uppercase">No chart data</div>;

  const chartData = [
    { subject: 'Biodiversity', A: data.wild_biodiversity || 0, fullMark: 10 },
    { subject: 'Connectivity', A: data.ecological_connectivity || 0, fullMark: 10 },
    { subject: 'Services', A: data.ecosystem_services || 0, fullMark: 10 },
    { subject: 'Resilience', A: data.climate_resilience || 0, fullMark: 10 },
    { subject: 'Reciprocity', A: data.community_nature_reciprocity || 0, fullMark: 10 },
    { subject: 'Abiotic', A: data.abiotic_integrity || 0, fullMark: 10 },
    { subject: 'Pressure', A: data.anthropogenic_pressure || 0, fullMark: 10 },
  ];

  const color = getScoreColor(overallScore);

  return (
    <div className="w-full h-[350px] relative font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" strokeWidth={1} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Landscape Score"
            dataKey="A"
            stroke={color}
            strokeWidth={3}
            fill={color}
            fillOpacity={0.2}
            dot={{ r: 3, fill: color, strokeWidth: 0 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LandscapeRadar;