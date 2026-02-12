import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { getScoreColor } from '../../utils/scoring';

const ComparisonRadar = ({ data1, data2, name1, name2 }) => {
  if (!data1 || !data2) return <div className="h-[400px] flex items-center justify-center text-gray-400 text-xs uppercase">No chart data</div>;

  const chartData = [
    { subject: 'Biodiversity', landscape1: data1.wild_biodiversity || 0, landscape2: data2.wild_biodiversity || 0, fullMark: 10 },
    { subject: 'Connectivity', landscape1: data1.ecological_connectivity || 0, landscape2: data2.ecological_connectivity || 0, fullMark: 10 },
    { subject: 'Services', landscape1: data1.ecosystem_services || 0, landscape2: data2.ecosystem_services || 0, fullMark: 10 },
    { subject: 'Resilience', landscape1: data1.climate_resilience || 0, landscape2: data2.climate_resilience || 0, fullMark: 10 },
    { subject: 'Reciprocity', landscape1: data1.community_nature_reciprocity || 0, landscape2: data2.community_nature_reciprocity || 0, fullMark: 10 },
    { subject: 'Abiotic', landscape1: data1.abiotic_integrity || 0, landscape2: data2.abiotic_integrity || 0, fullMark: 10 },
    { subject: 'Pressure', landscape1: data1.anthropogenic_pressure || 0, landscape2: data2.anthropogenic_pressure || 0, fullMark: 10 },
  ];

  // Calculate average scores for color
  const avgScore1 = Object.values(data1).reduce((a, b) => a + b, 0) / Object.keys(data1).length;
  const avgScore2 = Object.values(data2).reduce((a, b) => a + b, 0) / Object.keys(data2).length;
  const color1 = getScoreColor(avgScore1);
  const color2 = getScoreColor(avgScore2);

  return (
    <div className="w-full h-[400px] relative font-sans">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" strokeWidth={1} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name={name1}
            dataKey="landscape1"
            stroke={color1}
            strokeWidth={3}
            fill={color1}
            fillOpacity={0.15}
            dot={{ r: 3, fill: color1, strokeWidth: 0 }}
          />
          <Radar
            name={name2}
            dataKey="landscape2"
            stroke={color2}
            strokeWidth={3}
            fill={color2}
            fillOpacity={0.15}
            dot={{ r: 3, fill: color2, strokeWidth: 0 }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
            formatter={(value) => <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{value}</span>}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonRadar;

