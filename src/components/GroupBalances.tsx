
import { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Balance {
  from: string;
  to: string;
  amount: number;
}

interface GroupBalancesProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string | null;
}

const GroupBalances = ({ isOpen, onClose, groupId }: GroupBalancesProps) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    if (groupId && isOpen) {
      // Mock data - replace with actual API call
      setGroupName('Weekend Trip');
      setBalances([
        { from: 'Alice', to: 'Bob', amount: 2125.50 },
        { from: 'Charlie', to: 'Bob', amount: 1312.75 },
        { from: 'Alice', to: 'Charlie', amount: 687.25 }
      ]);
    }
  }, [groupId, isOpen]);

  const getNetBalance = (person: string) => {
    const owes = balances
      .filter(b => b.from === person)
      .reduce((sum, b) => sum + b.amount, 0);
    
    const owed = balances
      .filter(b => b.to === person)
      .reduce((sum, b) => sum + b.amount, 0);
    
    return owed - owes;
  };

  const getAllPeople = () => {
    const people = new Set<string>();
    balances.forEach(balance => {
      people.add(balance.from);
      people.add(balance.to);
    });
    return Array.from(people);
  };

  if (!groupId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Group Balances - {groupName}</DialogTitle>
          <DialogDescription>
            See who owes whom in this group
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Individual Balances */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Individual Net Balances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getAllPeople().map((person) => {
                const netBalance = getNetBalance(person);
                return (
                  <Card key={person} className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{person}</span>
                      <div className="flex items-center space-x-2">
                        {netBalance > 0 ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <Badge variant="secondary" className="text-green-700 bg-green-100">
                              +₹{netBalance.toFixed(2)}
                            </Badge>
                          </>
                        ) : netBalance < 0 ? (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-500" />
                            <Badge variant="secondary" className="text-red-700 bg-red-100">
                              ₹{netBalance.toFixed(2)}
                            </Badge>
                          </>
                        ) : (
                          <Badge variant="secondary" className="text-gray-700">
                            ₹0.00
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Settlement Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Settlement Details</h3>
            {balances.length === 0 ? (
              <Card className="p-6 text-center">
                <p className="text-gray-600">All settled up! 🎉</p>
                <p className="text-sm text-gray-500 mt-1">
                  No pending balances in this group
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {balances.map((balance, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{balance.from}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{balance.to}</span>
                      </div>
                      <Badge variant="outline" className="text-lg font-semibold">
                        ₹{balance.amount.toFixed(2)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {balance.from} owes {balance.to}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardHeader>
              <CardTitle className="text-base">Settlement Summary</CardTitle>
              <CardDescription>
                Total amount to be settled: ₹
                {balances.reduce((sum, balance) => sum + balance.amount, 0).toFixed(2)}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GroupBalances;
