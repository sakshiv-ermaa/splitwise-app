
import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGroupModal = ({ isOpen, onClose }: CreateGroupModalProps) => {
  const [groupName, setGroupName] = useState('');
  const [users, setUsers] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addUser = () => {
    setUsers([...users, '']);
  };

  const removeUser = (index: number) => {
    if (users.length > 1) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  const updateUser = (index: number, value: string) => {
    const newUsers = [...users];
    newUsers[index] = value;
    setUsers(newUsers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validUsers = users.filter(user => user.trim() !== '');
    
    if (!groupName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a group name",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (validUsers.length < 2) {
      toast({
        title: "Error", 
        description: "A group needs at least 2 members",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Replace with actual API call
      console.log('Creating group:', { name: groupName, users: validUsers });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: `Group "${groupName}" created successfully!`
      });

      // Reset form
      setGroupName('');
      setUsers(['']);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Add a group name and invite members to start splitting expenses.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Weekend Trip, Apartment Rent"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Members</Label>
            <div className="space-y-2 mt-1">
              {users.map((user, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={user}
                    onChange={(e) => updateUser(index, e.target.value)}
                    placeholder={`Member ${index + 1} name`}
                    className="flex-1"
                  />
                  {users.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeUser(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addUser}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
          </div>

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
              {isLoading ? 'Creating...' : 'Create Group'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
