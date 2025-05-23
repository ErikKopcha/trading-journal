import { CryptoNewsSection } from '@/features/crypto/components/CryptoNewsSection';
import { CategoryChart } from '@/components/layout/charts/CategoryChart';
import { ChartAreaInteractive } from '@/components/layout/charts/ChartAreaInteractive';
import { ChartLoader } from '@/components/layout/charts/ChartLoader';
import { CurrencyDistributionChart } from '@/components/layout/charts/CurrencyDistributionChart';
import { SectionCards } from '@/components/layout/statistics/SectionCards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | BitChain',
  description: 'Your trading dashboard overview',
};

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />

      {/* Crypto & News Section */}
      <CryptoNewsSection />

      {/* PnL Growth Chart */}
      <div className="px-4 lg:px-6">
        <ChartLoader>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">PnL Growth</h2>
            <p className="text-muted-foreground">Your cumulative profit/loss over time</p>
          </div>
          <ChartAreaInteractive />
        </ChartLoader>
      </div>

      {/* Trading Categories and Win/Loss Stats */}
      <div className="px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartLoader>
          <CategoryChart />
        </ChartLoader>

        <ChartLoader>
          <CurrencyDistributionChart />
        </ChartLoader>
      </div>

      {/* Short/Long and Currency Distribution */}
      {/* <div className="px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartLoader>
          <ShortLongChart />
        </ChartLoader>

        <ChartLoader>
          <WinLossChart />
        </ChartLoader>
      </div> */}
    </div>
  );
}
