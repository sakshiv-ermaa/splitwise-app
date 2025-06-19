
import { useState, useEffect } from 'react';
import { IndianRupee, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  group: string;
  splitType: 'equal' | 'percentage';
  date: string;
  members: string[];
}

interface RecentExpensesProps {
  limit?: number;
}

const RecentExpenses = ({ limit }: RecentExpensesProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockExpenses: Expense[] = [
      {
        id: '1',
        description: 'Dinner at Italian Restaurant',
        amount: 7125.50,
        paidBy: 'Alice',
        group: 'Weekend Trip',
        splitType: 'equal',
        date: '2024-01-15T19:30:00Z',
        members: ['Alice', 'Bob', 'Charlie']
      },
      {
        id: '2',
        description: 'Uber ride to airport',
        amount: 2917.00,
        paidBy: 'Bob',
        group: 'Weekend Trip',
        splitType: 'equal',
        date: '2024-01-15T14:15:00Z',
        members: ['Alice', 'Bob', 'Charlie']
      },
      {
        id: '3',
        description: 'Apartment rent - January',
        amount: 200000.00,
        paidBy: 'David',
        group: 'Apartment Rent',
        splitType: 'percentage',
        date: '2024-01-01T09:00:00Z',
        members: ['Alice', 'David']
      },
      {
        id: '4',
        description: 'Groceries and supplies',
        amount: 10479.25,
        paidBy: 'Charlie',
        group: 'Goa Trip',
        splitType: 'equal',
        date: '2024-01-14T11:20:00Z',
        members: ['Alice', 'Bob', 'Charlie', 'Eve']
      },
      {
        id: '5',
        description: 'Hotel booking',
        amount: 37500.00,
        paidBy: 'Alice',
        group: 'Goa Trip',
        splitType: 'equal',
        date: '2024-01-13T16:45:00Z',
        members: ['Alice', 'Bob', 'Charlie', 'Eve']
      }
    ];

    const sortedExpenses = mockExpenses.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setExpenses(limit ? sortedExpenses.slice(0, limit) : sortedExpenses);
  }, [limit]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <IndianRupee className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">No expenses yet</p>
        <p className="text-sm text-gray-500">Add your first expense to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <Card key={expense.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{expense.description}</h4>
              <span className="font-bold text-lg">₹{expense.amount.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>Paid by <strong>{expense.paidBy}</strong></span>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{expense.group}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {expense.splitType}
                </Badge>
                <div className="flex items-center space-x-1 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(expense.date)}</span>
                </div>
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Split between: {expense.members.join(', ')}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentExpenses;
