
import { useState, useEffect } from 'react';
import { Users, DollarSign, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AddExpenseModal from './AddExpenseModal';
import GroupBalances from './GroupBalances';

interface Group {
  id: string;
  name: string;
  users: string[];
  totalExpenses: number;
  memberCount: number;
}

const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isBalancesOpen, setIsBalancesOpen] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    setGroups([
      {
        id: '1',
        name: 'Weekend Trip',
        users: ['Alice', 'Bob', 'Charlie'],
        totalExpenses: 450.00,
        memberCount: 3
      },
      {
        id: '2',
        name: 'Apartment Rent',
        users: ['Alice', 'David'],
        totalExpenses: 2400.00,
        memberCount: 2
      },
      {
        id: '3',
        name: 'Goa Trip',
        users: ['Alice', 'Bob', 'Charlie', 'Eve'],
        totalExpenses: 1250.00,
        memberCount: 4
      }
    ]);
  }, []);

  const handleAddExpense = (groupId: string) => {
    setSelectedGroup(groupId);
    setIsAddExpenseOpen(true);
  };

  const handleViewBalances = (groupId: string) => {
    setSelectedGroup(groupId);
    setIsBalancesOpen(true);
  };

  if (groups.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">No groups yet</p>
        <p className="text-sm text-gray-500">Create your first group to start splitting expenses</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {group.memberCount} members
                </Badge>
              </div>
              <CardDescription>
                {group.users.join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Expenses</span>
                <span className="font-semibold text-lg">${group.totalExpenses.toFixed(2)}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleAddExpense(group.id)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Expense
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleViewBalances(group.id)}
                >
                  <DollarSign className="h-4 w-4 mr-1" />
                  Balances
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        groupId={selectedGroup}
      />

      <GroupBalances
        isOpen={isBalancesOpen}
        onClose={() => setIsBalancesOpen(false)}
        groupId={selectedGroup}
      />
    </>
  );
};

export default GroupList;
