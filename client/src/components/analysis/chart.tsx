import { Pie, PieChart, Cell } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface OverallScoreChartProps {
  overallScore: number;
}

export default function OverallScoreChart({
  overallScore,
}: OverallScoreChartProps) {
  const colors = {
    risks: '#8B0000', // dark red
    opportunities: '#006400', // dark green
  };

  const pieChartData = [
    {
      name: 'Risks',
      value: 100 - overallScore,
      fill: colors.risks,
    },
    {
      name: 'Opportunities',
      value: overallScore,
      fill: colors.opportunities,
    },
  ];

  const chartConfig: ChartConfig = {
    value: { label: 'value' },
    Risks: { label: 'Risks', color: colors.risks },
    Opportunities: { label: 'Opportunities', color: colors.opportunities },
  } satisfies ChartConfig;

  return (
    <div className='w-full h-48 flex items-center justify-center'>
      <ChartContainer
        config={chartConfig}
        className='aspect-square max-w-[200px] w-full'
      >
        <PieChart width={200} height={200}>
          <ChartTooltip
            cursor={{ fill: 'transparent' }}
            content={<ChartTooltipContent />}
            wrapperStyle={{
              borderRadius: '0.5rem',
              boxShadow: '0 0 10px rgba(0,0,0,0.15)',
              backgroundColor: '#1f1f1f',
              color: '#fff',
              transition: 'all 0.2s ease-in-out',
              padding: '8px 12px',
              fontSize: '0.875rem',
            }}
          />
          <Pie
            data={pieChartData}
            dataKey='value'
            nameKey='name'
            innerRadius={50}
            outerRadius={85} // slightly thicker
            paddingAngle={2}
            isAnimationActive
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill}
                cursor='pointer'
                onMouseEnter={(e) => {
                  (e.target as SVGElement).style.filter = 'brightness(1.2)';
                }}
                onMouseLeave={(e) => {
                  (e.target as SVGElement).style.filter = 'brightness(1)';
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
