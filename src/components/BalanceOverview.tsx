
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserBalance {
  userId: string;
  userName: string;
  totalOwed: number; // Money owed to this user
  totalOwes: number; // Money this user owes
  netBalance: number; // totalOwed - totalOwes
}

const BalanceOverview = () => {
  const [userBalance, setUserBalance] = useState<UserBalance | null>(null);
  const [topDebts, setTopDebts] = useState<Array<{person: string, amount: number}>>([]);
  const [topCredits, setTopCredits] = useState<Array<{person: string, amount: number}>>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    // Assuming current user is 'Alice'
    setUserBalance({
      userId: 'alice',
      userName: 'Alice',
      totalOwed: 10458.50, // People owe Alice this much
      totalOwes: 3812.75,   // Alice owes this much to others
      netBalance: 6645.75   // Alice is owed 6645.75 overall
    });

    setTopDebts([
      { person: 'Charlie', amount: 2812.25 },
      { person: 'David', amount: 1000.50 }
    ]);

    setTopCredits([
      { person: 'Bob', amount: 7104.25 },
      { person: 'Eve', amount: 3354.25 }
    ]);
  }, []);

  if (!userBalance) {
    return (
      <div className="text-center py-8">
        <IndianRupee className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Loading balance...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Net Balance Summary */}
      <Card className={`p-4 ${userBalance.netBalance >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Your Net Balance</p>
            <div className="flex items-center space-x-2 mt-1">
              {userBalance.netBalance >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-2xl font-bold ${userBalance.netBalance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                ₹{Math.abs(userBalance.netBalance).toFixed(2)}
              </span>
            </div>
          </div>
          <Badge variant="secondary" className={userBalance.netBalance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
            {userBalance.netBalance >= 0 ? 'You are owed' : 'You owe'}
          </Badge>
        </div>
      </Card>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">You are owed</p>
            <p className="text-lg font-semibold text-green-600">₹{userBalance.totalOwed.toFixed(2)}</p>
          </div>
        </Card>
        <Card className="p-3">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-1">You owe</p>
            <p className="text-lg font-semibold text-red-600">₹{userBalance.totalOwes.toFixed(2)}</p>
          </div>
        </Card>
      </div>

      {/* Top debts and credits */}
      {(topCredits.length > 0 || topDebts.length > 0) && (
        <div className="space-y-3">
          {topCredits.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Top amounts owed to you:</p>
              <div className="space-y-1">
                {topCredits.map((credit, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{credit.person}</span>
                    <span className="font-medium text-green-600">+₹{credit.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {topDebts.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Top amounts you owe:</p>
              <div className="space-y-1">
                {topDebts.map((debt, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{debt.person}</span>
                    <span className="font-medium text-red-600">-₹{debt.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BalanceOverview;
