
import { useState } from 'react';
import { Plus, Users, DollarSign, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GroupList from '@/components/GroupList';
import CreateGroupModal from '@/components/CreateGroupModal';
import RecentExpenses from '@/components/RecentExpenses';
import BalanceOverview from '@/components/BalanceOverview';

const Index = () => {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Splitwise Clone</h1>
                <p className="text-sm text-gray-600">Share expenses, settle up easily</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsCreateGroupOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Group
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'groups', label: 'Groups', icon: Users },
            { id: 'expenses', label: 'Recent Expenses', icon: DollarSign },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md flex-1 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    <span>Balance Overview</span>
                  </CardTitle>
                  <CardDescription>
                    See who owes you and who you owe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BalanceOverview />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span>Recent Activity</span>
                  </CardTitle>
                  <CardDescription>
                    Latest expenses and settlements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentExpenses limit={5} />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'groups' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>Your Groups</span>
                </CardTitle>
                <CardDescription>
                  Manage your expense groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GroupList />
              </CardContent>
            </Card>
          )}

          {activeTab === 'expenses' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span>All Expenses</span>
                </CardTitle>
                <CardDescription>
                  Complete history of your expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentExpenses />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CreateGroupModal 
        isOpen={isCreateGroupOpen} 
        onClose={() => setIsCreateGroupOpen(false)} 
      />
    </div>
  );
};

export default Index;
