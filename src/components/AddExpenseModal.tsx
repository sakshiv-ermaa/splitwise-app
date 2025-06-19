
import { useState, useEffect } from 'react';
import { IndianRupee, Users, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string | null;
}

const AddExpenseModal = ({ isOpen, onClose, groupId }: AddExpenseModalProps) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'percentage'>('equal');
  const [percentages, setPercentages] = useState<Record<string, number>>({});
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock group members - replace with actual API call
  useEffect(() => {
    if (groupId) {
      // Simulate API call to get group members
      const mockMembers = ['Alice', 'Bob', 'Charlie', 'David'];
      setGroupMembers(mockMembers);
      
      // Initialize percentages
      const initialPercentages: Record<string, number> = {};
      mockMembers.forEach(member => {
        initialPercentages[member] = 25; // Equal split by default
      });
      setPercentages(initialPercentages);
    }
  }, [groupId]);

  const updatePercentage = (member: string, value: number) => {
    setPercentages(prev => ({
      ...prev,
      [member]: value
    }));
  };

  const getTotalPercentage = () => {
    return Object.values(percentages).reduce((sum, val) => sum + val, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!description.trim() || !amount.trim() || !paidBy) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (splitType === 'percentage' && getTotalPercentage() !== 100) {
      toast({
        title: "Error",
        description: "Percentages must add up to 100%",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const expenseData = {
        description: description.trim(),
        amount: parseFloat(amount),
        paid_by: paidBy,
        split_type: splitType,
        splits: splitType === 'equal' ? {} : percentages
      };

      // Replace with actual API call
      console.log('Adding expense to group', groupId, expenseData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Expense added successfully!"
      });

      // Reset form
      setDescription('');
      setAmount('');
      setPaidBy('');
      setSplitType('equal');
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!groupId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Add a new expense to split among group members.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Dinner at restaurant, Hotel booking"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="paidBy">Paid by</Label>
            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select who paid" />
              </SelectTrigger>
              <SelectContent>
                {groupMembers.map((member) => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Split Type</Label>
            <RadioGroup
              value={splitType}
              onValueChange={(value) => setSplitType(value as 'equal' | 'percentage')}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="equal" id="equal" />
                <Label htmlFor="equal" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Split Equally</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage" className="flex items-center space-x-2">
                  <Percent className="h-4 w-4" />
                  <span>Split by Percentage</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {splitType === 'percentage' && (
            <div>
              <Label>Percentage Split</Label>
              <div className="space-y-2 mt-2">
                {groupMembers.map((member) => (
                  <div key={member} className="flex items-center space-x-2">
                    <span className="text-sm w-20">{member}</span>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={percentages[member] || 0}
                      onChange={(e) => updatePercentage(member, parseInt(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                ))}
                <div className="text-sm text-right">
                  Total: {getTotalPercentage()}%
                  {getTotalPercentage() !== 100 && (
                    <span className="text-red-500 ml-2">Must equal 100%</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              {isLoading ? 'Adding...' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
